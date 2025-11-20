# 046 | MySQL 两千万订单数据如何实现 20ms 查询？

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">前言</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那晚，大约晚上 11 点，我与 Chaya 在丽江的洱海酒店享受两人世界的快乐，电商平台的运维大群突然炸开了锅。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">监控系统发出刺耳的警报：</font>**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">订单查询接口响应时间从 200ms 飙升到 12 秒，数据库 CPU 利用率突破 90%。</font>**

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">发现事故根源竟是一个看似平常的查询——用户中心的历史订单分页查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这背后隐藏的正是</font>**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">MySQL 深度分页</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">的典型问题——数据越往后查，速度越让人抓狂。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其本质是传统分页机制在数据洪流下的失效：LIMIT 100000,10这样的查询，会让数据库像逐页翻阅千页文档的抄写员，机械地扫描前 10 万条记录再丢弃。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">当数据量突破千万级时，这种暴力扫描不仅造成 I/O 资源的巨大浪费，更会导致关键业务查询的链式阻塞。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">本文将深入拆解深度分页的技术黑箱，通过电商订单表等真实场景，揭示 B+树索引与分页机制的碰撞奥秘，并给出 6 种经过实战检验的优化方案。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">深度分页</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">假设电商平台的订单表存储了 2000 万条记录，表结构如下，主键是 id，(user_id + create_time )联合索引。</font>

```plain
REATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT, -- id自增
  `user_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP, -- 创建时间默认为当前时间
  PRIMARY KEY (`id`),
  KEY `idx_userid_create_time` (`user_id`, `create_time`) -- 创建时间设置为普通索引
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们的分页语句一般这么写。</font>

```plain
SELECT * FROM orders
WhERE user_id = 'Chaya'
ORDER BY create_time DESC
LIMIT 0, 20;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">当用户查询第 1000 页的订单（每页 20 条），常见的分页写法如下。</font>

```plain
SELECT * FROM orders
WhERE user_id = 'Chaya'
ORDER BY create_time DESC
LIMIT 19980, 20;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">执行流程解析：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用联合索引 idx_userid_create_time读取 19980 + 20 条数据。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">利用索引在内存中排序。</font>
3. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">丢弃 19880 条数据，返回剩下的 20 条。</font>

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">随着页码增加，需要处理的数据量会线性增长。当 offset 达到 10w 时，查询耗时会显著增加，达到 100w 时，甚至需要数秒。</font>**

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">游标分页（Cursor-based Pagination）</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">适用场景</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：支持连续分页（如无限滚动）。</font>

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：基于有序且唯一的字段（如自增主键 ID），通过记录上一页最后一条记录的标识（如主键 ID），将WHERE条件与索引结合，跳过已查询数据。</font>

```plain
-- 第一页
SELECT *
FROM orders
WhERE user_id = 'Chaya'
ORDER BY create_time DESC
LIMIT 20;

-- 后续页（记录上一页查询得到的 id，id=1000）
SELECT id, user_id, amount
FROM orders
WHERE id > 1000 AND user_id = 'Chaya'
ORDER BY create_time DESC
LIMIT 20;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">索引树直接定位到order_id=1000的叶子节点，仅扫描后续 1000 条记录，避免遍历前 100 万行数据。</font>

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">优势</font>**

+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">完全避免 OFFSET扫描，时间复杂度从 O(N)降为 O(1)</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">天然支持顺序分页场景（如无限滚动加载）</font>

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">限制</font>**

+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">不支持随机跳页（如直接跳转到第 1000 页）</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需保证排序字段唯一且有序</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">延迟关联（Deferred Join）</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：</font>**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">通过子查询先获取主键范围，再关联主表获取完整数据。减少回表次数，利用覆盖索引优化性能。</font>**

```plain
SELECT t1.*
FROM orders t1
INNER JOIN (
    SELECT id
    FROM orders
    WhERE user_id = 'Chaya'
        ORDER BY create_time DESC
    LIMIT 1000000, 20
) t2 ON t1.id = t2.id;
```

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">优势</font>**

+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">子查询仅扫描索引树，避免回表开销。</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">主查询通过主键精确匹配，效率极高。</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">性能提升可达 10 倍以上（实测从 1.2 秒降至 0.05 秒）。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">覆盖索引优化</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：创建包含查询字段的联合索引，避免回表操作。例如索引设计为(user_id, id, create_time, amount)。</font>

```plain
ALTER TABLE orders ADD INDEX idx_cover (user_id, id, create_time,amount);

SELECT id, user_id, amount, create_time
FROM orders USE INDEX (idx_cover)
WhERE user_id = 'Chaya'
ORDER BY create_time DESC
LIMIT 1000000, 20;
```

<font style="color:rgb(100, 100, 100);background-color:rgb(248, 246, 244);">Chaya：订单很多字段的，我想查看更多订单细节怎么办？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个问题问得好，我们可以设计订单列表和详情页，通过上述方案做订单列表的分页查询；点击详情页的时候，在使用订单 id 查询订单。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">分区表</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：将大表按时间或哈希值水平拆分。例如按</font>**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">月分区，每个分区独立存储，缩小扫描范围。</font>**

```plain
-- 按月份RANGE分区
ALTER TABLE orders PARTITION BY RANGE (YEAR(create_time)*100 + MONTH(create_time)) (
    PARTITION p202501 VALUES LESS THAN (202502),
    PARTITION p202502 VALUES LESS THAN (202503)
);

-- 查询特定月份数据
SELECT * FROM orders PARTITION (p202501)
WHERE user_id = 'chaya'
ORDER BY create_time DESC
LIMIT 20;
```

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">预计算分页（Precomputed Pages）</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：通过异步任务预生成分页数据，存储到 Redis 或物化视图。适合数据更新频率低的场景。</font>

**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现步骤</font>**

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">定时任务生成热点页数据。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">存储到 Redis 有序集合。</font>

```plain
ZADD order_pages 0 "page1_data" 1000 "page2_data"
```

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">查询的时候直接获取缓存数据</font>

```plain
-- 伪代码：获取第N页缓存
ZRANGEBYSCORE order_pages (N-1)*1000 N*1000
```

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">集成 Elasticsearch</font>
**<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">实现原理</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">：利用 ES 的search_after特性，通过游标实现深度分页。结合数据同步工具保证一致性。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">实现流程：canal+kafka 订阅 MySQL binlog 将数据异构到 elasticsearch。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">elasticsearch 保存的数据主要就是我们的查询条件和订单 id。</font>

```plain
订单表 → Binlog → Canal → Kafka → Elasticsearch、Hbase
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在查询的时候，通过 Elasticsearch 查询得到订单 ID，最后在根据订单 ID 去 MySQL 查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">或者我们可把数据全量同步到 Hbase 中查询，在 Hbase 中查询完整的数据。</font>



> 更新: 2025-11-20 09:27:16  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/xgfi43ibvaq9bpts>
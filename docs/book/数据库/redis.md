---
icon: pen-to-square
date: 2024-10-29
category:
  - Cherry
tag:
  - red
  - small
  - round
---
# Redis
## 基本数据类型
* 非关系型数据库
*  string、list、set、zset、hash
*  纯内存操作，执行速度快
*  单线程，避免上下文切换
*  使用I/O多路复用模型，非阻塞IO
*  使用场景（String：缓存用户信息、Hash：存储对象、列表：消息队列、最新列表、最新文章、最新评论 Set：存储不重复的元素、用户标签、关注者集合）
* 缓存穿透

## 缓存穿透
：查询一个不存在的数据，redis查询不到数据也不会直接写入缓存，就会导致每次请求都查数据库

### 解决办法
缓存空数据
● 缓存空数据，查询返回的数据为空，仍把这个空结果进行缓存。
布隆过滤器
● 用于检索一个元素是否在一个集合中
通过多次hash函数得到hash值

## 缓存击穿
： 给某一个key设置了过期时间，当key过期的时候，恰好这个时间点对于这个key有大量的并发请求过来，这些并发请求可能会瞬间把DB压垮。

### 解决办法
互斥锁（强一致、性能差)
● 钱相关的业务

逻辑过期（高可用、性能优）
● 互联网行业、注重用户体验  高可用

## 缓存雪崩

### 解决办法
给不同的Key的TTL 添加随机值
利用Redis集群提高服务的可用性 （哨兵模式、集群模式）
给缓存业务添加降级限流策略   	（nginx或 spring cloud gateway）
给业务添加多级缓存		（Guava 或  Caffeine）

## 双写一致性 (redis和mysql数据如何进行同步)
### 延迟一致
当修改了数据库的数据也要通过同时更新缓存的数据，缓存和数据库的数据要保持一致
延时双删有脏数据的风险

### 强一致性
读写锁、互斥锁 、性能不高

读写锁-读操作

读写锁-写操作


### 异步通知保证数据的最终一致性 
MQ

Canal
对代码是0侵入的，不需要修改业务代码，伪装为mysql的一个从节点，canal通过读取binlog数据更新缓存

异步的方案


## redis数据持久化
### RDB
： Redis Database Backup file，Redis数据快照，就是把redis内存中的所有数据都记录到磁盘中，当Redis实例故障重启后，从磁盘读取快照文件，恢复数据

RDB的执行原理

### AOF
AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件。

RDB &AOF对比

## Redis的过期策略
惰性删除

定期删除

## setnx
setnx是指如果key不存在，则设置key的值，如果key已经存在，则不做任何操作。

## Redis的数据淘汰策略


allkeys-LRU：最近最少使用，用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高
LFU：最少频率使用，会统计每个key的访问频率，值越小淘汰优先级越高
redis分布式锁


## redisson 实现的分布式锁-执行流程
Watch dog会给锁 续期

## redisson 实现分布式锁的代码
```
public void redislock() throws interruptedexception
获取锁（重入镇）,执行锁的名称
rlock lock redissonclient.getlock(s:"heimalock`);
[t登试获取领，参数分别是：获取领的最大等持时间（阴问会重试）,顾自动释放时间，时间单位
//boolean islock lock.trylock(10,30,timeunit.seconds);
boolean islock lock.trylock(time:10,timeunit.seconds);
判断是否获取成功 加锁，设置过期时间等操作都是基于lua脚本完成
if(islock)
try
system.out.printtn(执行业务");
3 finally
1释放锁
lock.unlock();
```
redisson实现的分布式锁-可重入

redisson 实现的分布式锁- 主从一致性

主从复制
主从同步
主从全量同步



主从增量同步


哨兵模式

服务状态监控

redis集群（哨兵模式）脑裂

=======



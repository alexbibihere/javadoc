---
icon: pen-to-square
date: 2022-01-09
title: Mysql 学习笔记
---

# Mysql 学习笔记

## 常用命令
- 查看数据库版本：`SELECT VERSION();`
- 显示所有数据库：`SHOW DATABASES;`
- 创建数据库：`CREATE DATABASE 数据库名;`
- 删除数据库：`DROP DATABASE 数据库名;`
- 选择数据库：`USE 数据库名;`
- 显示所有表：`SHOW TABLES;`
- 创建表：`CREATE TABLE 表名 (字段名 字段类型, ...);`
- 删除表：`DROP TABLE 表名;`
- 插入数据：`INSERT INTO 表名 (字段名, ...) VALUES (值, ...);`
- 删除数据：`DELETE FROM 表名 WHERE 条件;`
- 更新数据：`UPDATE 表名 SET 字段名 = 新值 WHERE 条件;`
- 查询数据：`SELECT 字段名, ... FROM 表名 WHERE 条件;`
- 排序数据：`SELECT 字段名, ... FROM 表名 WHERE 条件 ORDER BY 字段名;`
- 分页数据：`SELECT 字段名, ... FROM 表名 WHERE 条件 LIMIT 开始, 数量;`
- 联合查询：`SELECT 字段名, ... FROM 表名1, 表名2 WHERE 条件;`
- 子查询：`SELECT 字段名, ... FROM 表名 WHERE 字段名 IN (SELECT 字段名 FROM 表名 WHERE 条件);`
- 聚合函数：`SELECT COUNT(字段名), SUM(字段名), AVG(字段名), MAX(字段名), MIN(字段名) FROM 表名 WHERE 条件;`
- 索引：`CREATE INDEX 索引名 ON 表名 (字段名);`
- 外键：`ALTER TABLE 表名 ADD FOREIGN KEY (字段名) REFERENCES 主表名 (主表字段名);`
- 事务：`START TRANSACTION;`、`COMMIT;`、`ROLLBACK;`
- 视图：`CREATE VIEW 视图名 AS SELECT 字段名, ... FROM 表名 WHERE 条件;`
- 函数：`CREATE FUNCTION 函数名 (参数类型) RETURNS 返回类型 AS '函数代码' LANGUAGE SQL;`
- 存储过程：`CREATE PROCEDURE 存储过程名 (参数类型) AS '存储过程代码' LANGUAGE SQL;`
- 触发器：`CREATE TRIGGER 触发器名 BEFORE/AFTER 事件 ON 表名 FOR EACH ROW AS '触发器代码' LANGUAGE SQL;`
- 数据库备份：`mysqldump -u 用户名 -p 数据库名 > 备份文件名.sql;`
- 数据库恢复：`mysql -u 用户名 -p 数据库名 < 备份文件名.sql;`
- 数据库复制：`mysqldump -u 用户名 -p 数据库名 | mysql -u 用户名 -p 新数据库名;`
- 数据库分片：`CREATE TABLE 表名 (字段名 字段类型, ...) ENGINE=分片表;`
- 数据库连接：`mysql -u 用户名 -p -h 主机名 -P 端口号 数据库名;`
- 数据库连接池：`pip install mysql-connector-python-rf`
- 数据库连接池配置：`pip install mysql-connector-python-rf`、`pip install DBUtils`、`pip install PyMySQL`

## SQL优化
- select语句务必指明字段名称（避免直接使用select*)
- sql语句要避免造成索引失效的写法
- 尽量用unionall代替unionunion会多一次过滤，效率低
- 避免在where子句中对字段进行表达式操作
- join优化能用innerjoin 就不用leftjoin rightjoin,如必须使用一定要以小表为驱动，
- 内连接会对两个表进行优化，优先把小表放到外边，把大表放到里边。ieftjoin或rightjoin,不会重新调整质序
## 如何定位慢查询
- 开启慢查询日志：`set global slow_query_log = 'ON';`
- sql执行时间超过long_query_time秒则记录到慢查询日志：`set global long_query_time = 1;`
- 查看慢查询日志：`show global variables like '%slow_query_log%';`、`show global variables like '%long_query_time%';`、`show global status like '%slow_queries%';`

## SQL慢如何分析
- 首先定位慢查询，**使用explain分析sql**，查看sql的执行计划，分析sql的执行效率
- 看有没有命中索引，存不存在索引失效的情况，索引失效会导致全表扫描，影响查询效率
- 看查询是否有关联查询，关联查询会导致大量数据交互，影响查询效率
- 看查询是否有子查询，子查询会导致大量数据交互，影响查询效率
- 看查询是否有大表join，大表join会导致大量数据交互，影响查询效率
- 看查询是否有大量数据排序，排序会导致大量数据交互，影响查询效率
- 看查询是否有大量数据group by，group by会导致大量数据交互，影响查询效率

## 锁
### 按照锁的粒度，mysql分为表级锁和行级锁：
- 表级锁：对整个表加锁，开销小，加锁快，不会出现死锁。锁定期间，其他Session不能对该表进行任何操作，只有本Session可以操作。 ( select... lock in share mode )
- 行级锁：对表中的一行加锁，开销大，加锁慢，会出现死锁。锁定期间，其他Session不能对该行进行任何操作，只有本Session可以操作。(select... for update )

### 按照使用方式，mysql分为共享锁和排他锁：
- 共享锁：允许多个Session同时读取同一行数据，但不允许修改数据。  ( select... lock in share mode )
- 排他锁：允许独占访问，排他锁会阻止其他Session对同一行的读和写操作。  ( select... for update )

### 按照思想，mysql分为乐观锁和悲观锁：  
- 悲观锁：认为对数据被多个事务并发访问，一定会发生冲突，因此在更新数据时，会先加锁，确保数据完整性。( select... for update )
- 乐观锁：认为对数据被多个事务并发访问，不会发生冲突，因此在更新数据时，不加锁，只对数据的一个版本进行比较，如果数据没有被修改，则提交事务，否则，放弃事务。(select... where version = x)

## 索引
索引是提高mysql查询效率的一种方法，通过索引，mysql可以快速找到需要的数据，提高查询速度。  
### 聚簇索引
数据和索引放到一块，B+树的叶子节点保存了整行数据，有且只有一个 
### 非聚簇索引
数据和索引分开存储，B+树的叶子节点保存对应的主键，可以有多个
### 覆盖索引
指  查询使用了索引， 并且需要返回的列，在该索引中已经全部能够找到
- 使用id查询，直接走聚簇索引查询，一次索引扫描，直接返回数据，性能高
- 如果返回的列中没有创建索引，有可能会触发回表查询，尽量避免使用select*
### 回表查询
索引查询需要回表查询，即先查询索引，再根据索引找到主键，再根据主键查询数据。  
先通过二级索引拿到对应的主键值，再到聚簇索引查找整行数据

### 底层数据结构
#### B+树  
B+树是一种平衡的多叉树，每个节点可以存放多个关键字，通过指针将其连接起来。  
所有数据都存储在叶子结点，非叶子结点只存储指针， 便于扫库和区间查询
叶子结点是双向链表，通过指针将其连接起来。


### Mysql超大分页处理
- 优化思路： 一般分页查询时，通过创建 覆盖索引 能够比较好的提高性能，可以通过覆盖索引加子查询形式进行优化

### 索引的创建原则
- 1,数据量较大，且查询比较频繁的表 重要
- 2.常作为查询条件，排序，分组的字段 重要
- 3.字段内容区分度高
- 4.内容较长，使用前缀索引
- 5.尽量联合索引 重要
- 6.要控制索引的数量

### 索引失效
- 满足最左前缀法则，（a,b,c），索引只会走a,ab,abc
- 范围查询右边的列，不能使用索引
- 不要在索引列上进行运算操作，索引失效
- 字符串不加单引号，造成索引失效
- 以%开头的Like模糊查询，索引失效，如果仅仅是尾部模糊匹配，索引不会失效，头部模糊匹配失效

## SQL执行顺序
- from
- on
- join
- where
- group by
- having
- select
- order by
- limit

## 优化SQL
- 表的设计优化
- 索引优化  （参考优化创建原则和索引失效）
- SQL语句优化
- 主从复制、读写分离
- 分库分表

## 事务 (ACID)
事务是指作为一个整体，要么都成功，要么都失败。事务的四大特性：原子性、一致性、隔离性、持久性。  
事务的原子性是通过 undo log来实现的
事务的持久性是通过 redo log来实现的
事务的隔离性 是通过 （读写锁+mvcc）实现的
事务的一致性是通过 原子性、持久性、隔离性来实现的

### 并发事务
- 并发事务问题：脏读、不可重复读、幻读
- 隔离级别：读未提交、读已提交、可重复读、串行化

# 存储过程
``` 
create PROCEDURE sp_test()
BEGIN
    SELECT * FROM table1;
END;
```
## 触发器
``` 
CREATE TRIGGER trigger_name
{ BEFORE | AFTER }
{ INSERT | UPDATE | DELETE }
ON table_name
FOR EACH ROW
trigger_body;



create trigger before_insert_recording
BEFORE INSERT ON recording for each row 
BEGIN 
    if new.student_id not in(select id from students) 
    then set new.student_id =0;
    end if;
    if new.company_id not in (select id from companies) 
    then set new.company_id =0;
    end if;
END;
```


# mysql异常报错

## Subquery returns more than 1 row
这个错误发生在你的子查询返回了多行数据，但当前上下文要求子查询只能返回单行结果。这是 MySQL 的常见错误，通常出现在以下情况：

## Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'judge.t.name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
这个错误是因为 MySQL 的 sql_mode 包含了 ONLY_FULL_GROUP_BY 模式，它要求 GROUP BY 查询中的非聚合列必须出现在 GROUP BY 子句中，或者这些列必须函数依赖于 GROUP BY 的列。
select 查询中包含了非聚合列，而该列不在 GROUP BY 子句中，或者该列与 GROUP BY 子句中的列不相关。

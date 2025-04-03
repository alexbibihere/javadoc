(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{473:function(_,v,l){"use strict";l.r(v);var s=l(2),a=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"mysql-学习笔记"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mysql-学习笔记"}},[_._v("#")]),_._v(" Mysql 学习笔记")]),_._v(" "),v("h2",{attrs:{id:"常用命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[_._v("#")]),_._v(" 常用命令")]),_._v(" "),v("ul",[v("li",[_._v("查看数据库版本："),v("code",[_._v("SELECT VERSION();")])]),_._v(" "),v("li",[_._v("显示所有数据库："),v("code",[_._v("SHOW DATABASES;")])]),_._v(" "),v("li",[_._v("创建数据库："),v("code",[_._v("CREATE DATABASE 数据库名;")])]),_._v(" "),v("li",[_._v("删除数据库："),v("code",[_._v("DROP DATABASE 数据库名;")])]),_._v(" "),v("li",[_._v("选择数据库："),v("code",[_._v("USE 数据库名;")])]),_._v(" "),v("li",[_._v("显示所有表："),v("code",[_._v("SHOW TABLES;")])]),_._v(" "),v("li",[_._v("创建表："),v("code",[_._v("CREATE TABLE 表名 (字段名 字段类型, ...);")])]),_._v(" "),v("li",[_._v("删除表："),v("code",[_._v("DROP TABLE 表名;")])]),_._v(" "),v("li",[_._v("插入数据："),v("code",[_._v("INSERT INTO 表名 (字段名, ...) VALUES (值, ...);")])]),_._v(" "),v("li",[_._v("删除数据："),v("code",[_._v("DELETE FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("更新数据："),v("code",[_._v("UPDATE 表名 SET 字段名 = 新值 WHERE 条件;")])]),_._v(" "),v("li",[_._v("查询数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("排序数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件 ORDER BY 字段名;")])]),_._v(" "),v("li",[_._v("分页数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件 LIMIT 开始, 数量;")])]),_._v(" "),v("li",[_._v("联合查询："),v("code",[_._v("SELECT 字段名, ... FROM 表名1, 表名2 WHERE 条件;")])]),_._v(" "),v("li",[_._v("子查询："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 字段名 IN (SELECT 字段名 FROM 表名 WHERE 条件);")])]),_._v(" "),v("li",[_._v("聚合函数："),v("code",[_._v("SELECT COUNT(字段名), SUM(字段名), AVG(字段名), MAX(字段名), MIN(字段名) FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("索引："),v("code",[_._v("CREATE INDEX 索引名 ON 表名 (字段名);")])]),_._v(" "),v("li",[_._v("外键："),v("code",[_._v("ALTER TABLE 表名 ADD FOREIGN KEY (字段名) REFERENCES 主表名 (主表字段名);")])]),_._v(" "),v("li",[_._v("事务："),v("code",[_._v("START TRANSACTION;")]),_._v("、"),v("code",[_._v("COMMIT;")]),_._v("、"),v("code",[_._v("ROLLBACK;")])]),_._v(" "),v("li",[_._v("视图："),v("code",[_._v("CREATE VIEW 视图名 AS SELECT 字段名, ... FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("函数："),v("code",[_._v("CREATE FUNCTION 函数名 (参数类型) RETURNS 返回类型 AS '函数代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("存储过程："),v("code",[_._v("CREATE PROCEDURE 存储过程名 (参数类型) AS '存储过程代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("触发器："),v("code",[_._v("CREATE TRIGGER 触发器名 BEFORE/AFTER 事件 ON 表名 FOR EACH ROW AS '触发器代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("数据库备份："),v("code",[_._v("mysqldump -u 用户名 -p 数据库名 > 备份文件名.sql;")])]),_._v(" "),v("li",[_._v("数据库恢复："),v("code",[_._v("mysql -u 用户名 -p 数据库名 < 备份文件名.sql;")])]),_._v(" "),v("li",[_._v("数据库复制："),v("code",[_._v("mysqldump -u 用户名 -p 数据库名 | mysql -u 用户名 -p 新数据库名;")])]),_._v(" "),v("li",[_._v("数据库分片："),v("code",[_._v("CREATE TABLE 表名 (字段名 字段类型, ...) ENGINE=分片表;")])]),_._v(" "),v("li",[_._v("数据库连接："),v("code",[_._v("mysql -u 用户名 -p -h 主机名 -P 端口号 数据库名;")])]),_._v(" "),v("li",[_._v("数据库连接池："),v("code",[_._v("pip install mysql-connector-python-rf")])]),_._v(" "),v("li",[_._v("数据库连接池配置："),v("code",[_._v("pip install mysql-connector-python-rf")]),_._v("、"),v("code",[_._v("pip install DBUtils")]),_._v("、"),v("code",[_._v("pip install PyMySQL")])])]),_._v(" "),v("h2",{attrs:{id:"如何定位慢查询"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#如何定位慢查询"}},[_._v("#")]),_._v(" 如何定位慢查询")]),_._v(" "),v("ul",[v("li",[_._v("开启慢查询日志："),v("code",[_._v("set global slow_query_log = 'ON';")])]),_._v(" "),v("li",[_._v("sql执行时间超过long_query_time秒则记录到慢查询日志："),v("code",[_._v("set global long_query_time = 1;")])]),_._v(" "),v("li",[_._v("查看慢查询日志："),v("code",[_._v("show global variables like '%slow_query_log%';")]),_._v("、"),v("code",[_._v("show global variables like '%long_query_time%';")]),_._v("、"),v("code",[_._v("show global status like '%slow_queries%';")])])]),_._v(" "),v("h2",{attrs:{id:"sql慢如何分析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#sql慢如何分析"}},[_._v("#")]),_._v(" SQL慢如何分析")]),_._v(" "),v("ul",[v("li",[_._v("首先定位慢查询，"),v("strong",[_._v("使用explain分析sql")]),_._v("，查看sql的执行计划，分析sql的执行效率")]),_._v(" "),v("li",[_._v("看有没有命中索引，存不存在索引失效的情况，索引失效会导致全表扫描，影响查询效率")]),_._v(" "),v("li",[_._v("看查询是否有关联查询，关联查询会导致大量数据交互，影响查询效率")]),_._v(" "),v("li",[_._v("看查询是否有子查询，子查询会导致大量数据交互，影响查询效率")]),_._v(" "),v("li",[_._v("看查询是否有大表join，大表join会导致大量数据交互，影响查询效率")]),_._v(" "),v("li",[_._v("看查询是否有大量数据排序，排序会导致大量数据交互，影响查询效率")]),_._v(" "),v("li",[_._v("看查询是否有大量数据group by，group by会导致大量数据交互，影响查询效率")])]),_._v(" "),v("h2",{attrs:{id:"锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#锁"}},[_._v("#")]),_._v(" 锁")]),_._v(" "),v("h3",{attrs:{id:"按照锁的粒度-mysql分为表级锁和行级锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#按照锁的粒度-mysql分为表级锁和行级锁"}},[_._v("#")]),_._v(" 按照锁的粒度，mysql分为表级锁和行级锁：")]),_._v(" "),v("ul",[v("li",[_._v("表级锁：对整个表加锁，开销小，加锁快，不会出现死锁。锁定期间，其他Session不能对该表进行任何操作，只有本Session可以操作。 ( select... lock in share mode )")]),_._v(" "),v("li",[_._v("行级锁：对表中的一行加锁，开销大，加锁慢，会出现死锁。锁定期间，其他Session不能对该行进行任何操作，只有本Session可以操作。(select... for update )")])]),_._v(" "),v("h3",{attrs:{id:"按照使用方式-mysql分为共享锁和排他锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#按照使用方式-mysql分为共享锁和排他锁"}},[_._v("#")]),_._v(" 按照使用方式，mysql分为共享锁和排他锁：")]),_._v(" "),v("ul",[v("li",[_._v("共享锁：允许多个Session同时读取同一行数据，但不允许修改数据。  ( select... lock in share mode )")]),_._v(" "),v("li",[_._v("排他锁：允许独占访问，排他锁会阻止其他Session对同一行的读和写操作。  ( select... for update )")])]),_._v(" "),v("h3",{attrs:{id:"按照思想-mysql分为乐观锁和悲观锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#按照思想-mysql分为乐观锁和悲观锁"}},[_._v("#")]),_._v(" 按照思想，mysql分为乐观锁和悲观锁：")]),_._v(" "),v("ul",[v("li",[_._v("悲观锁：认为对数据被多个事务并发访问，一定会发生冲突，因此在更新数据时，会先加锁，确保数据完整性。( select... for update )")]),_._v(" "),v("li",[_._v("乐观锁：认为对数据被多个事务并发访问，不会发生冲突，因此在更新数据时，不加锁，只对数据的一个版本进行比较，如果数据没有被修改，则提交事务，否则，放弃事务。(select... where version = x)")])]),_._v(" "),v("h2",{attrs:{id:"索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引"}},[_._v("#")]),_._v(" 索引")]),_._v(" "),v("p",[_._v("索引是提高mysql查询效率的一种方法，通过索引，mysql可以快速找到需要的数据，提高查询速度。")]),_._v(" "),v("h3",{attrs:{id:"聚簇索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#聚簇索引"}},[_._v("#")]),_._v(" 聚簇索引")]),_._v(" "),v("p",[_._v("数据和索引放到一块，B+树的叶子节点保存了整行数据，有且只有一个")]),_._v(" "),v("h3",{attrs:{id:"非聚簇索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#非聚簇索引"}},[_._v("#")]),_._v(" 非聚簇索引")]),_._v(" "),v("p",[_._v("数据和索引分开存储，B+树的叶子节点保存对应的主键，可以有多个")]),_._v(" "),v("h3",{attrs:{id:"覆盖索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#覆盖索引"}},[_._v("#")]),_._v(" 覆盖索引")]),_._v(" "),v("p",[_._v("指  查询使用了索引， 并且需要返回的列，在该索引中已经全部能够找到")]),_._v(" "),v("ul",[v("li",[_._v("使用id查询，直接走聚簇索引查询，一次索引扫描，直接返回数据，性能高")]),_._v(" "),v("li",[_._v("如果返回的列中没有创建索引，有可能会触发回表查询，尽量避免使用select*")])]),_._v(" "),v("h3",{attrs:{id:"回表查询"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#回表查询"}},[_._v("#")]),_._v(" 回表查询")]),_._v(" "),v("p",[_._v("索引查询需要回表查询，即先查询索引，再根据索引找到主键，再根据主键查询数据。"),v("br"),_._v("\n先通过二级索引拿到对应的主键值，再到聚簇索引查找整行数据")]),_._v(" "),v("h3",{attrs:{id:"底层数据结构"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#底层数据结构"}},[_._v("#")]),_._v(" 底层数据结构")]),_._v(" "),v("h4",{attrs:{id:"b-树"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#b-树"}},[_._v("#")]),_._v(" B+树")]),_._v(" "),v("p",[_._v("B+树是一种平衡的多叉树，每个节点可以存放多个关键字，通过指针将其连接起来。"),v("br"),_._v("\n所有数据都存储在叶子结点，非叶子结点只存储指针， 便于扫库和区间查询\n叶子结点是双向链表，通过指针将其连接起来。")]),_._v(" "),v("h3",{attrs:{id:"mysql超大分页处理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mysql超大分页处理"}},[_._v("#")]),_._v(" Mysql超大分页处理")]),_._v(" "),v("ul",[v("li",[_._v("优化思路： 一般分页查询时，通过创建 覆盖索引 能够比较好的提高性能，可以通过覆盖索引加子查询形式进行优化")])]),_._v(" "),v("h3",{attrs:{id:"索引的创建原则"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引的创建原则"}},[_._v("#")]),_._v(" 索引的创建原则")]),_._v(" "),v("ul",[v("li",[_._v("1,数据量较大，且查询比较频繁的表 重要")]),_._v(" "),v("li",[_._v("2.常作为查询条件，排序，分组的字段 重要")]),_._v(" "),v("li",[_._v("3.字段内容区分度高")]),_._v(" "),v("li",[_._v("4.内容较长，使用前缀索引")]),_._v(" "),v("li",[_._v("5.尽量联合索引 重要")]),_._v(" "),v("li",[_._v("6.要控制索引的数量")])]),_._v(" "),v("h3",{attrs:{id:"索引失效"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引失效"}},[_._v("#")]),_._v(" 索引失效")]),_._v(" "),v("ul",[v("li",[_._v("满足最左前缀法则，（a,b,c），索引只会走a,ab,abc")]),_._v(" "),v("li",[_._v("范围查询右边的列，不能使用索引")]),_._v(" "),v("li",[_._v("不要在索引列上进行运算操作，索引失效")]),_._v(" "),v("li",[_._v("字符串不加单引号，造成索引失效")]),_._v(" "),v("li",[_._v("以%开头的Like模糊查询，索引失效，如果仅仅是尾部模糊匹配，索引不会失效，头部模糊匹配失效")])]),_._v(" "),v("h2",{attrs:{id:"sql执行顺序"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#sql执行顺序"}},[_._v("#")]),_._v(" SQL执行顺序")]),_._v(" "),v("ul",[v("li",[_._v("from")]),_._v(" "),v("li",[_._v("on")]),_._v(" "),v("li",[_._v("join")]),_._v(" "),v("li",[_._v("where")]),_._v(" "),v("li",[_._v("group by")]),_._v(" "),v("li",[_._v("having")]),_._v(" "),v("li",[_._v("select")]),_._v(" "),v("li",[_._v("order by")]),_._v(" "),v("li",[_._v("limit")])]),_._v(" "),v("h2",{attrs:{id:"优化sql"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#优化sql"}},[_._v("#")]),_._v(" 优化SQL")]),_._v(" "),v("ul",[v("li",[_._v("表的设计优化")]),_._v(" "),v("li",[_._v("索引优化  （参考优化创建原则和索引失效）")]),_._v(" "),v("li",[_._v("SQL语句优化")]),_._v(" "),v("li",[_._v("主从复制、读写分离")]),_._v(" "),v("li",[_._v("分库分表")])]),_._v(" "),v("h2",{attrs:{id:"事务-acid"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事务-acid"}},[_._v("#")]),_._v(" 事务 (ACID)")]),_._v(" "),v("p",[_._v("事务是指作为一个整体，要么都成功，要么都失败。事务的四大特性：原子性、一致性、隔离性、持久性。"),v("br"),_._v("\n事务的原子性是通过 undo log来实现的\n事务的持久性是通过 redo log来实现的\n事务的隔离性 是通过 （读写锁+mvcc）实现的\n事务的一致性是通过 原子性、持久性、隔离性来实现的")]),_._v(" "),v("h3",{attrs:{id:"并发事务"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#并发事务"}},[_._v("#")]),_._v(" 并发事务")]),_._v(" "),v("ul",[v("li",[_._v("并发事务问题：脏读、不可重复读、幻读")]),_._v(" "),v("li",[_._v("隔离级别：读未提交、读已提交、可重复读、串行化")])])])}),[],!1,null,null,null);v.default=a.exports}}]);
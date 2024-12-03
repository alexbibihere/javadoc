(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{472:function(_,v,l){"use strict";l.r(v);var E=l(2),i=Object(E.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"mysql-学习笔记"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mysql-学习笔记"}},[_._v("#")]),_._v(" Mysql 学习笔记")]),_._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"title"},[_._v("提示")]),v("p",[_._v("本文档仅作为个人学习记录，不作为商业用途。")])]),v("h2",{attrs:{id:"_1-数据库简介"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-数据库简介"}},[_._v("#")]),_._v(" 1. 数据库简介")]),_._v(" "),v("p",[_._v("数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。数据库管理系统（Database Management System，DBMS）是管理数据库的软件。数据库系统由数据库、数据库管理员、数据库设计者、应用程序员和用户组成。数据库系统的目标是使数据更加容易管理、存储、检索和更新。")]),_._v(" "),v("h2",{attrs:{id:"_2-数据库的分类"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-数据库的分类"}},[_._v("#")]),_._v(" 2. 数据库的分类")]),_._v(" "),v("p",[_._v("数据库按照其结构、数据量、数据处理能力、数据安全性、数据备份及恢复、数据共享性、数据一致性、数据可用性、数据可靠性、数据可扩展性、数据可移植性、数据可管理性等方面进行分类。")]),_._v(" "),v("ul",[v("li",[_._v("关系数据库：关系数据库是建立在关系模型基础上的数据库，它将数据存储在表中，每张表有若干字段，每个字段有唯一的标识符，表与表之间通过外键联系。关系数据库管理系统（RDBMS）是管理关系数据库的软件。关系数据库的优点是结构化、易于理解、易于维护、易于扩展、易于使用、支持事务处理、支持并发控制、支持SQL语言。")]),_._v(" "),v("li",[_._v("非关系数据库：非关系数据库是基于非关系模型的数据库，它不存储数据在表中，而是以文档、对象、图形等非结构化的方式存储数据。非关系数据库管理系统（NoSQL）是管理非关系数据库的软件。非关系数据库的优点是灵活、高性能、易于扩展、易于使用、支持海量数据、支持动态查询、支持分布式存储。")]),_._v(" "),v("li",[_._v("键值数据库：键值数据库是以键-值对存储数据的数据库。键值数据库管理系统（Key-Value Store）是管理键值数据库的软件。键值数据库的优点是快速查询、高性能、易于扩展、易于使用、支持海量数据、支持动态查询、支持分布式存储。")]),_._v(" "),v("li",[_._v("文档数据库：文档数据库是以文档的形式存储数据的数据库。文档数据库管理系统（Document Store）是管理文档数据库的软件。文档数据库的优点是灵活、高性能、易于扩展、易于使用、支持海量数据、支持动态查询、支持分布式存储。")]),_._v(" "),v("li",[_._v("列数据库：列数据库是以列式存储数据的数据库。列数据库管理系统（Column Store）是管理列数据库的软件。列数据库的优点是高性能、易于扩展、易于使用、支持海量数据、支持动态查询、支持分布式存储。")]),_._v(" "),v("li",[_._v("图数据库：图数据库是以图的形式存储数据的数据库。图数据库管理系统（Graph Store）是管理图数据库的软件。图数据库的优点是高性能、易于扩展、易于使用、支持海量数据、支持动态查询、支持分布式存储。")])]),_._v(" "),v("h2",{attrs:{id:"_3-数据库的常用术语"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-数据库的常用术语"}},[_._v("#")]),_._v(" 3. 数据库的常用术语")]),_._v(" "),v("ul",[v("li",[_._v("数据库：数据库是按照数据结构来组织、存储和管理数据的仓库。")]),_._v(" "),v("li",[_._v("数据库管理系统（DBMS）：数据库管理系统是管理数据库的软件。")]),_._v(" "),v("li",[_._v("数据库系统：数据库系统由数据库、数据库管理员、数据库设计者、应用程序员和用户组成。")]),_._v(" "),v("li",[_._v("数据库管理员：数据库管理员负责管理数据库，包括创建、维护、备份、恢复数据库等。")]),_._v(" "),v("li",[_._v("数据库设计者：数据库设计者负责设计数据库，包括数据库设计、数据库模式设计、数据库结构设计、数据库实例设计等。")]),_._v(" "),v("li",[_._v("数据库实例：数据库实例是指数据库在磁盘上的存储结构。")]),_._v(" "),v("li",[_._v("数据库模式：数据库模式是指数据库的逻辑结构，它定义了数据库的结构、数据结构、关系、约束等。")]),_._v(" "),v("li",[_._v("数据库结构：数据库结构是指数据库中表的组织、存储方式、索引方式、查询方式等。")]),_._v(" "),v("li",[_._v("数据库实例：数据库实例是指数据库在磁盘上的存储结构。")]),_._v(" "),v("li",[_._v("数据库服务器：数据库服务器是指数据库管理系统运行的计算机。")]),_._v(" "),v("li",[_._v("数据库引擎：数据库引擎是指数据库管理系统用来处理数据库请求的软件。\n"),v("ul",[v("li",[_._v("数据库事务：数据库事务是指一组数据库操作，要么全部成功，要么全部失败。")]),_._v(" "),v("li",[_._v("数据库锁：数据库锁是指对数据库资源进行访问的控制，防止多个事务或进程同时访问同一资源。")]),_._v(" "),v("li",[_._v("数据库索引：数据库索引是指对数据库表中一列或多列的值进行排序的一种结构。")]),_._v(" "),v("li",[_._v("数据库视图：数据库视图是指从一个或多个表中检索数据的一个虚拟表。")]),_._v(" "),v("li",[_._v("数据库触发器：数据库触发器是指在特定事件发生时自动执行的数据库操作。\n"),v("ul",[v("li",[_._v("数据库函数：数据库函数是指对数据库中数据进行计算、处理、转换的一种函数。")]),_._v(" "),v("li",[_._v("数据库存储过程：数据库存储过程是指在数据库中存储的一组SQL语句，它可以一次性执行，也可以由其他程序调用执行。")]),_._v(" "),v("li",[_._v("数据库备份：数据库备份是指将数据库的完整数据和结构复制到另一个位置，以便进行数据恢复。")]),_._v(" "),v("li",[_._v("数据库恢复：数据库恢复是指将备份的数据和结构还原到数据库中，以便继续使用。")]),_._v(" "),v("li",[_._v("数据库复制：数据库复制是指将一个数据库中的数据复制到另一个数据库中，以便进行数据备份、数据共享、数据分发等。")]),_._v(" "),v("li",[_._v("数据库分片：数据库分片是指将一个数据库中的数据分布到多个数据库服务器上，以便进行数据存储和处理。")]),_._v(" "),v("li",[_._v("数据库连接：数据库连接是指两个或多个数据库间的通信连接。")])])])])])]),_._v(" "),v("h2",{attrs:{id:"常用命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[_._v("#")]),_._v(" 常用命令")]),_._v(" "),v("ul",[v("li",[_._v("查看数据库版本："),v("code",[_._v("SELECT VERSION();")])]),_._v(" "),v("li",[_._v("显示所有数据库："),v("code",[_._v("SHOW DATABASES;")])]),_._v(" "),v("li",[_._v("创建数据库："),v("code",[_._v("CREATE DATABASE 数据库名;")])]),_._v(" "),v("li",[_._v("删除数据库："),v("code",[_._v("DROP DATABASE 数据库名;")])]),_._v(" "),v("li",[_._v("选择数据库："),v("code",[_._v("USE 数据库名;")])]),_._v(" "),v("li",[_._v("显示所有表："),v("code",[_._v("SHOW TABLES;")])]),_._v(" "),v("li",[_._v("创建表："),v("code",[_._v("CREATE TABLE 表名 (字段名 字段类型, ...);")])]),_._v(" "),v("li",[_._v("删除表："),v("code",[_._v("DROP TABLE 表名;")])]),_._v(" "),v("li",[_._v("插入数据："),v("code",[_._v("INSERT INTO 表名 (字段名, ...) VALUES (值, ...);")])]),_._v(" "),v("li",[_._v("删除数据："),v("code",[_._v("DELETE FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("更新数据："),v("code",[_._v("UPDATE 表名 SET 字段名 = 新值 WHERE 条件;")])]),_._v(" "),v("li",[_._v("查询数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("排序数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件 ORDER BY 字段名;")])]),_._v(" "),v("li",[_._v("分页数据："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 条件 LIMIT 开始, 数量;")])]),_._v(" "),v("li",[_._v("联合查询："),v("code",[_._v("SELECT 字段名, ... FROM 表名1, 表名2 WHERE 条件;")])]),_._v(" "),v("li",[_._v("子查询："),v("code",[_._v("SELECT 字段名, ... FROM 表名 WHERE 字段名 IN (SELECT 字段名 FROM 表名 WHERE 条件);")])]),_._v(" "),v("li",[_._v("聚合函数："),v("code",[_._v("SELECT COUNT(字段名), SUM(字段名), AVG(字段名), MAX(字段名), MIN(字段名) FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("索引："),v("code",[_._v("CREATE INDEX 索引名 ON 表名 (字段名);")])]),_._v(" "),v("li",[_._v("外键："),v("code",[_._v("ALTER TABLE 表名 ADD FOREIGN KEY (字段名) REFERENCES 主表名 (主表字段名);")])]),_._v(" "),v("li",[_._v("事务："),v("code",[_._v("START TRANSACTION;")]),_._v("、"),v("code",[_._v("COMMIT;")]),_._v("、"),v("code",[_._v("ROLLBACK;")])]),_._v(" "),v("li",[_._v("视图："),v("code",[_._v("CREATE VIEW 视图名 AS SELECT 字段名, ... FROM 表名 WHERE 条件;")])]),_._v(" "),v("li",[_._v("函数："),v("code",[_._v("CREATE FUNCTION 函数名 (参数类型) RETURNS 返回类型 AS '函数代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("存储过程："),v("code",[_._v("CREATE PROCEDURE 存储过程名 (参数类型) AS '存储过程代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("触发器："),v("code",[_._v("CREATE TRIGGER 触发器名 BEFORE/AFTER 事件 ON 表名 FOR EACH ROW AS '触发器代码' LANGUAGE SQL;")])]),_._v(" "),v("li",[_._v("数据库备份："),v("code",[_._v("mysqldump -u 用户名 -p 数据库名 > 备份文件名.sql;")])]),_._v(" "),v("li",[_._v("数据库恢复："),v("code",[_._v("mysql -u 用户名 -p 数据库名 < 备份文件名.sql;")])]),_._v(" "),v("li",[_._v("数据库复制："),v("code",[_._v("mysqldump -u 用户名 -p 数据库名 | mysql -u 用户名 -p 新数据库名;")])]),_._v(" "),v("li",[_._v("数据库分片："),v("code",[_._v("CREATE TABLE 表名 (字段名 字段类型, ...) ENGINE=分片表;")])]),_._v(" "),v("li",[_._v("数据库连接："),v("code",[_._v("mysql -u 用户名 -p -h 主机名 -P 端口号 数据库名;")])]),_._v(" "),v("li",[_._v("数据库连接池："),v("code",[_._v("pip install mysql-connector-python-rf")])]),_._v(" "),v("li",[_._v("数据库连接池配置："),v("code",[_._v("pip install mysql-connector-python-rf")]),_._v("、"),v("code",[_._v("pip install DBUtils")]),_._v("、"),v("code",[_._v("pip install PyMySQL")])]),_._v(" "),v("li")])])}),[],!1,null,null,null);v.default=i.exports}}]);
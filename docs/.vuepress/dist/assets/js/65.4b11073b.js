(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{472:function(s,a,t){"use strict";t.r(a);var r=t(2),e=Object(r.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis"}},[s._v("#")]),s._v(" Redis")]),s._v(" "),a("h2",{attrs:{id:"基本数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本数据类型"}},[s._v("#")]),s._v(" 基本数据类型")]),s._v(" "),a("ul",[a("li",[s._v("非关系型数据库")]),s._v(" "),a("li",[s._v("string、list、set、zset、hash")]),s._v(" "),a("li",[s._v("纯内存操作，执行速度快")]),s._v(" "),a("li",[s._v("单线程，避免上下文切换")]),s._v(" "),a("li",[s._v("使用I/O多路复用模型，非阻塞IO")]),s._v(" "),a("li",[s._v("使用场景（String：缓存用户信息、Hash：存储对象、列表：消息队列、最新列表、最新文章、最新评论 Set：存储不重复的元素、用户标签、关注者集合）")]),s._v(" "),a("li",[s._v("缓存穿透")])]),s._v(" "),a("h2",{attrs:{id:"缓存穿透"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存穿透"}},[s._v("#")]),s._v(" 缓存穿透")]),s._v(" "),a("p",[s._v("：查询一个不存在的数据，redis查询不到数据也不会直接写入缓存，就会导致每次请求都查数据库")]),s._v(" "),a("h3",{attrs:{id:"解决办法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决办法"}},[s._v("#")]),s._v(" 解决办法")]),s._v(" "),a("p",[s._v("缓存空数据\n● 缓存空数据，查询返回的数据为空，仍把这个空结果进行缓存。\n布隆过滤器\n● 用于检索一个元素是否在一个集合中\n通过多次hash函数得到hash值")]),s._v(" "),a("h2",{attrs:{id:"缓存击穿"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存击穿"}},[s._v("#")]),s._v(" 缓存击穿")]),s._v(" "),a("p",[s._v("： 给某一个key设置了过期时间，当key过期的时候，恰好这个时间点对于这个key有大量的并发请求过来，这些并发请求可能会瞬间把DB压垮。")]),s._v(" "),a("h3",{attrs:{id:"解决办法-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决办法-2"}},[s._v("#")]),s._v(" 解决办法")]),s._v(" "),a("p",[s._v("互斥锁（强一致、性能差)\n● 钱相关的业务")]),s._v(" "),a("p",[s._v("逻辑过期（高可用、性能优）\n● 互联网行业、注重用户体验  高可用")]),s._v(" "),a("h2",{attrs:{id:"缓存雪崩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存雪崩"}},[s._v("#")]),s._v(" 缓存雪崩")]),s._v(" "),a("h3",{attrs:{id:"解决办法-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决办法-3"}},[s._v("#")]),s._v(" 解决办法")]),s._v(" "),a("p",[s._v("给不同的Key的TTL 添加随机值\n利用Redis集群提高服务的可用性 （哨兵模式、集群模式）\n给缓存业务添加降级限流策略   \t（nginx或 spring cloud gateway）\n给业务添加多级缓存\t\t（Guava 或  Caffeine）")]),s._v(" "),a("h2",{attrs:{id:"双写一致性-redis和mysql数据如何进行同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#双写一致性-redis和mysql数据如何进行同步"}},[s._v("#")]),s._v(" 双写一致性 (redis和mysql数据如何进行同步)")]),s._v(" "),a("h3",{attrs:{id:"延迟一致"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#延迟一致"}},[s._v("#")]),s._v(" 延迟一致")]),s._v(" "),a("p",[s._v("当修改了数据库的数据也要通过同时更新缓存的数据，缓存和数据库的数据要保持一致\n延时双删有脏数据的风险")]),s._v(" "),a("h3",{attrs:{id:"强一致性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#强一致性"}},[s._v("#")]),s._v(" 强一致性")]),s._v(" "),a("p",[s._v("读写锁、互斥锁 、性能不高")]),s._v(" "),a("p",[s._v("读写锁-读操作")]),s._v(" "),a("p",[s._v("读写锁-写操作")]),s._v(" "),a("h3",{attrs:{id:"异步通知保证数据的最终一致性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步通知保证数据的最终一致性"}},[s._v("#")]),s._v(" 异步通知保证数据的最终一致性")]),s._v(" "),a("p",[s._v("MQ")]),s._v(" "),a("p",[s._v("Canal\n对代码是0侵入的，不需要修改业务代码，伪装为mysql的一个从节点，canal通过读取binlog数据更新缓存")]),s._v(" "),a("p",[s._v("异步的方案")]),s._v(" "),a("h2",{attrs:{id:"redis数据持久化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis数据持久化"}},[s._v("#")]),s._v(" redis数据持久化")]),s._v(" "),a("h3",{attrs:{id:"rdb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rdb"}},[s._v("#")]),s._v(" RDB")]),s._v(" "),a("p",[s._v("： Redis Database Backup file，Redis数据快照，就是把redis内存中的所有数据都记录到磁盘中，当Redis实例故障重启后，从磁盘读取快照文件，恢复数据")]),s._v(" "),a("p",[s._v("RDB的执行原理")]),s._v(" "),a("h3",{attrs:{id:"aof"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#aof"}},[s._v("#")]),s._v(" AOF")]),s._v(" "),a("p",[s._v("AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件。")]),s._v(" "),a("p",[s._v("RDB &AOF对比")]),s._v(" "),a("h2",{attrs:{id:"redis的过期策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis的过期策略"}},[s._v("#")]),s._v(" Redis的过期策略")]),s._v(" "),a("p",[s._v("惰性删除")]),s._v(" "),a("p",[s._v("定期删除")]),s._v(" "),a("h2",{attrs:{id:"redis的数据淘汰策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis的数据淘汰策略"}},[s._v("#")]),s._v(" Redis的数据淘汰策略")]),s._v(" "),a("p",[s._v("allkeys-LRU：最近最少使用，用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高\nLFU：最少频率使用，会统计每个key的访问频率，值越小淘汰优先级越高\nredis分布式锁")]),s._v(" "),a("h2",{attrs:{id:"redisson-实现的分布式锁-执行流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redisson-实现的分布式锁-执行流程"}},[s._v("#")]),s._v(" redisson 实现的分布式锁-执行流程")]),s._v(" "),a("p",[s._v("Watch dog会给锁 续期")]),s._v(" "),a("h2",{attrs:{id:"redisson-实现分布式锁的代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redisson-实现分布式锁的代码"}},[s._v("#")]),s._v(" redisson 实现分布式锁的代码")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('public void redislock() throws interruptedexception\n获取锁（重入镇）,执行锁的名称\nrlock lock redissonclient.getlock(s:"heimalock`);\n[t登试获取领，参数分别是：获取领的最大等持时间（阴问会重试）,顾自动释放时间，时间单位\n//boolean islock lock.trylock(10,30,timeunit.seconds);\nboolean islock lock.trylock(time:10,timeunit.seconds);\n判断是否获取成功 加锁，设置过期时间等操作都是基于lua脚本完成\nif(islock)\ntry\nsystem.out.printtn(执行业务");\n3 finally\n1释放锁\nlock.unlock();\n')])])]),a("p",[s._v("redisson实现的分布式锁-可重入")]),s._v(" "),a("p",[s._v("redisson 实现的分布式锁- 主从一致性")]),s._v(" "),a("p",[s._v("主从复制\n主从同步\n主从全量同步")]),s._v(" "),a("p",[s._v("主从增量同步")]),s._v(" "),a("p",[s._v("哨兵模式")]),s._v(" "),a("p",[s._v("服务状态监控")]),s._v(" "),a("p",[s._v("redis集群（哨兵模式）脑裂")]),s._v(" "),a("p",[s._v("=======")])])}),[],!1,null,null,null);a.default=e.exports}}]);
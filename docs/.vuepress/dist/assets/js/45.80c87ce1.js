(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{460:function(r,s,t){"use strict";t.r(s);var n=t(2),e=Object(n.a)({},(function(){var r=this,s=r._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[s("h2",{attrs:{id:"列出几个常用的linux命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#列出几个常用的linux命令"}},[r._v("#")]),r._v(" 列出几个常用的linux命令")]),r._v(" "),s("p",[r._v("● cd 切换目录\n● ls 查看文件目录\n● grep 搜索\n● cp 复制文件\n● mv 移动文件\n● rm 删除文件\n● ps 输出进程\n● kill 杀死进程\n在vm 文件中 输入/'关键字' 可搜索关键字")]),r._v(" "),s("h2",{attrs:{id:"检查java进程是否存在"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#检查java进程是否存在"}},[r._v("#")]),r._v(" 检查java进程是否存在；")]),r._v(" "),s("p",[r._v("ps -ef |grep java\n终止pid为18037的线程\nkill -9 18037")]),r._v(" "),s("h2",{attrs:{id:"查看端口占用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查看端口占用"}},[r._v("#")]),r._v(" 查看端口占用")]),r._v(" "),s("p",[r._v("netstat -antp")]),r._v(" "),s("p",[r._v("Redis操作命令\nRedis：\n● Redis-server /usr..../redis.conf 启动redis服务，并指定配置文件\n● Redis-cli 启动redis 客户端\n● Pkill redis-server 关闭redis服务\n● Redis-cli shutdown 关闭redis客户端\n● Netstat -tunpl|grep 6379 查看redis 默认端口号6379占用情况")]),r._v(" "),s("h2",{attrs:{id:"博客命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#博客命令"}},[r._v("#")]),r._v(" 博客命令")]),r._v(" "),s("p",[r._v("blog linux 运行命令")]),r._v(" "),s("h1",{attrs:{id:"docker-命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-命令"}},[r._v("#")]),r._v(" docker 命令")]),r._v(" "),s("p",[r._v("start/stop/restart\n● docker start : 启动一个或多个已经被停止的容器。\n● docker stop : 停止一个运行中的容器。\n● docker restart : 重启容器。\n启动docker\nsystemctl start docker\n启动已被停止的容器mynginx\ndocker start mynginx\n停止运行中的容器mynginx\ndocker stop mynginx\n重启容器mynginx\ndocker restart mynginx\nkill 杀掉一个容器\n根据容器名字杀掉容器\ndocker kill tomcat7\n根据容器ID杀掉容器\ndocker kill 65d4a94f7a39")]),r._v(" "),s("h1",{attrs:{id:"容器操作命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#容器操作命令"}},[r._v("#")]),r._v(" 容器操作命令")]),r._v(" "),s("p",[r._v("ps\n列出容器。可选参数：")]),r._v(" "),s("p",[r._v("-a : 显示所有的容器，包括未运行的。\n-f : 根据条件过滤显示的内容。\n–format : 指定返回值的模板文件。\n-l : 显示最近创建的容器。\n-n : 列出最近创建的n个容器。\n–no-trunc : 不截断输出。\n-q : 静默模式，只显示容器编号。\n-s : 显示总的文件大小。\ndocker ps -a   查看docker 所有的容器\ndocker logs mysql  查看mysql 打印日志\n启动jar包\nnohup java -jar xxx.jar &\ntail -f nohup.out   输出日志\nnetstat -antp   查看所有端口\ndocker stats nginx1\nexec\n在运行的容器中执行命令。可选参数：")]),r._v(" "),s("p",[r._v("-d : 分离模式: 在后台运行\n-i : 即使没有附加也保持STDIN 打开\n-t : 分配一个伪终端\n● docker exec -it mysql bash\n● docker exec -it redis bash")]),r._v(" "),s("p",[r._v("docker run  创建一个新的容器 (-d 后台模式 -p绑定端口 -e指定environment -v数据挂载 --name名字 mysql:5.7指定镜像跟版本)\ndocker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql\ndocker run -it -d --name mysqlblog -p3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql")]),r._v(" "),s("p",[r._v("redis-cli -h localhost -p 6379 -a 532313 本地启动redis\nredis-server redis.conf\nredis-server /usr/redis/redis.conf\nredis-server /usr/redis-4.0.9/redis.conf")]),r._v(" "),s("p",[r._v("service mysqld restart\nmysql -r root -p")]),r._v(" "),s("p",[r._v("vim 编辑文件\ninsert 进入编辑状态\n：wq 保存文件并退出vi")]),r._v(" "),s("p",[r._v("cp 拷贝文件\ndocker cp 容器id:/etc/mysql/my.cnf .  拷贝到容器外\ndocker cp my.cnf 容器id:/etc/mysql    拷贝到容器里")]),r._v(" "),s("h1",{attrs:{id:"定位阿里云博客启动失败"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#定位阿里云博客启动失败"}},[r._v("#")]),r._v(" 定位阿里云博客启动失败")]),r._v(" "),s("p",[r._v("2023年12月10日23:17:47 博客重启一直失败")]),r._v(" "),s("h2",{attrs:{id:"df-h-检查磁盘内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#df-h-检查磁盘内存"}},[r._v("#")]),r._v(" df -h  检查磁盘内存")]),r._v(" "),s("p",[r._v("通过检查阿里云服务器 发现linux内存满了 导致 doker上 mysql redis全都启动失败")]),r._v(" "),s("h2",{attrs:{id:"du-sh-sort-nr"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#du-sh-sort-nr"}},[r._v("#")]),r._v(" du -sh /* |sort -nr")]),r._v(" "),s("p",[r._v("在根目录下 使用命令 查找所有文件和目录的大小排序结果")]),r._v(" "),s("p",[r._v("可以看到是usr 文件夹占用了超大内存")]),r._v(" "),s("h2",{attrs:{id:"du-sh-usr-sort-nr"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#du-sh-usr-sort-nr"}},[r._v("#")]),r._v(" du -sh /usr/* |sort -nr")]),r._v(" "),s("p",[r._v("继续使用 命令去定位usr 文件夹的问题")]),r._v(" "),s("p",[r._v("可以看到是 blogfile 文件 占用超过29G")]),r._v(" "),s("p",[r._v("最后发现是打印日志超过太多了 导致内存爆了！")]),r._v(" "),s("h2",{attrs:{id:"cat-dev-null-nohup-out-清除"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cat-dev-null-nohup-out-清除"}},[r._v("#")]),r._v(" cat /dev/null >nohup.out 清除")]),r._v(" "),s("p",[r._v("用清空命令 删除文件内容")])])}),[],!1,null,null,null);s.default=e.exports}}]);
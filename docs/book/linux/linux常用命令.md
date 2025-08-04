---
icon: pen-to-square
date: 2022-01-09
title: linux常用命令
---

## 列出几个常用的linux命令
● cd 切换目录
● ls 查看文件目录
● grep 搜索
● cp 复制文件
● mv 移动文件
● rm 删除文件
● ps 输出进程
● kill 杀死进程
在vm 文件中 输入/'关键字' 可搜索关键字

## 检查java进程是否存在；
ps -ef |grep java
终止pid为18037的线程
kill -9 18037

## 查看端口占用
netstat -antp

Redis操作命令
Redis：
● Redis-server /usr..../redis.conf 启动redis服务，并指定配置文件
● Redis-cli 启动redis 客户端
● Pkill redis-server 关闭redis服务
● Redis-cli shutdown 关闭redis客户端
● Netstat -tunpl|grep 6379 查看redis 默认端口号6379占用情况

## 博客命令
blog linux 运行命令
# docker 命令
start/stop/restart
● docker start : 启动一个或多个已经被停止的容器。
● docker stop : 停止一个运行中的容器。
● docker restart : 重启容器。
启动docker
systemctl start docker
启动已被停止的容器mynginx
docker start mynginx
停止运行中的容器mynginx
docker stop mynginx
重启容器mynginx
docker restart mynginx
kill 杀掉一个容器
根据容器名字杀掉容器
docker kill tomcat7
根据容器ID杀掉容器
docker kill 65d4a94f7a39
# 容器操作命令
ps
列出容器。可选参数：

-a : 显示所有的容器，包括未运行的。
-f : 根据条件过滤显示的内容。
–format : 指定返回值的模板文件。
-l : 显示最近创建的容器。
-n : 列出最近创建的n个容器。
–no-trunc : 不截断输出。
-q : 静默模式，只显示容器编号。
-s : 显示总的文件大小。
docker ps -a   查看docker 所有的容器
docker logs mysql  查看mysql 打印日志
启动jar包
nohup java -jar xxx.jar &
tail -f nohup.out   输出日志
netstat -antp   查看所有端口
docker stats nginx1
exec
在运行的容器中执行命令。可选参数：

-d : 分离模式: 在后台运行
-i : 即使没有附加也保持STDIN 打开
-t : 分配一个伪终端
● docker exec -it mysql bash
● docker exec -it redis bash

docker run  创建一个新的容器 (-d 后台模式 -p绑定端口 -e指定environment -v数据挂载 --name名字 mysql:5.7指定镜像跟版本)
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
docker run -it -d --name mysqlblog -p3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql

redis-cli -h localhost -p 6379 -a 532313 本地启动redis
redis-server redis.conf
redis-server /usr/redis/redis.conf
redis-server /usr/redis-4.0.9/redis.conf

service mysqld restart
mysql -r root -p

vim 编辑文件
insert 进入编辑状态
：wq 保存文件并退出vi

cp 拷贝文件
docker cp 容器id:/etc/mysql/my.cnf .  拷贝到容器外
docker cp my.cnf 容器id:/etc/mysql    拷贝到容器里
# 定位阿里云博客启动失败
2023年12月10日23:17:47 博客重启一直失败
## df -h  检查磁盘内存
通过检查阿里云服务器 发现linux内存满了 导致 doker上 mysql redis全都启动失败


## du -sh /* |sort -nr
在根目录下 使用命令 查找所有文件和目录的大小排序结果

可以看到是usr 文件夹占用了超大内存
## du -sh /usr/* |sort -nr
继续使用 命令去定位usr 文件夹的问题

可以看到是 blogfile 文件 占用超过29G

最后发现是打印日志超过太多了 导致内存爆了！

## cat /dev/null >nohup.out 清除
用清空命令 删除文件内容

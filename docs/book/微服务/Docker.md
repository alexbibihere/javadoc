---
icon: pen-to-square
date: 2022-01-09
title: Docker
---
## 什么是 Docker？

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 或 Windows 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

## Docker 架构
Docker 使用客户端-服务器 (C/S) 架构模式，Docker 客户端与 Docker 服务器进行通信，Docker 服务器负责构建、运行和分发 Docker 容器。Docker 客户端和 Docker 服务器可以运行在同一台机器上，也可以通过网络连接。Docker 客户端和 Docker 服务器 communicate via a REST API, over a UNIX socket or a network interface.

## Docker 镜像

Docker 镜像是一个轻量级、可执行的包，里面包含了运行一个应用所需的所有东西，包括代码、运行时、库、环境变量和配置文件。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

## Docker 容器
Docker 容器是一个运行中的应用实例，它是镜像的运行实例，可以理解为一个轻量级的虚拟机。容器与镜像的关系类似于面向对象编程中的对象与类。容器可以被创建、启动、停止、删除、暂停等。

## Docker 仓库
Docker 仓库是一个集中存储和分发 Docker 镜像的地方。Docker Hub 是 Docker 官方提供的公共仓库，里面提供了大量的高质量的官方镜像。

## Docker 常用命令

- `docker run`：运行一个 Docker 容器
- `docker ps`：列出当前运行的 Docker 容器
- `docker images`：列出当前系统上所有 Docker 镜像
- `docker pull`：从 Docker Hub 上拉取镜像
- `docker build`：根据 Dockerfile 构建镜像
- `docker commit`：提交一个容器为新的镜像
- `docker push`：将本地镜像上传到 Docker Hub
- `docker rmi`：删除一个镜像
- `docker rm`：删除一个容器
- `docker stop`：停止一个运行中的容器
- `docker start`：启动一个停止的容器
- `docker restart`：重启一个运行中的容器
- `docker logs`：查看容器的日志

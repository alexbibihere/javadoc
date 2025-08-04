---
icon: pen-to-square
date: 2022-01-09
title: RabbitMQ 简介
---
# RabbitMQ 简介

RabbitMQ 是一款开源的消息队列软件，由 Erlang 语言编写，基于 AMQP 协议。RabbitMQ 最初起源于金融系统，用于在分布式系统中存储和转发消息。RabbitMQ 是一个在 AMQP 协议上提供可靠性、可扩展性和高可用性的企业级消息队列。

RabbitMQ 主要有以下功能：

- 队列：RabbitMQ 提供了多种队列类型，包括普通队列、主题队列、交换机队列等。
- 交换机：RabbitMQ 提供了多种交换机类型，包括直连交换机、主题交换机、头交换机等。
- 消息路由：RabbitMQ 提供了消息路由功能，可以将消息从一个队列路由到另一个队列。
- 高可用性：RabbitMQ 提供了高可用性的集群架构，可以保证消息的可靠投递。
- 多协议支持：RabbitMQ 支持多种消息队列协议，包括 AMQP、STOMP、MQTT 等。
- 管理界面：RabbitMQ 提供了管理界面，可以方便地管理消息队列。
- 多语言客户端：RabbitMQ 提供了多种语言的客户端，包括 Java、.NET、Python、Ruby、PHP 等。
- 多平台支持：RabbitMQ 支持多种平台，包括 Linux、Windows、MacOS、BSD 等。

## 常用代码
```
// 连接 RabbitMQ
Connection connection = new ConnectionFactory().newConnection();

// 创建通道
Channel channel = connection.createChannel();

// 创建队列
channel.queueDeclare("hello", false, false, false, null);

// 发送消息
channel.basicPublish("", "hello", null, "Hello World!".getBytes());

// 接收消息
QueueingConsumer consumer = new QueueingConsumer(channel);
channel.basicConsume("hello", true, consumer);

while (true) {
    QueueingConsumer.Delivery delivery = consumer.nextDelivery();
    String message = new String(delivery.getBody());
    System.out.println("Received message: " + message);
}

// 关闭通道和连接
channel.close();
connection.close();
```

## 如何保证消息不丢失
RabbitMQ 提供了持久化消息的功能，可以将消息持久化到磁盘，防止消息丢失。
- 生产者确认机制
- 消息持久化
- 消息确认机制
- 消息重试机制

## RabbitMQ 消息的重复消费问题
- 每条消息设置唯一的标识id
- 幂等方案：【分布式锁、数据锁（悲观锁、乐观锁）】

##  消息堆积问题
- 增加更多消费者，提高消费能力
- 在消费者内开启线程池加快消息处理速度
- 扩大队列容积，提高堆积上限
---
icon: pen-to-square
date: 2022-01-09
category:
  - Cherry
tag:
  - red
  - small
  - round
---
# RocketMQ

## 简介

RocketMQ 是一款开源的分布式消息中间件，由阿里巴巴集团开源，是一款高性能、高吞吐量、高可用性的分布式消息中间件。RocketMQ 基于高可用分布式集群技术，提供低延迟、高tps、高可靠的消息发布与订阅服务。RocketMQ 具有以下主要特性：

1. 高性能：RocketMQ 采用了高性能的设计理念，通过充分利用多核、网络、磁盘等资源，在单机和集群模式下都能提供高性能。

2. 高吞吐量：RocketMQ 采用主从架构，主节点负责接收和处理消息，从节点则提供高吞吐量的消息拉取服务。

3. 高可用性：RocketMQ 集群支持主从架构，主节点提供消息发布和订阅服务，从节点则提供高可用性的消息存储服务。

4. 低延迟：RocketMQ 采用了多级缓存架构，通过集群部署和主从复制，保证消息的低延迟。

5. 高可靠：RocketMQ 采用了多副本机制，确保消息不丢失，并且支持消息回溯。

6. 多样化的消息模型：RocketMQ 支持丰富的消息模型，包括普通消息、顺序消息、事务消息、延时消息等。

7. 广泛的应用场景：RocketMQ 广泛应用于微服务、SOA、异步通信、大数据、流计算等领域。

## 架构

RocketMQ 的架构如下图所示：

![RocketMQ Architecture](https://rocketmq.apache.org/docs/images/rocketmq_arch.png)

RocketMQ 由 Producer、Consumer、NameServer、Broker 四个角色组成。

- Producer：消息的生产者，向 RocketMQ 集群中发布消息。
- Consumer：消息的消费者，从 RocketMQ 集群中订阅并消费消息。
- NameServer：RocketMQ 的服务注册与发现组件，维护集群中服务地址的注册表。
- Broker：RocketMQ 的消息存储和转发组件，存储和转发消息。

## 特性

RocketMQ 具有以下特性：

1. 发布与订阅模型：RocketMQ 支持发布与订阅模型，允许一个主题有多个消费者，每个消息只会被消费一次。

2. 负载均衡：RocketMQ 支持多种负载均衡策略，包括轮询、随机、最小连接数等，可以根据集群的负载情况动态调整消息的分发策略。

3. 顺序消费：RocketMQ 支持顺序消费，可以按照消息在主题中的顺序消费。

4. 消息回溯：RocketMQ 支持消息回溯，可以按照时间或消息数量回溯消费历史消息。

5. 事务消息：RocketMQ 支持事务消息，可以确保消息的可靠投递和消费。

6. 延时消息：RocketMQ 支持延时消息，可以将消息延迟到指定的时间点再投递。

7. 高可用性：RocketMQ 集群支持主从架构，主节点提供消息发布和订阅服务，从节点则提供高可用性的消息存储服务。

8. 高吞吐量：RocketMQ 采用主从架构，主节点负责接收和处理消息，从节点则提供高吞吐量的消息拉取服务。

9. 低延迟：RocketMQ 采用了多级缓存架构，通过集群部署和主从复制，保证消息的低延迟。

## 常用代码

1. 发送消息

```java
public class Producer {
    public static void main(String[] args) throws Exception {
        // 1. 创建一个 Producer 实例
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName");
        // 2. 设置 NameServer 地址
        producer.setNamesrvAddr("localhost:9876");
        // 3. 启动 Producer 实例
        producer.start();
        // 4. 创建消息对象，并设置主题和标签
        Message msg = new Message("TopicTest", "TagA", "OrderID188", "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
        // 5. 发送消息
        producer.send(msg);
        // 6. 关闭 Producer 实例
        producer.shutdown();
    }
}
```

2. 接收消息

   ```java
   public class Consumer {
       public static void main(String[] args) throws Exception {
           // 1. 创建一个 Consumer 实例
           DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroupName");
           // 2. 设置 NameServer 地址
           consumer.setNamesrvAddr("localhost:9876");
           // 3. 订阅主题
           consumer.subscribe("TopicTest", "TagA");
           // 4. 启动 Consumer 实例
           consumer.start();
           // 5. 接收消息
           Message msg = consumer.receive();
           // 6. 处理消息
           String body = new String(msg.getBody(), RemotingHelper.DEFAULT_CHARSET);
           System.out.println(body);
           // 7. 确认消息
           consumer.ack(msg);
           // 8. 关闭 Consumer 实例
           consumer.shutdown();
       }
   }
   ```
   3. 事务消息
```java
public class TransactionProducer {
    public static void main(String[] args) throws Exception {
        // 1. 创建一个 TransactionMQProducer 实例
        TransactionMQProducer producer = new TransactionMQProducer("TransactionProducerGroupName");
        // 2. 设置 NameServer 地址
        producer.setNamesrvAddr("localhost:9876");
        // 3. 启动 Producer 实例
        producer.start();
        // 4. 创建事务消息对象，并设置主题和标签
        Message msg = new Message("TopicTest", "TagA", "OrderID188", "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
        // 5. 创建事务消息
        TransactionSendResult result = producer.sendMessageInTransaction(msg, null);
        // 6. 处理事务消息结果
        if (result.isOk()) {
            // 事务消息发送成功
            System.out.println("事务消息发送成功");
        } else {
            // 事务消息发送失败
            System.out.println("事务消息发送失败");
        }
        // 7. 关闭 Producer 实例
        producer.shutdown();
    }
}
```


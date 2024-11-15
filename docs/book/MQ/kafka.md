---
icon: pen-to-square
date: 2024-8-19
category:
  - 集合
  - Fruit
tag:
  - yellow
  - curly
  - long
---

# kafka 简介
kafka 是一种高吞吐量的分布式消息系统，它可以处理消费者生成的大量数据。它提供了一个分布式的提交日志，使得系统中的数据可以持久化，并可以从任何地方消费。kafka 被设计为一个分布式的、可扩展的、多分区的、多副本的消息系统。它最初由 LinkedIn 开发，并于 2011 年开源。
kafka 主要有以下几个特点：

1. 高吞吐量：kafka 能处理消费者生成的大量数据，它可以提供实时的消费能力。

2. 高容错性：kafka 集群中的各个节点都可以容忍部分节点失效，它可以保证消息的可靠性。

3. 高可用性：kafka 集群中的各个节点都可以容忍部分节点失效，它可以保证消息的持久化。

4. 灵活的消息分发：kafka 提供了多种消息分发的方式，包括轮询、随机、按 key 等。

5. 实时数据分析：kafka 可以实时地消费数据并进行数据分析，这对于实时数据处理和实时数据分析是非常有用的。

kafka 的架构如下图所示：

![kafka-architecture](https://kafka.apache.org/21/images/kafka_architecture.png)

kafka 的主要组件包括：

1. 生产者：生产者负责产生消息并将其发送到 kafka 集群。

2. 消费者：消费者负责从 kafka 集群中消费消息。

3. 集群：kafka 集群由一个或多个服务器组成，它们之间通过 TCP 协议通信。

4. 主题：主题是 kafka 中消息的分类，生产者和消费者可以向特定的主题发布和订阅消息。

5. 分区：分区是 kafka 中消息的存储和分配单位，每个主题可以有多个分区。

6. 副本：副本是 kafka 中消息的冗余备份，它可以提高消息的可靠性。

7. 消息：消息是 kafka 中存储的基本单元，它包含一个键、一个值和一个时间戳。

kafka 的优点：

1. 高吞吐量：kafka 具有高吞吐量的特性，它可以处理消费者生成的大量数据。

2. 高容错性：kafka 集群中的各个节点都可以容忍部分节点失效，它可以保证消息的可靠性。

3. 高可用性：kafka 集群中的各个节点都可以容忍部分节点失效，它可以保证消息的持久化。

4. 灵活的消息分发：kafka 提供了多种消息分发的方式，包括轮询、随机、按 key 等。

5. 实时数据分析：kafka 可以实时地消费数据并进行数据分析，这对于实时数据处理和实时数据分析是非常有用的。

kafka 的缺点：

1. 复杂的架构：kafka 架构相对复杂，它需要一个 Zookeeper 集群来管理集群中的元数据。

2. 依赖 Zookeeper：kafka 依赖 Zookeeper 集群来管理集群中的元数据，这会增加系统的复杂性。

3. 性能损耗：kafka 集群的性能受限于磁盘 I/O 和网络带宽。

kafka 的适用场景：

1. 日志收集：kafka 适合于日志收集场景，它可以收集和处理大量的日志数据。

2. 网站活动跟踪：kafka 适合于网站活动跟踪场景，它可以实时地消费网站的用户行为数据。

3. 实时数据处理：kafka 适合于实时数据处理场景，它可以实时地消费数据并进行数据分析。

4. 事件驱动架构：kafka 适合于事件驱动架构，它可以用于解耦生产者和消费者，实现事件的发布和订阅。

5. 流式处理：kafka 适合于流式处理场景，它可以实时地消费数据并进行数据分析。
6. 机器学习：kafka 适合于机器学习场景，它可以实时地消费数据并进行数据分析。
7. 消息系统：kafka 适合于消息系统，它可以用于解耦生产者和消费者，实现消息的发布和订阅。
8. 日志聚合：kafka 适合于日志聚合场景，它可以收集和处理大量的日志数据。
9. 应用监控：kafka 适合于应用监控场景，它可以实时地消费应用的性能数据。
10. 广告点击日志：kafka 适合于广告点击日志场景，它可以收集和处理大量的日志数据。
11. 股票交易数据：kafka 适合于股票交易数据场景，它可以实时地消费股票交易数据。
12. 物联网数据：kafka 适合于物联网数据场景，它可以实时地消费物联网数据。
13. 订单处理数据：kafka 适合于订单处理数据场景，它可以实时地消费订单处理数据。
14. 运维监控：kafka 适合于运维监控场景，它可以实时地消费运维数据

kafka 常用代码
```
java
// 生产者
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

producer.send(new ProducerRecord<>("my-topic", "key", "value"));

// 消费者
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Collections.singletonList("my-topic"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (ConsumerRecord<String, String> record : records)
        System.out.printf("offset = %d, key = %s, value = %s%n", record.offset(), record.key(), record.value());
}
```

---
icon: pen-to-square
date: 2022-01-07
category:
  - Banana
tag:
  - yellow
  - curly
  - long
---

## 介绍

Map 是一种无序的键值对集合，其中键必须是唯一的。Map 允许通过键来快速检索值。

## 特点

- Map 是一个无序的键值对集合，其中键必须是唯一的。
- Map 允许通过键来快速检索值。
- Map 是一个接口，因此可以存储各种类型的值。
- Map 不是线程安全的。

## 常用方法

- `put(key, value)`：将键值对添加到 Map 中。
- `get(key)`：通过键获取对应的值。
- `containsKey(key)`：判断 Map 中是否包含指定的键。
- `remove(key)`：通过键删除键值对。
- `size()`：获取 Map 中键值对的数量。
- `isEmpty()`：判断 Map 是否为空。
- `clear()`：清空 Map。


## HashMap

HashMap 是 Map 接口的实现类，是一种常用且高效的 Map 实现。

HashMap 底层使用哈希表实现，通过哈希函数将键映射到数组索引位置，从而快速检索值。

HashMap 允许键和值为空，但键不能为空。

HashMap 不是线程安全的，如果需要线程安全的 Map，可以使用 ConcurrentHashMap。 

## HashMap的底层原理
### HashMap的核心组成：
- 一个Node<K,V>[]数组（也叫哈希桶）
- 链表结构（解决哈希冲突）
- 红黑树结构（JDK 1.8引入，优化大量哈希冲突场景）
### JDK 1.8引入红黑树的原因：
在JDK 1.8之前，HashMap处理冲突的方式只有一种：链表。但当哈希冲突严重时，链表会变得很长，这样会导致查询效率下降。

比如有这样一个场景：假设所有的key都映射到同一个桶中，形成了一个长度为n的链表，那么查询时间复杂度就变成了O(n)，而不是我们期望的O(1)。

#### JDK 1.8的改进：

- 当链表长度超过8时，链表会转换为红黑树
- 当红黑树节点数量小于6时，会退化为链表
- 红黑树的查询时间复杂度为O(log n)，大大提高了效率
这种设计体现了空间和时间的权衡。短链表占用空间少但查询较慢，红黑树占空间多但查询很快。

## HashMap的实现原理
### hashmap的数据结构：底层使用hash表数据结构，即数组和链表或红黑树
1. 当我们往hashmap中put元索时，利用key的hashcode重新hash计算出当前对象的元素在数组中的下标
2. 存储时，如果出现hash值相同的key,此时有两种情况。
- a.如果key相同，则覆盖原始值；
- b.如果key不同（出现冲突）,则将当前的key-value放入链表或红黑树中
3. 获取时，直接找到hash值对应的下标，在进一步判断key是否相同，从而找到对应值。
链表的长度大于8且数组长度大于64
转换为红黑树

## HashMap的扩容机制
当HashMap中的元素数量超过capacity * loadFactor时，会触发扩容操作：

- 1.创建一个新的数组，容量为原来的2倍
- 2.重新计算每个元素在新数组中的位置
- 3.将原数组中的所有元素移动到新数组中
JDK 1.8对扩容进行了优化：元素的新位置要么在原位置，要么在原位置+原数组长度的位置。

## LinkedHashMap

LinkedHashMap 是 HashMap 的子类， LinkedHashMap 继承了 HashMap 的所有方法，并保留了插入顺序。

LinkedHashMap 保证了按照插入顺序遍历 Map 的顺序。

## TreeMap

TreeMap 是 Map 接口的实现类，TreeMap 继承了 AbstractMap，并实现了 NavigableMap 接口。

TreeMap 是一个有序的 Map，按照键的自然顺序或者自定义比较器排序。

TreeMap 允许键和值为空，但键不能为空。

TreeMap 不是线程安全的，如果需要线程安全的 Map，可以使用 ConcurrentSkipListMap。

## ConcurrentHashMap

ConcurrentHashMap 是 Map 接口的实现类，ConcurrentHashMap 继承了 AbstractMap，并实现了 ConcurrentMap 接口。

ConcurrentHashMap 是一个线程安全的 Map，通过分段锁实现并发访问。

ConcurrentHashMap 允许键和值为空，但键不能为空。

ConcurrentHashMap 不是按照插入顺序遍历 Map，而是按照插入顺序遍历分段锁的各个段。 


# 为什么不用HashTable？因为ConcurrentHashMap使用了分段锁技术（JDK1.8后改用CAS+synchronized）：

- JDK1.7：使用Segment数组实现分段锁
- JDK1.8：使用CAS+synchronized锁定链表/红黑树的头结点
这就相当于把一个大锁变成了很多小锁，大大提高了并发效率。我记得有次面试官问我这个问题，我说了用ConcurrentHashMap，还特意解释了它在JDK1.7和1.8中实现的区别，面试官很满意。

## 适用场景总结 🎯
- 单线程环境：首选HashMap，简单高效
- 并发环境：
低并发：可用Collections.synchronizedMap
高并发：必选ConcurrentHashMap
- 历史遗留项目：可能会看到HashTable，但新代码应避免使用
记住一句话："HashMap快但不安全，HashTable安全但不快，ConcurrentHashMap既安全又快"。
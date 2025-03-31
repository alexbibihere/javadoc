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

HashMap 不是线程安全的，如果需要线程安全的 Map，可以使用 ConcurrentHashMap。 ]

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
- 在添加元素或初始化的时候需要调用resize方法进行扩容，第一次添加数据初始化数组长度为16,以后每次每次扩
 容都是达到了扩容阈值（数组长度*0.75)
- 每次扩容的时候，都是扩容之前容量的2倍；
- 扩容之后，会新创建一个数组，需要把老数组中的数据挪动到新的数组中
没有hash冲突的节点，则直接使用e.hash&(newcap-1)计算新数组的索引位置
如果是红黑树，走红黑树的添加
如果是链表，则需更通历链表，可能需要拆分链表，判断（chash&oldcap是否为o,该元素的位置要么停留在原始位置，要么移
动到原始位置+增加的数组大小这个位置上

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



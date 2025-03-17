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



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

# List中ArrayList和LinkedList的区别
## 1. 存储位置
ArrayList和LinkedList都是List接口的实现类，但是两者的存储位置不同。

ArrayList是基于数组实现的，底层是数组，可以随机访问元素，但是插入和删除元素效率低，因为需要移动元素。

LinkedList是基于链表实现的，底层是链表，只能顺序访问元素，但是插入和删除元素效率高，因为不需要移动元素。

## 2. 线程安全性
ArrayList不是线程安全的，因为它对数组的操作不是原子性的，可能会导致数据不一致。

LinkedList是线程安全的，因为它对链表的操作是原子性的，不会导致数据不一致。

## 3. 内存占用
ArrayList的内存占用是固定的，因为它底层是数组，数组的大小是固定的，不会随着元素的增加而增加。

LinkedList的内存占用是可变的，因为它底层是链表，链表的大小是可变的，随着元素的增加而增加。

## 4. 选择
一般情况下，如果需要频繁的插入和删除元素，建议使用LinkedList，因为它具有更高的效率。

如果需要频繁的随机访问元素，建议使用ArrayList，因为它具有更高的效率。

如果需要线程安全的操作，建议使用LinkedList，因为它具有更高的效率。

如果需要快速的内存占用，建议使用ArrayList，因为它具有更高的效率。


## ArrayList底层实现原理
ArrayList是基于数组实现的，底层是数组，数组的大小是固定的，当添加元素时，如果数组的容量不够，则会重新分配一个新的数组，并将原数组中的元素复制到新数组中。

ArrayList的扩容机制：

```java
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // grow by 50%
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

ArrayList的扩容机制是每次增加原数组大小的1/2，这样可以避免频繁的扩容操作，提高效率。

## LinkedList底层实现原理
LinkedList是基于链表实现的，底层是链表，链表的每个节点都包含数据和指针，指针指向下一个节点。

LinkedList的插入操作：

```java
public void add(int index, E element) {
    checkPositionIndex(index);

    if (index == size)
        linkLast(element);
    else
        linkBefore(element, node(index));
}

private void linkLast(E e) {
    final Node<E> l = last;
    final Node<E> newNode = new Node<>(l, e, null);
    last = newNode;
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
}

private void linkBefore(E e, Node<E> succ) {
    final Node<E> pred = succ.prev;
    final Node<E> newNode = new Node<>(pred, e, succ);
    succ.prev = newNode;
    if (pred == null)
        first = newNode;
    else
        pred.next = newNode;
    size++;
    modCount++;
}
```



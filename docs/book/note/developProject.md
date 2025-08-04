---
icon: pen-to-square
date: 2025-7-23
title: 开发项目必备知识
---
# 开发项目必备知识

* 架构设计
* 掌握 Java 基本语法
* 分析各种常用的类以及方法
* 掌握开发必备技巧
* 分析源码
## 注解
### @Transactional(rollbackFor = Exception.class)
1.Java 中，事务是一组操作，要么全部成功，要么全部失败。在关系型数据库中，事务通常是指一组 SQL 操作，这些操作要么全部执行成功，要么全部回滚。
当发生异常或错误时，事务会自动回滚，以保证数据的一致性和完整性。
可以将 rollbackFor 属性设置为其他异常类型，例如 RuntimeException，表示在发生 RuntimeException 异常时回滚事务。

2.如果不指定 rollbackFor 属性，则默认只会在发生 RuntimeException 或 Error 异常时回滚事务。
(ps：public class RuntimeException extends Exception)

3.@Transactional 注解只能应用于 public 访问权限的方法

## 必备方法

### Objects.equals()
是一个条件表达式，用于比较两个值是否相等。

### substring()
substring() 方法接收两个参数：第一个参数是一个整数 beginIndex，表示要截取的子串的起始位置（包含）；第二个参数是一个整数 endIndex，表示要截取的子串的结束位置（不包含）。如果省略第二个参数，则默认截取到字符串的末尾。

### Optional.ofNullable()
用于将一个可能为 null 的值封装成 Optional 对象。
AI生成项目
1
Optional.ofNullable() 方法接受一个可能为 null 的值作为参数，如果该值为 null，则返回一个空的 Optional 对象；否则，返回一个包含该值的 Optional 对象。

## 知识

### 为什么要实现Serializable 接口
Serializable 接口是 Java 中的一个标记接口，它没有任何方法或属性，只是用于标记一个类的实例可以被序列化和反序列化。
当一个类实现了 Serializable 接口后，这个类的实例就可以被序列化为字节流，从而方便地在网络中传输、存储到文件中或者在不同应用程序之间共享（存储在持久化存储中（如数据库、磁盘文件等）
### 为什么要重写父类的hashcode和equal
每个对象都有一个默认的 hashCode() 和 equals() 方法。hashCode() 方法根据对象的内部状态计算出一个 hash 值，用于在哈希表等数据结构中快速查找对象；equals() 方法用于比较两个对象是否相等。
默认的 hashCode() 和 equals() 方法是根据对象的内存地址来计算的，而不是根据对象的属性值。因此，如果我们需要根据对象的属性值来比较两个对象是否相等，就需要重写 hashCode() 和 equals() 方法。

重写 hashCode() 和 equals() 方法是为了比较对象是否相等，以及为了让对象能够被正确地存储在哈希表等数据结构中。在实现时需要遵循规范和注意一致性问题。

### AtomicInteger
原子性整数类，可以实现线程安全的整数操作。AtomicInteger 内部使用了 CAS算法，保证了对整数的操作是原子性的，不会出现线程安全问题。
使用 AtomicInteger 可以避免多线程环境下对同一个整数变量进行操作时出现的线程安全问题，例如竞争条件、死锁等。
此外，AtomicInteger 还可以提高程序的性能，因为它使用了硬件级别的原子性操作，避免了锁的竞争，从而提高了程序的并发性能。
如果需要保证多个操作的原子性，可以使用 AtomicLong 或者 AtomicReference 等原子性类来实现。
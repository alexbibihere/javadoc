---
icon: pen-to-square
date: 2022-01-11
title: Mybatis-plus
---

# Mybatis-plus的使用

## 介绍

Mybatis-plus是 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。Mybatis-plus 相比 MyBatis，有以下优点：

1. 无侵入：Mybatis-plus 不会对 MyBatis 原有的功能进行任何影响，它只是对 MyBatis 的功能进行扩展，使用起来更加方便。
2. 方便：Mybatis-plus 提供了丰富的 CRUD 操作，使得开发者可以快速的操作数据库。
3. 面向对象：Mybatis-plus 使用面向对象的思想来操作数据库，使得代码更加易读、易维护。
4. 性能优化：Mybatis-plus 内置的分页插件，可以有效的提升查询效率。
5. 生态丰富：Mybatis-plus 还提供了代码生成器、分页插件、性能分析插件等等，可以帮助开发者更好的进行开发。

## 安装

Mybatis-plus 依赖 MyBatis，所以需要先安装 MyBatis。

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.6</version>
</dependency>
```

然后安装 Mybatis-plus。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3.4</version>
</dependency>
```

## 常用代码
### 实体类

```java
@TableName("user")
@Data
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
}
```

1. `@TableName` 注解用于指定表名。
2. `@TableId` 注解用于指定主键，`type` 属性用于指定主键生成策略，`AUTO` 表示由数据库决定主键的生成策略。
3. `@Data` 注解用于生成 getters、setters、equals、hashCode、toString 方法。

### Mapper

```java
public interface UserMapper extends BaseMapper<User> {
}
```

1. `BaseMapper` 是 Mybatis-plus 提供的基类，继承它可以获得 CRUD 操作方法。
2. `UserMapper` 接口继承 `BaseMapper`，并指定泛型为 `User`，表示操作 `User` 表。

### 配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: root
  # mybatis-plus
  mybatis-plus:
    mapper-locations: classpath:mapper/*.xml
    type-aliases-package: com.example.demo.entity
```

1. `spring.datasource` 配置数据源。
2. `mybatis-plus.mapper-locations` 配置 MyBatis 的 xml 文件路径。
3. `mybatis-plus.type-aliases-package` 配置实体类所在包路径。

## CRUD 操作

Mybatis-plus 提供了丰富的 CRUD 操作方法，包括：

1. 插入：`save`、`saveBatch`、`insert`。
2. 删除：`remove`、`delete`。
3. 更新：`update`、`updateById`。
4. 查询：`selectOne`、`selectList`、`selectPage`、`selectCount`。

### 插入
```
java
User user = new User();
user.setName("Tom");
user.setAge(20);
userMapper.save(user);
```

1. `save` 方法用于插入一条记录，如果主键是自动生成的，则会自动填充。
2. `saveBatch` 方法用于批量插入记录。
3. `insert` 方法用于自定义 SQL 插入记录。

### 删除
```
userMapper.remove(Wrappers.<User>lambdaQuery().eq(User::getId, 1L));
```

1. `remove` 方法用于删除一条记录。
2. `delete` 方法用于自定义 SQL 删除记录。

### 更新
```
User user = new User();
user.setName("Jerry");
user.setAge(25);
userMapper.updateById(user);
```

1. `updateById` 方法用于更新一条记录。
2. `update` 方法用于自定义 SQL 更新记录。

### 查询
```
List<User> users = userMapper.selectList(Wrappers.<User>lambdaQuery().eq(User::getName, "Tom"));
```

1. `selectList` 方法用于查询多条记录。
2. `selectOne` 方法用于查询一条记录。
3. `selectPage` 方法用于分页查询。
4. `selectCount` 方法用于统计记录数量。


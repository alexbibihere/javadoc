# 踩了union关键字的一个坑

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">前几天，负责项目中clickhouse到doris的升级。最后升级完之后，在测试的过程中，有一个数据导出的功能，出现了SQL语法错误。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">刚开始我以为是clickhouse和doris两个不同的数据，有些sql语法有差异导致的问题。但仔细看了一下测试环境异常日志之后发现，报错的sql语句，并没有访问doris数据库，而是直接访问的mysql数据库。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">而我这次，并没有修改过mysql数据库的相关sql。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说，这个问题是同事留下的老坑。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 案发现场</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有一天下午，我在st环境的portal页面，测试一些统计数据导出的功能。因为最近我将访问一些统计数据的表，从clickhouse改成了doris中，需要在st环境验证一下功能是否正常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在测试其中一个统计数据导出功能时，出现了导出失败的提示。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">刚开始，我以为是我最近改的功能有问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">查看了一下测试环境的日志，发现有个类型转换异常：</font>

```plain
Error attempting to getcolumn'inDate'from result set.
Cause:java.sql.SQLDataException:Cannot convert string'3' to java.sql.Timestamp value
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">而在返回的实体类StatModel中：</font>

```fortran
@Data
public class StatModel {

   private String name;
   private Date inDate;
   private int type;
}
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">inDate字段是一个Date类型的，怎么会出现类型转换错误呢？</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 问题分析</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">根据代码中打印的错误日志，我很快定位到了具体的错误代码行数，把日志中错误的sql复制出来了。然后把相关?替换成具体的参数值。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这条sql很长，各种join，case when，if判断，各种括号，粗略估计有300多行，一眼根本看不明白。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了搞清楚这个sql的含义，我将这条sql在Navicat Premium中美化了一下。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">搜索了一下关键字：inDate，发现了几处使用它的地方。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">刚开始，我以为是字段别名搞错了，比如：在select时，把type字段 as 成InDate。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">结果，查看了所有子sql，发现没有出现这种情况。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在select时，都是把in_date字段as成inDate。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">不能快速查到问题，只能硬着头皮，把sql进行拆分了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">先从最内层的sql，开始执行。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">执行完之后，把sql替换成真正的值。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样可以将sql的复杂度，逐渐降低。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">比如：</font>

```plain
select id,name from a where a_code in (select code from b where name='susan')
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果下面sql的查询结果是:001和002</font>

```plain
select code from b where name='susan'
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">则之前的sql改成：</font>

```plain
select id,name from a where a_code in('001','002')
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样不断简化之后，到最外层，出现了一条这样的sql：</font>

```plain
select name,in_date,type from a where...
union all
select name,type,in_date from a where...
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">该sql语句最外层，使用union all关键字，将两个查询结果进行合并。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但却出现了一个问题：两条sql语句select的字段，顺序不一样。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样会导致部分inDate字段获取到了type字段的值，导致了文章开头的类型转换错误。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3 问题解决</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">解决上面这个问题，其实非常简单，只需要将上面的两条sql中select语句中返回的字段顺序保存一致即可。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在MySQL中union关键字的这个问题，是一个非常坑的问题，MySQL会将不同类型的数据在结果中合并返回，不会报任何异常，特别是在一些非常复杂的sql语句中，这个问题不容易被发现。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">返回的数据可能是这样的：</font>

```plain
苏三 2023-10-17 1
张三 2023-10-15 2
李四 2023-10-12 2
王五 2 2023-10-12
测试 1 2023-09-12
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">特别是如果有些查询接口做了分页功能，有可能前面的100页数据是正常的，而后面的页的数据有问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，我们在写完sql之后，一定要把该sql拿到数据库中多测试一下，特别是有union关键字的sql，加了新字段一定要多测试。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">对select语句中字段的顺序，要求非常严格。</font>



> 更新: 2024-05-20 17:12:49  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/th98igvpxzyuszgg>
# Limit深分页问题-

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">不知道你有没有遇到过这样的问题：你之前开发的一个分页查询接口，查询第1页、第2页、第3页，都能够正常返回数据，但查询最后一页或者倒数第几页时，接口返回速度非常慢（总共有10万多页）。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个时候可能遇到了MySQL的深分页问题。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 什么是深分页问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在MySQL中，分页查询功能，一般是通过limit关键字实现的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">用法如下：</font>

```plain
limit offset, pageSize
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">offset表示从哪个位置开始查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">pageSize表示一次查询多少条数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">假如有下面这条分页查询sql：</font>

```plain
select id,name from order where create_time> '2024-08-11' limit 100000,10;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">该sql的执行过程如下：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过普通二级索引树idx_create_time，过滤create_time条件，找到满足条件的记录ID。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过ID，回到主键索引树，找到满足记录的行，然后取出展示的列（回表）</font>
3. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">扫描满足条件的100010行，然后扔掉前100000行，返回。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">假如 LIMIT 和 OFFSET 关键字同时进行使用的话，limit语句会先扫描offset+n行，然后再丢弃掉前offset行，返回后n行数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说limit 100000,10，会扫描100010行，而limit 0,10，只扫描10行。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">越往后面查，分页的pageNo越深，分页查询的过程中，丢弃的数据页越多，查询效率会越来越低。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个就是我们所说的：深分页问题。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 如何解决深分页问题？</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">要解决MySQL的深分页查询问题，我们可以使用如下的方案。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2.1 记录上一次的id</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们现在的主要问题是，在分页的查询过程中，假如要查询第10万页的数据，要先扫描第9万9999页的数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果我们把上一次查询的位置记录下，后面再查询下一页的时候，就可以直接从之前的位置开始，往后查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如下面这样的：</font>

```bash
select id,name where order 
where id>1000000 limit 100000,10
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">上一次查询获取到的最大的id是1000000，那么本次查询直接从1000000的下一个位置开始查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样就可以不用查询前面的数据，提升不少的查询效率。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但这套方案有两个需要注意的地方：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需要记录上一次的查询出的id，适合上一页或下一页的场景，不适合随机查询到某一页。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需要id字段是自增的。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2.2 使用子查询</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">先用子查询查询出符合条件的主键，再用主键id做条件查出所有字段。</font>

```plain
select * from order where id in (
 select id from (
  select id from order where time>'2024-08-11' limit 100000, 10
 ) t
)
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样子查询中，可以走覆盖索引。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们之前的SQL，查询10条数据，但需要回表100010次。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">实际上，我们只需要查询10条数据，也就是我们只需要10次回表其实就够了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过子查询的方式，能够减少回表的次数。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，我们可以通过减少回表次数来优化深分页的问题。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2.3 使用inner join关联查询</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">根据子查询类似：</font>

```plain
select * from order o1
inner join (
   select id from order 
    where create_time>'2024-08-11' 
    limit 100000,10
) as o2 on o1.id=o2.id;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在inner join子语句中，也是先通过查询条件和分页条件过滤数据，返回id。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">然后再通过id做关联查询。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">可以减少回表的次数，从而提升查询速度。</font>



> 更新: 2024-09-05 11:00:49  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/qid57fkclmvys6ne>
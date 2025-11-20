# limit + order by分页产生了重复数据

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">前言</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">之前我踩过一个limit+order by的坑，最近发现有另外一个同事也踩坑了，现在拿出来跟大家分享一下。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">1 背景</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我之前提供过一个品牌的分页查询接口，该接口支持按品牌名称模糊搜索。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">由于品牌的数据很多，用户输入关键字之后，有可能搜索出很多满足条件的品牌数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">比如输入关键字：苏三，可能搜索出这样的数据： 苏三说技术</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三说</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我是苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三的知识星球</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三的公众号</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">球主苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">... 产品提了一个需求，把匹配度最高的显示到前面。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了实现产品的需求，我使用了char_length()函数。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">sql改成类似这样的：</font>

```plain
select * from brand
where name like '%苏三%'
order by char_length(name)
limit 0,20
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">增加了按名称长度升序的功能，这样可以保证返回的数据是这样的：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三说</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我是苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">球主苏三</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三说技术</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三的公众号</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">苏三的知识星球</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">...</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">匹配度最高的排到最前面</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但也却带来了另外一个问题，分页出现了重复的数据，第一页有某某数据，第二页也有某某数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为什么会出现这么神奇的现象呢？</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">2 排序</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在mysql中order by关键字是给sql语句排序。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果你不加order by，mysql默认按主键排序。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果你加了order by，同时后面的排序字段出现了重复的数据，mysql对相同的数据的排序是随机的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">order by char_length(name) 使用品牌名称长度升序，而品牌名称的长度有可能出现相同的情况，比如：我是苏三和球主苏三。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果没有用limit做分页，一次性查询所有的数据，数据只是顺序稍微有点不一样，返回的记录条数和结果没有问题、</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果这时用limit做了分页，就可能会出现问题。 我是苏三，有可能在第一次查询的时候，在第一页出现了，在第二次查询的时候，却出现在了第二页。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，如何解决问题呢？</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(248, 246, 244);">3 如何解决问题</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">上面的order by + limit 出现了数据重复的问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其根本原因是order by后面的字段，出现了重复的数据。示例中使用了char_length(name)，出现了相同长度的品牌名称。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有没有办法将排序结果固定呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">答：可以增加排序字段。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以在order by后面增加id，即主键排序。</font>

```plain
select * from brand
where name like '%苏三%'
order by char_length(name),id
limit 0,20
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">先按品牌名称长度排序，如果名称长度相同，再按主键排序。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样可以保证每次order by的排序结果是一样的，不会出现随机排序的情况。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">order by + limit的问题，我们在实际工作中，遇到的概率很大，大家一定要引起足够的重视。</font>



> 更新: 2024-05-20 17:13:43  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/idg15gxfs31zdali>
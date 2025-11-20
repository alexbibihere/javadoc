# 百万数据excel导入问题

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">最近星球中有两位小伙伴问了我关于excel数据导入的问题：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用Java如何处理复杂大数据量的excel导入解析和导入表。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">导入千万级excel文件到数据库，有没有比较快的方法？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这两个问题有些相似之处，业务场景都是需要导入大数据量的excel文件到数据库。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">今天就跟大家一起聊聊，千万级excel数据导入功能该如何实现，希望这篇文章对你会有所帮助。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1. 问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">对于千万级excel数据导入功能，可能会遇到一些问题，我们先聊聊会到哪些问题。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.1 单个Sheet存不了</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们都知道excel的一个Sheet，对于2003版，最大行数是65536行，对于2007以上版本，最大行数是1048576行。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">由此可见，千万级的数据是没法保存到excel的单个Sheet当中的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那我们该怎么办呢？</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.2 出现OOM问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">即使我们想办法，把一千万的数据保存到excel当中了，但如果程序在导入数据时，将这些数据加载到内存中，内存会直接爆掉，出现OOM问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们又该怎么办呢？</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.3 导入耗时太长</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果你在程序中使用单个线程，在循环中一个个将excel的数据写入到数据库，会有大量的远程IO操作，极有可能会导致该excel程序导入耗时很长。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如何优化excel的导入性能呢？</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.4 丢数据了</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果excel中有1000万的数据，但是你导入数据的数据只有995万，少了5万数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如何快速查询哪些数据导入失败了呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如何处理异常数据呢？</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.5 CPU使用率过高</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果我们将excel改成多线程导入，并且每个线程导入时间非常短，可能会导致线程之间在不停的切换上下文，可能会导致CPU使用率过高问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时又该怎么办呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">带着这些问题，开始今天的文章之旅。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2. EasyExcel</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">导入海量数据的Excel文件，最大的问题莫过于程序出现OOM了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">一旦出现OOM，程序将会直接挂掉。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了防止出现OOM问题，建议使用阿里开源的excel导入导出工具：EasyExcel。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">EasyExcel采用流式读取方式，我们可以直接从Excel文件中进行读取数据，不需要加载整个Excel文件到内存中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如下面这段代码：</font>

```typescript
public void readExcel(String filePath) {
    EasyExcel.read(filePath, MySheet.class, new MySheetListener()).sheet().headRowNumber(1).doRead();
}

public class MySheetListener extends AnalysisEventListener {
    private static final int DATA_SIZE = 100000;
    private List dataList = new ArrayList<>();

    @Override
    public void invoke(MySheet data, AnalysisContext context) {
        dataList.add(data);
        if (dataList.size() >= DATA_SIZE) {
            saveData(dataList);
            dataList.clear();
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        saveData(dataList);
    }

    private void saveData(List dataList) {
        //保存数据
    }
}
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在上面的这段代码中，DATA_SIZE为100000，即每读取100000条数据，就会调用一次MySheetListener的invoke()方法，并将数据加入到dataList中，最终通过saveData()方法进行批量保存。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样可以避免一次性将全部数据读取到内存中，降低内存使用的风险。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">对于百万以内的数据，放在excel的一个Sheet中问题不大。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果有千万级的数据，放在一个Sheet显然是保存不下的，我们可以将数据保存到多个Sheet中，或者直接将数据保存CSV文件中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">EasyExcel3.1.1版本已支持csv读取了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3. 性能问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过前面使用EasyExcel能够保证读取excel，不会出现OOM问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但可能会出现性能问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么该如何解决呢？</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3.1 批量保存数据</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们的程序在读取到一批excel数据之后，可能会有些业务逻辑处理，然后将数据保存到数据库当中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">你可以在一个循环中，每一条数据进行一次业务逻辑处理，然后保存数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如这样的：</font>

```plain
for(Entity entity: dataList) {

   //业务逻辑处理
   doBusiness(entity);
   //将数据保存到数据库
   save(entity);
}
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果是这样保存数据，性能可能会大打折扣，因为上面的这段代码，在for循环中一次只保存一条数据，每次都需要访问远程的数据库，影响数据写入的性能。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">优化如下：</font>

```plain
List<Entity> saveList = Lists.newArrayList();
for(Entity entity: dataList) {
   //业务逻辑处理
   doBusiness(entity);
   saveList.add(entity);
}
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">//将数据批量保存到数据库</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">batchSave(saveList);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">每次对数据库操作都是批量操作，这样可以减少访问数据库的频率，从而可以显著的提升写入数据的性能。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但需要注意的是：批量写入数据时，一次性也不要写入太多的数据。比如如果一次性写入10万的数据，可能会导致写入数据库超时，或者访问该数据库的其他程序出现异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果数据太多了，可以分配写入数据库。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如：</font>

```plain
List<Entity> saveList = Lists.newArrayList();
for(Entity entity: dataList) {
   //业务逻辑处理
   doBusiness(entity);
   saveList.add(entity);
}

//将数据批量保存到数据库
List<List<Entity>> parationList = Lists.partition(saveList,1000);
for(List<Entity> subDataList: parationList) {
   batchSave(subDataList);
}
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以通过Lists.partition方法将大数据saveList进行分割，每1000条记录为一组。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在这里推荐大家使用guava包下的Lists类进行集合操作，真的非常方便。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3.2 多线程</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过上面批量保存数据的优化，将数据的写入数据库的性能提升了一些。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果程序除了保存数据之外，还有一些业务逻辑，这样优化还是不够的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果你的程序用的是单线程，并且在一个循环中一条数据一条数据去处理业务逻辑，显然效率有点低。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">你可以将代码优化成批量处理业务逻辑，但有的时候，单个处理逻辑非常复杂，改成批量处理改造成本非常大。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时该如何优化性能呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">答：使用多线程。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以使用CompletableFuture类进行多线程调用，并且将生成的Entity对象保存到CopyOnWriteArrayList集合当中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如：</font>

```plain
List<Entity> resultList = Lists.newCopyOnWriteArrayList();
CompletableFuture.allOf(dataList.stream()
   .map(data ->
       CompletableFuture.supplyAsync(() -> {
         //业务处理
         return entity;
       },
        executor)
        .whenComplete((r,ex)-> {
           resultList.add(r);
          }
        )
   ) 
  .toArray(CompletableFuture[]::new) 
).join();
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">最后将批量保存数据的地方改成resultList的批量保存。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其中executor是配置的线程池，注意我们在日常工作中，使用CompletableFuture的场景中，记得要配置线程池，否则每次都是new一个新的线程。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">此外，如果使用多线程处理业务，可能会导致CPU使用率过高，要控制线程的数量，不能配置太多。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但线程数也不能配置太少，会影响业务处理的速度，最后可以做成配置项，可以根据项目的实际情况进行动态调整。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3.3 原始JDBC</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了方便对数据库进行操作，少写一些访问数据库的代码，通常情况下，我们在项目中会使用一些开源的ORM映射框架，比如：Mybatis或者Hibernate等。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这些ORM映射框架，虽说确实可以帮我们提升开发效率。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但它们也引入了额外的逻辑，提升了代码的复杂度，比如底层使用了反射机制，相对于直接new一个对象，它的效率更低。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用原生JDBC进行数据库操作，确实需要多写一些代码，比如获取数据库Connection、获取PreparedStatement等。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">例如：</font>

```plain
@Resource(name="dataSource")
  private DataSource dataSource;

  /* JDBC 的批量操作 */
  @Test
  public void insertBatch()  {
      Connection connection=dataSource.getConnection();
      connection.setAutoCommit(false);
      String sql="insert into test(a,b, c, d, d, f, g, , i) " +
              "   values(?,?,?,?,?,?,?,?,?) ";
      PreparedStatement statement=connection.prepareStatement(sql);
      for (int i = 0; i < 1000 ; i++) {
          statement.setString(1, "aaa"+i);
          statement.setString(2, "bbb"+i);
          statement.setInt(3, i);
          statement.setInt(4, i);
          statement.setString(5, ""+i);
          statement.setString(6, "ddd"+i);
          statement.setString(7, "eee"+i);
          statement.setString(8, "fff"+i);
          statement.setString(9, "ggg"+i);
          statement.addBatch();
      }

      long start=System.currentTimeMillis();
      statement.executeBatch();
      connection.commit();
      connection.close();
      statement.close();
  }
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但这样的批量操作效率却非常高。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">4. 异常处理</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在数据导入的过程中，可能会出现一些异常情况，比如：网络抖动，导致某一次写入数据失败了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时该如何处理呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">答：增加失败自动重试机制。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们在批量保存数据时，可以把异常捕获一下，如果判断是数据库的某些异常，可以自动重试2次，如果有任意一次成功了，则直接返回成功，否则返回失败。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在日志中打印一条异常日志，记录批次编号，集合的第一个元素和最后一个元素的数据，方便后面可以快速定位数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">导入成功之后，一定要检查excel中的数据总条数，跟数据库中导入成功的数据总条数是否相等。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">看看有没有漏数据的情况。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">对于重试之后还是没有导入成功的数据，我们可以通过日志搜索出来，分析失败的原因，是程序bug，还是数据问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果是程序bug，修复了bug之后重新导入数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果是数据问题，要咨询相关业务人员，是直接丢弃数据，还是修改excel重新导入。当然这时的excel不是完整的excel，而是只包含异常数据的excel。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">5.数据重复</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们的程序在导入excel文件时，通常情况下，需要先检查一下，该excel中是否存在重复的数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果excel数据太多，没办法一次加载到内存，根本没法校验整个excel的数据的重复性，这时该怎么办呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以校验每一批次的数据中，是否包含了重复的数据，如果有重复的数据，则直接忽略，不用写入数据库。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">防止数据库中出现重复数据最有效的办法是，在表中给关键字段增加唯一索引。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时如果我们的程序在并发批量插入数据时，刚好插入了重复的数据，就会报：Duplicate entry * for key，导致程序导入失败。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实在导入数据时，可以使用insert ignore语法，它会判断如果存在主键或者唯一索引重复的数据，则直接忽略。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样及时excel文件不小了导入了两次，产生了并发写入的问题，也不会对程序造成太大的影响。</font>



> 更新: 2024-05-20 17:20:34  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/mywggzuzsl7m9f3g>
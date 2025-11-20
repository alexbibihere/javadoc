# 升级ES踩过的一些坑

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">最近公司使用的ElasticSearch生产环境出现了好几次OOM问题，我们现在用的版本是：6.4.0，这个是非常老的版本，已经到了不得不升级的时候。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们老大把升级的任务交给我了，配合DBA一起完成这个事情，然后写一个文档给其他团队参考，到时候他们按照这个文档调整相关的代码，完成升级工作。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 如何选择版本？</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">目前ElasticSearch官方的最新版本是8.8.2，但我们公司为了考虑私有化部署，兼容阿里云服务器上的版本，目前阿里云上最新的只有：8.5.0、7.16.0和7.10.0，因此我们不打算升级到最新版。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们打算用阿里云的最新版本：8.5.0。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是DBA再dev环境，安装好了8.5.0版本的ElasticSearch服务器。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">马上遇到第一个问题，之前老版本的ElasticSearch用的分词器是hanlp，但是这个分词器在阿里云上不支持，我们必须换成ik。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是DBA找了一个跟ElasticSearch相同的版本的ik插件安装了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过kibana的dev tool工具，我测试了一下ElasticSearch的安装情况，顺便把ik分词器一起测试了一些，功能正常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">接下来，需要我调整代码了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">本来我以为很简单，找一个8.5.0版本的ElasticSearch版本的客户端，在代码中替换一下就搞定了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但后面发现我们代码中使用了ElasticSearch的高级客户端elasticsearch-rest-high-level-client，它里面有个类：RestHighLevelClient，这个类在ElasticSearch8.0以上的版本已经被移除了，推荐使用一个第三方的elasticsearch-java。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为什么要抛弃elasticsearch-rest-high-level-client：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">客户端"too heavy"，相关依赖超过 30 MB，且很多都是非必要相关的；api 暴露了很多服务器内部接口</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">一致性差，仍需要大量的维护工作。</font>
3. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">客户端没有集成 json/object 类型映射，仍需要自己借助字节缓存区实现。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但是这个类涉及的代码很多，大概有20多个方法使用了这个类。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如何直接升级</font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">pom.xml</font>](http://pom.xml/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件中ElasticSearch版本版本，就不得不重新这20多个方法，开发和测试工作量都不小。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">没办法，只能使用一个兼容版本：7.x，虽说这些版本已经将RestHighLevelClient标记为@Deprecated（标识废弃了），但其功能还是可以使用的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，我们具体要使用哪个版本呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">首先有个很现实的问题我们不得不考虑：我们这边经常做私有化部署，必须要兼容阿里云上的版本，目前阿里云上有7.16.0和7.10.0两个版本可以选择。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是，我打算使用7.16.3，它是7.16.x系列最新的版本，可能修复了一些bug。虽说已经有7.17.x的版本了，但目前7.16.3已经够用了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 编译不了</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我将</font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">pom.xml</font>](http://pom.xml/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件中的elasticsearch和elasticsearch-rest-high-level-client的jar包升级到7.16.3之后，遇到的第一个问题是项目编译不了了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">idea很快帮我们识别了无法编译的类，原来是这些类中有些import的类已经不存在了，比如：</font>

```plain
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">idea帮我们标红了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我删除无效引入，然后重新导入引入之后，这些标红很快消失了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但还有地方在报错，比如：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">SearchResponse secondResponse = esRestTemplate.sourceSearch(secondSearch);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">if(response.getHits().totalHits > 0) {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">...</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">totalHits在新版本中不是int类型的了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个问题很快被解决了，totalHits新版本中是一个对象类型，该对象有个value属性，因此可以这样改造：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">SearchResponse secondResponse = esRestTemplate.sourceSearch(secondSearch);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">if(response.getHits().totalHits.value > 0) {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">...</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">还有type的问题：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">BulkRequest bulkRequest = new BulkRequest();</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">IndexRequest indexRequest = new IndexRequest(INDEX);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.type(TYPE);</font>

[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.id</font>](http://indexrequest.id/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">(logEntity.getId());</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.source(JSONUtil.fromObjToJson(logEntity), XContentType.JSON);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">bulkRequest.add(indexRequest);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">try {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">BulkResponse bulkItemResponses = esClient.bulk(bulkRequest, RequestOptions.DEFAULT);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">if (bulkItemResponses.hasFailures()) {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">log.error("写es失败");</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">} catch (IOException e) {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">log.error("写es异常", e);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在新的版本中已经不支持type。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，需要把</font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.type</font>](http://indexrequest.type/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">(TYPE);这行代码注释掉。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">经过这三次调整之后，代码可以顺利编译成功了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3 index创建不了</font>**
[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我将项目中applicationContext-dev.properties</font>](http://xn--applicationcontext-dev-km78a344r8t5awm7iijvi.properties/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件中的elasticsearch的host、port和security-user改成新的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">然后将项目正常启动了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是，准备手动创建index开始测试功能。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">用之前的创建脚本：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">put es_test_index</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"settings":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"index":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"analysis.analyzer.default.type":"ik_max_word"</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">},</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"mappings":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"item":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"properties":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"site_id":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"type":"long",</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"index":true</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">},</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"content":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"type":"text"</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其中item是我们自定义的type名称。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在kibana中执行，一直都报错：root mapping definition has unsupported parameters。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实elasticsearch6时，官方就提到了elasticsearch7会删除type，并且elasticsearch6时已经规定每一个index只能有一个type。在elasticsearch7中使用默认的_doc作为type，官方说在8.x版本会彻底移除type。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们需要将脚本改成这样：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">put es_test_index</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"settings":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"index":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"analysis.analyzer.default.type":"ik_max_word"</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">},</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"mappings":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"properties":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"site_id":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"type":"long",</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"index":true</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">},</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"content":{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"type":"text"</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需要直接把item，即type去掉。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">修改之后，index创建成功了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">4 空指针异常</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">索引创建好了，我在本地启动job，尝试往新的elasticsearch数据库中写入数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但很快被无情打脸，该job还没执行完，就直接退出了，报了一个空指针异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我不一会儿就查到原因了，原来之前这里把type去掉了：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">BulkRequest bulkRequest = new BulkRequest();</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">IndexRequest indexRequest = new IndexRequest(esIndex);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">//indexRequest.type(esType);</font>

[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.id</font>](http://indexrequest.id/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">(getId());</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">indexRequest.source(JSONUtil.fromObjToJson(data), XContentType.JSON);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">bulkRequest.add(indexRequest);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">try {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">return esClient.bulk(bulkRequest, RequestOptions.DEFAULT);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">} catch (IOException e) {</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">log.warn("保存数据失败", e);</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">return null;</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">底层报了一个type为空，但调用了它的一个方法，就导致了空指针异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有没有办法重新设置type呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实IndexRequest有个setTypeOp()方法，该方法有：CREATE、INDEX、UPDATE、DELETE四个值。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们这里只需要设置setTypeOp()为CREATE即可。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样调整之后，空指针的问题被解决了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">es_test_index索引的数据被正常写入到了elasticsearch数据库。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">5 字段值不存在异常</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">上面我们已经将数据成功写入新的elasticsearch数据库了，现在开始测试查询功能是否正常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用命令：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">GET es_test_index/_search </font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">{</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">}</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">很快出现了下面这个异常： A document doesn‘t have a value for a field! Use doc[＜field＞].size()==0 to check if</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">原因是我们写数据时，有个upstreamBrandName字段，可以允许为空，有些数据该字段有值，根本有些数据没有该字段。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">而从elasticsearch7之后，如果doc['field'].value 中的field不存在，将抛出异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有些博客说，通过设置jvm参数： -Des.scripting.exception_for_missing_value，可以控制是否抛出异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我激动了一把。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">找DBA尝试设置了几次后，发现没效果。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">原来这个参数是给elasticsearch6用的，建议提前开启这个参数，跟elasticsearch7保持一直，也就是elasticsearch6总字段如果查询时不存在，也可以抛这个异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">没办法，我们不得不加一个判断：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"script" : "if(doc[\"field\"].size() >0) return doc[\"field\"].value;else return null;"</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果该字段的size大于0，才允许查询该字段的值。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">幸好项目中只有一个地方有这个问题，最终该问题被解决了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">6 替换分词器</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">经过之前的代码调整之后，elasticsearch的写入和查询目前已经没有问题了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但我们还需要改造一个非常重要的东西：分词器。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">之前elasticsearch6的时候，我们用的分词器是：hanlp，但在阿里云上只支持ik。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，我们不得不将项目中的分词器，也改成ik了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">目前GitHub上最新版是：6.6.2，很久都没有更新过了，elasticsearch7以上用这个版本没啥问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">项目中很快替换了分词器jar包。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但有个问题：分词需要热更新。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">之前使用hanlp的时候，有个同事从GitHub上下载了elasticsearch-hanlp的源码，改造了一下，提供了一个动态往hanlp中添加分词的接口，该接口在后台管理系统中，有个UI界面的可以直接调用。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">现在也用这种方式？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">很快就发现行不通。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">阿里云上elasticsearch的插件elasticsearch-ik，默认已经安装好，并且不允许卸载和重新安装。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说，我们根本不能直接安装外部的elasticsearch-ik的jar包。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，该如何实现热更新呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实elasticsearch-ik提供了一个配置文件：config/</font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">IKAnalyzer.cfg.xml</font>](http://ikanalyzer.cfg.xml/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">，这个文件下有这几行配置：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><?xml version="1.0" encoding="UTF-8"?></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!DOCTYPE properties SYSTEM "</font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">http://java.sun.com/dtd/properties.dtd</font>](http://java.sun.com/dtd/properties.dtd)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">"></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><properties></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><comment>IK Analyzer 扩展配置</comment></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!--用户可以在这里配置自己的扩展字典 --></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><entry key="ext_dict">mydict.dic</entry></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!--用户可以在这里配置自己的扩展停止词字典--></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><entry key="ext_stopwords"></entry></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!--用户可以在这里配置远程扩展字典 --></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!-- <entry key="remote_ext_dict"></font>[<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">http://192.168.1.88/es_new_word.txt</entry></font>](http://192.168.1.88/es_new_word.txt/entry)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> --></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!--用户可以在这里配置远程扩展停止词字典--></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"><!-- <entry key="remote_ext_stopwords">words_location</entry> --></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"></properties></font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其中ext_dict和ext_stopwords参数，可以配置本地的分词和停止分词，另外，remote_ext_dict和remote_ext_stopwords可以配置远程的分词和停止分词。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说elasticsearch-ik对分词的支持有两种：本地和远程。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果修改本地的配置文件，需要重新elasticsearch服务器才能生效，因此，该方法被否决了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，我们可以提供一个获取扩展分词的接口或者txt文件。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这很容易办到。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但接下来，有个问题：如果elasticsearch-ik调用远程接口太频繁了，而这个接口的数据太多，经常超时，可能会出现问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">带着这个疑问，我阅读了elasticsearch-ik的源码，发现它内部有个job，每隔60秒，调用一次配置的远程接口，将获取到的数据加载到内存中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实60秒也不太频繁。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">虽说目前数据库中分词的数据不多，不过为了保险起见，我在远程接口中，增加了一个二级缓存，查询分词时，优先从二级缓存中查询数据，没有查到再从数据库中查询数据，然后放入二级缓存中。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样改造之后，分词器的问题被解决了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">总结</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有时候，基础组件升级，不是一件非常容易的事情，需要考虑点很多。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">从选择版本，到解决不同版本差异化带来的一些问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">一个大的原则是：能够尽可能小的改动的基础之上，使用更多的新的功能。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">不要一味地迷恋最新的版本。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们尽可能使用稳定的版本。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">不光要考虑内网环境，还需要考虑云服务器，比如：阿里云，上面支持的功能有哪些，它可能对我们的技术方案，有一些决定性的因素。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">升级完之后，要多回归测试，避免一些意想不到的问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">有个好习惯是，把自己在升级过程中遇到的问题，用文档记录下来，以便于后面能够快速复盘，同时也能分享给大家，让大家少踩坑，少走一些弯路。</font>



> 更新: 2024-07-19 23:47:06  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/cl5cogrm5e829wcs>
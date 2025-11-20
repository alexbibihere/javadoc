# OpenFegin的坑

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在微服务调用时，OpenFegin是一个非常重要的发送HTTP请求的基础组件。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用OpenFeign调用远程服务就像调用本地方法一样方便。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但如果我们在日常工作中使用OpenFeign不当，可能会出现一些问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">今天这篇文章总结了一些OpenFeigin的坑，希望对你会有所帮助。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 没用连接池</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">OpenFeign默认情况下，是使用JDK自带的HttpURLConnection创建连接的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">它没有使用连接池。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们都知道，创建和销毁连接是一个非常耗时的操作。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在高并发的场景下，这种请求方式效率比较低。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，我们最好使用连接池。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">目前市面上主流的开源工具包有Apache HttpClient和OkHttpClient。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们以Apache HttpClient为例。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需要修改application.properties文件：</font>

```plain
feign.httpclient.enabled=true
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">开启httpclient开关。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">还需要修改pom.xml文件，引入HttpClient相关的依赖包：</font>

```xml
<dependency>    
  <groupId>io.github.openfeign</groupId>    
  <artifactId>feign-httpclient</artifactId>    
  <version>9.3.1</version>
</dependency>
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样使用OpenFegin发起远程调用时，就能通过HttpClient创建连接池了。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 全局超时时间</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">OpenFegin默认的全局超时时间是：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">连接超时10s</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">读超时60s</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">对于一些高并发的应用，这个超时时间显然太长了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们最好重新设置一下。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">设置连接超时时间为10s，读超时时间为20s：</font>

```plain
feign.client.config.default.connectTimeout=10000
feign.client.config.default.readTimeout=20000
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在业务代码中做控制，如果出现超时，则自动发起重试。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但它带来了一些新的问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">假如我们的服务需要通过OpenFegin调用A、B、C三个服务。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其中A耗时8s，B耗时2s，C耗时5s。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样就会出现这样的情况：A和B可以顺利调用，C还没调用就已经超时了，没有机会被调用。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3 单服务超时时间</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了解决全局超时时间上面的问题，我们需要给单个服务也设置超时时间。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以给单个服务设置超时时间：</font>

```plain
feign.client.config.A.connectTimeout=4000
feign.client.config.B.connectTimeout=3000
feign.client.config.C.connectTimeout=3000
feign.client.config.A.readTimeout=7000
feign.client.config.B.readTimeout=7000
feign.client.config.C.readTimeout=6000
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">A,B,C三个服务都分别设置了连接超时时间和读超时时间。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">连接超时时间三个服务加起来不超过10s，读超时时间加起来不超过20s。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样三个服务都至少能够被调用。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果每一个服务性能比较差，可以单独优化那一个服务。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">4 默认不能重试</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">OpenFeign默认是不支持失败重试的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果我们想要开启重试，可以自定义Retryer，比如下面这行代码：</font>

```plain
Retryer retryer = new Retryer.Default(200, 1000, 3);
```

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">上面的这段代码表示每间隔200ms，最大间隔1000ms重试一次，而最大重试次数是2，因为第三个参数包含了第一次请求，因此需要减1。</font>



> 更新: 2024-11-07 09:51:11  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/bv9n86olfxe603gc>
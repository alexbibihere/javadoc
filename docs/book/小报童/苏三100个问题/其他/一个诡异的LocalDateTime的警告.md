# 一个诡异的LocalDateTime的警告

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">最近在项目中使用了mongodb缓存商品数据，以便于业务系统在调用商品创建接口时，如果创建了相同的商品，能够快速返回他们所需要的数据，起一个加速的作用。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">刚开始打算使用redis做缓存的，但考虑到返回的数据量比较大，如果将这些数据保存到redis中，可能会存在大key的问题，最后随着数据越来越多，性能会不断下降。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，最后选择使用mongodb。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">但引入mongodb之后，在SpringBoot项目启动的时候，却出现了一个LocalDateTime的警告，找遍全网都没有答案。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">怎么回事呢？</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 还原事故现场</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在SpringBoot项目中使用mongodb非常简单，只需要在</font>[pom.xml](http://pom.xml/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件中引入了spring-boot-starter-data-mongodb相关的依赖包即可。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">然后在Configuration的配置类上，增加@EnableMongoRepositories注解指定basePackages路径即可。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">很快将mongodb数据读写的功能实现了，但在启动SpringBoot项目时，在日志中出现了这样一个警告：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">Registering converter from class</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[java.time.LocalDateTime](http://java.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">to class</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[org.joda.time.LocalDateTime](http://org.joda.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">as reading converter although it doesn't convert from a store-supported type; You might want to check your annotation setup at the converter implementation</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们平常使用的时间类是：</font>[java.time.LocalDateTime](http://java.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">，而</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[org.joda.time.LocalDateTime](http://org.joda.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">类是什么鬼？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为什么会出现这个警告呢？</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 分析问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">为了解决这个问题，我全局搜索了一下</font>[org.joda.time.LocalDateTime](http://org.joda.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">类，但发现项目中并没有使用。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这就更奇怪了，为什么项目中没有使用这个类，还出现了这个类的警告呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是，我根据Registering converter from class</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[java.time.LocalDateTime](http://java.time.localdatetime/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">关键字，全网搜索了一下。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">发现，有些人遇到过类似的问题，但是没有解决方案，等待其他人回复答案。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">问了一下同事，他说这个问题一直都存在，一直没有解决。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">没办法，只能硬着头皮查看源码了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">首先要确定是哪个类爆出的那个警告。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">很快在日志中查到了：|C02YK13MJG5J||WARN ||</font>[org.springframework.data](http://org.springframework.data/)[.convert.CustomConversions](http://org.springframework.data.convert.customconversions/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">，</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实是这个类打印的警告。</font>

![1716197010666-248b1e89-0811-4b6c-bfc7-0aa9c14e498f.webp](./img/82L7uI_7IRMHF99t/1716197010666-248b1e89-0811-4b6c-bfc7-0aa9c14e498f-552840.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">很快定位到register方法，里面有这样一行代码。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">而静态常量READ_CONVERTER_NOT_SIMPLE就是定义的那个异常：</font>

![1716197010414-cc56724c-0212-43ab-aa94-e0c927a15da0.webp](./img/82L7uI_7IRMHF99t/1716197010414-cc56724c-0212-43ab-aa94-e0c927a15da0-582051.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">原来是这里报出的警告。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，是什么原因会导致这个警告呢？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我在打印警告的那一行代码，加了一个断点。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">使用debug模式，重新启动SpringBoot项目之后，在断点的地方出现了这样一个类：JodaTimeConverters，引起了我的注意。顺着这个类，查到调用的地方，很快找到了JodaTimeFormatterRegistrar类。</font>

![1716197010667-f63b3ff7-8465-44ed-ace1-d3072589ae3e.webp](./img/82L7uI_7IRMHF99t/1716197010667-f63b3ff7-8465-44ed-ace1-d3072589ae3e-983375.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在它的registerFormatters方法中，有一个注册JodaTimeConverters类的方法。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">顺藤摸瓜，很快找到了DefaultFormattingConversionService类，在它的addDefaultFormatters方法中调用的JodaTimeFormatterRegistrar类的registerFormatters方法。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">addDefaultFormatters方法代码如下：</font>

![1716197010558-db0df1cd-b26d-43ee-833f-ce53c290ab64.webp](./img/82L7uI_7IRMHF99t/1716197010558-db0df1cd-b26d-43ee-833f-ce53c290ab64-326776.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">而这里有个开关：jodaTimePresent，如果它为true，则走了JodaTimeFormatterRegistrar类的逻辑。如果为false，则会走默认的DateFormatterRegistrar的逻辑。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">接下来，重点看看jodaTimePresent。</font>

![1716197010516-0c925da9-055c-4299-9d1f-669ef40eff45.webp](./img/82L7uI_7IRMHF99t/1716197010516-0c925da9-055c-4299-9d1f-669ef40eff45-380756.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">它是一个静态常量，在类初始化的时候赋值的，就是判断了</font>[org.joda.time.YearMonth](http://org.joda.time.yearmonth/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个类是否存在。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">全局很快搜索到了这个类的存在，它在</font>[joda-time-2.3.jar](http://joda-time-2.3.jar/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个包下面：</font>

![1716197011330-2384a052-01bd-4a26-a3fa-ff3298bc33c8.webp](./img/82L7uI_7IRMHF99t/1716197011330-2384a052-01bd-4a26-a3fa-ff3298bc33c8-830384.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，如何解决问题呢？</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3 解决问题</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">通过上面已经定位到</font>[org.joda.time.YearMonth](http://org.joda.time.yearmonth/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">是一个开关，它在</font>[joda-time-2.3.jar](http://joda-time-2.3.jar/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">包下。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果我们把这个jar包排除掉不就OK了？</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">于是，我在idea中找到</font>[pom.xml](http://pom.xml/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件，使用Diagrams下的Show Dependencies功能。</font>

![1716197011454-8ec6fe5f-501b-4e5e-a195-e3b25a96728e.webp](./img/82L7uI_7IRMHF99t/1716197011454-8ec6fe5f-501b-4e5e-a195-e3b25a96728e-269235.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在结果中搜索关键字：joda-time，很快定位到了那个jar包。</font>

![1716197011487-82a8fb6f-8d20-41ef-a34c-01292959adf4.webp](./img/82L7uI_7IRMHF99t/1716197011487-82a8fb6f-8d20-41ef-a34c-01292959adf4-221816.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">发现joda-time这个包，是从netflix-infix包引入的。而netflix-infix包，最终发现是从spring-cloud-starter-netflix-eureka-client包引入的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这就好办了，解决上面的问题，只需要将多余的jar包去掉就行了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我在这个包下，使用exclusions将joda-time排除了。</font>

![1716197011547-e254afd8-3435-429a-9063-f3ff370963a6.webp](./img/82L7uI_7IRMHF99t/1716197011547-e254afd8-3435-429a-9063-f3ff370963a6-863393.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">然后刷新了一下maven，重新启动了SpringBoot项目。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">最后发现，日志中那个警告消失了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说文章中的问题已经解决了。</font>

  
 



> 更新: 2024-05-20 17:23:37  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/vuzqbsecoww8m9ss>
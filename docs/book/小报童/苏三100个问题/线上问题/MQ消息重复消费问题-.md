# MQ消息重复消费问题-

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">前言</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">之前MQ带来的一些问题，我已经分享了很多了，比如：消息顺序问题、消息积压问题、消息丢失问题等等。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">今天接着MQ带来的问题这个话题，专门跟大家一起聊聊MQ消息重复消费的问题。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 MQ消息为什么会重复消费？</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">下面用一张图概况一下MQ的整体架构：</font>

![1725505233075-d5cd3d6b-9e5f-4351-8205-05f7b1aa9b02.webp](./img/GLaddHJ8XEmudWWb/1725505233075-d5cd3d6b-9e5f-4351-8205-05f7b1aa9b02-485037.webp)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ的整体架构中，需要3种角色：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ生产者：负责生成MQ消息。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ服务器：负责保存MQ消息。</font>
3. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ消费者：负责消费MQ消息。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在一个完整的MQ业务场景中，这3种角色缺一不可。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.1 MQ生产者</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ生产者如果没有做消息是否已经发送判断，可能会产生重复的消息。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样会导致MQ消费者消费重复的消息。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.2 MQ服务器</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ服务器接收到MQ消息之后，写入磁盘文件成功，但是写入offset失败了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ服务器挂了，重启之后，offset可能会丢失5秒钟左右的offset数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时候MQ消费者消费MQ时，使用的可能还是老的offset，造成同一条消息被消费多次的问题。</font>

### **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1.3 MQ消费者</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">MQ消费者消费到重复消息的场景比较多。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">比如：我们的MQ消费者在消费了MQ消息之后，没有自动确认，而是接着处理业务逻辑。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果处理成功，则手动确认消息。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果处理失败，则直接抛了异常。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">由于没有确认，offet没有变化，下次MQ消费者，还能继续消费这条消息。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">还有这种情况：比如MQ消费者出现了一个非常严重的BUG，导致一大批消息都没有正确被处理。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这时候可能会将offset回退到某一个值，重放之前消费过的消息。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这些场景都会导致MQ消息被重复消费。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">那么，如果防止MQ重复消费带来的问题呢？</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 如何解决重复消费问题？</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">其实，我在实际工作中，遇到过太多次，MQ消息被重复消息的问题。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">因此，在我们的MQ消费者中，一定要做好幂等性设计。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是：同一条MQ消息，在MQ消费者中允许被重复消费多次，但不影响正常的业务逻辑。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">RocketMQ的官方文档中提到过：RocketMQ确保所有消息至少传递一次。MQ消息在大多数情况下，不会重复。 也就是说：有少部分MQ消息会重复。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">要完全避免MQ消息不重复，非常非常难。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们必须在MQ消费者中，做好幂等性设计。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">以用户下单为例：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">判断订单是否存在，如果已存在，则直接返回该订单数据。</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果不存在，则下单，返回订单数据。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">当然为了保险起见，可以在表中给订单编号增加唯一索引。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这个订单编号是在前端跳转到下单页面，根据一定的规则，调用服务端的接口提前生成好的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这样设计之后，即使MQ消息被重复消费多次，也不会影响业务流程。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">同时，我们的MQ生产者中，也要增加是否已成功发送MQ消息的判断逻辑。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果已经发送，则无需重复发送。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">可以根据业务表的数据来做判断。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">此外，我们也要严格控制MQ重复消费的次数，特别是在MQ消费者中消费消息失败抛异常，触发重试机制时。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">需要设置一个阀值，比如：3次。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">如果MQ消费者在消费消息时，处理失败了，重试3次之后还是失败，则将该消息发送到死信队列。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">该MQ消费者不再消费这条消息了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">后续需要人工介入。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">当然我们需要有一个程序，专门监控死信队列的数据变化，一旦有数据时，发报警邮件通知相关开发人员。</font>



> 更新: 2024-09-05 11:00:34  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/yngxccxbzlhkmw8b>
(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{455:function(n,e,t){"use strict";t.r(e);var a=t(2),l=Object(a.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"rabbitmq-简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-简介"}},[n._v("#")]),n._v(" RabbitMQ 简介")]),n._v(" "),e("p",[n._v("RabbitMQ 是一款开源的消息队列软件，由 Erlang 语言编写，基于 AMQP 协议。RabbitMQ 最初起源于金融系统，用于在分布式系统中存储和转发消息。RabbitMQ 是一个在 AMQP 协议上提供可靠性、可扩展性和高可用性的企业级消息队列。")]),n._v(" "),e("p",[n._v("RabbitMQ 主要有以下功能：")]),n._v(" "),e("ul",[e("li",[n._v("队列：RabbitMQ 提供了多种队列类型，包括普通队列、主题队列、交换机队列等。")]),n._v(" "),e("li",[n._v("交换机：RabbitMQ 提供了多种交换机类型，包括直连交换机、主题交换机、头交换机等。")]),n._v(" "),e("li",[n._v("消息路由：RabbitMQ 提供了消息路由功能，可以将消息从一个队列路由到另一个队列。")]),n._v(" "),e("li",[n._v("高可用性：RabbitMQ 提供了高可用性的集群架构，可以保证消息的可靠投递。")]),n._v(" "),e("li",[n._v("多协议支持：RabbitMQ 支持多种消息队列协议，包括 AMQP、STOMP、MQTT 等。")]),n._v(" "),e("li",[n._v("管理界面：RabbitMQ 提供了管理界面，可以方便地管理消息队列。")]),n._v(" "),e("li",[n._v("多语言客户端：RabbitMQ 提供了多种语言的客户端，包括 Java、.NET、Python、Ruby、PHP 等。")]),n._v(" "),e("li",[n._v("多平台支持：RabbitMQ 支持多种平台，包括 Linux、Windows、MacOS、BSD 等。")])]),n._v(" "),e("h2",{attrs:{id:"常用代码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用代码"}},[n._v("#")]),n._v(" 常用代码")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('// 连接 RabbitMQ\nConnection connection = new ConnectionFactory().newConnection();\n\n// 创建通道\nChannel channel = connection.createChannel();\n\n// 创建队列\nchannel.queueDeclare("hello", false, false, false, null);\n\n// 发送消息\nchannel.basicPublish("", "hello", null, "Hello World!".getBytes());\n\n// 接收消息\nQueueingConsumer consumer = new QueueingConsumer(channel);\nchannel.basicConsume("hello", true, consumer);\n\nwhile (true) {\n    QueueingConsumer.Delivery delivery = consumer.nextDelivery();\n    String message = new String(delivery.getBody());\n    System.out.println("Received message: " + message);\n}\n\n// 关闭通道和连接\nchannel.close();\nconnection.close();\n')])])])])}),[],!1,null,null,null);e.default=l.exports}}]);
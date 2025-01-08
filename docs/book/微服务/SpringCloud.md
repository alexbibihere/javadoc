---
icon: pen-to-square
date: 2022-01-09
category:
  - Cherry
tag:
  - red
  - small
  - round
---
# 常用技术栈

## 1. 构建与依赖管理
   Maven/Gradle：用于项目的构建和依赖管理。Maven和Gradle是Java项目中广泛使用的构建工具，它们能够自动化编译、打包、发布等过程，并管理项目所需的依赖库。
## 2. 微服务框架
   Spring Boot：用于快速构建独立的、生产级别的Spring基础应用。Spring Boot简化了基于Spring的应用开发，通过自动配置和简化配置的方式，让开发者能够快速启动和运行微服务。
   Spring Cloud：基于Spring Boot实现的微服务架构开发工具集。Spring Cloud提供了一系列用于构建分布式系统的工具，如服务发现、配置管理、负载均衡、断路器、智能路由等。
## 3. 服务注册与发现
   Eureka：Netflix开发的服务治理组件，用于服务的注册与发现。Eureka提供了服务注册中心，服务实例可以注册到Eureka Server上，并通过Eureka Client进行服务发现。
   Consul、Zookeeper：也是常用的服务注册与发现工具，它们提供了类似的功能，但实现方式和特性有所不同。
## 4. 配置管理
   Spring Cloud Config：支持服务端和客户端的配置管理，用于集中管理各服务的配置信息。Spring Cloud Config支持使用GIT、SVN等版本控制系统来存储配置内容，并提供了配置信息的动态刷新功能。
## 5. 负载均衡
   Ribbon：客户端负载均衡的服务调用组件，可以与Eureka等服务注册中心集成，实现服务的智能路由和负载均衡。
   Nginx：作为服务器端负载均衡器，Nginx可以根据配置将请求分发到不同的服务实例上。
## 6. 熔断与降级
   Hystrix：Netflix提供的容错管理组件，实现了断路器模式，能够在服务依赖出现问题时提供强大的容错能力。
   Resilience4j：另一个流行的容错库，提供了类似的熔断和降级功能，并且与Spring Cloud等框架集成良好。
## 7. 网关
   Spring Cloud Gateway：基于Spring Framework 5、Project Reactor和Netty构建的API网关，提供了路由、过滤、监控等功能。
   Zuul：Netflix开发的网关组件，也提供了智能路由、访问过滤等功能，但在Spring Cloud的后续版本中逐渐被Spring Cloud Gateway所取代。
## 8. 分布式追踪
   Spring Cloud Sleuth：Spring Cloud应用的分布式跟踪实现，可以完美整合Zipkin进行请求跟踪和监控。
## 9. 消息队列
   RabbitMQ、Kafka：在微服务架构中，消息队列用于实现服务间的异步通信。RabbitMQ和Kafka是两种流行的消息队列系统，它们提供了高可靠、高性能的消息传递服务。
## 10. 分布式事务
    Seata：由阿里巴巴开源的分布式事务解决方案，提供了高效且对业务零侵入的分布式事务处理能力。
## 11. 安全与认证
    Spring Security：提供全面的安全解决方案，包括认证、授权、加密等。Spring Security可以与OAuth2、JWT等结合使用，为微服务之间的通信提供安全的身份验证和授权机制。
## 12. 容器化与编排
    Docker：用于将微服务打包成容器镜像，实现服务的轻量级部署和隔离。
    Kubernetes：用于容器的编排和管理，可以自动化地部署、扩展和管理容器化应用。
## 13. 监控与日志
    Prometheus、Grafana：用于构建监控仪表盘，提供实时的性能监控和告警功能。
    ELK Stack（Elasticsearch、Logstash、Kibana）：用于日志的收集、存储、分析和可视化。
## 14. 开发与测试
    JUnit、Mockito：用于单元测试和模拟依赖。
    Spring Boot Test：提供了对Spring Boot应用的测试支持。
    Spring Cloud Contract：用于消费者驱动的契约测试，确保服务之间的接口一致性。
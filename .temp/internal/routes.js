/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\project\\vue\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-bb58355e",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("BlogHome", "v-bb58355e").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-c3f48d38",
    path: "/book/Java%E5%9F%BA%E7%A1%80/String.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-c3f48d38").then(next)
    },
  },
  {
    path: "/book/Java基础/String.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/String.html"
  },
  {
    path: "/book/Java基础/String.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/String.html"
  },
  {
    name: "v-55318def",
    path: "/book/JVM/JVM%E7%9A%84%E7%BB%84%E6%88%90.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-55318def").then(next)
    },
  },
  {
    path: "/book/JVM/JVM的组成.html",
    redirect: "/book/JVM/JVM%E7%9A%84%E7%BB%84%E6%88%90.html"
  },
  {
    path: "/book/JVM/JVM的组成.html",
    redirect: "/book/JVM/JVM%E7%9A%84%E7%BB%84%E6%88%90.html"
  },
  {
    name: "v-ac819d50",
    path: "/book/Java%E5%9F%BA%E7%A1%80/StringUtils.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-ac819d50").then(next)
    },
  },
  {
    path: "/book/Java基础/StringUtils.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/StringUtils.html"
  },
  {
    path: "/book/Java基础/StringUtils.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/StringUtils.html"
  },
  {
    name: "v-3bf646d5",
    path: "/book/Java%E5%9F%BA%E7%A1%80/%E6%8B%86%E7%AE%B1%E4%B8%8E%E8%A3%85%E7%AE%B1.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-3bf646d5").then(next)
    },
  },
  {
    path: "/book/Java基础/拆箱与装箱.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/%E6%8B%86%E7%AE%B1%E4%B8%8E%E8%A3%85%E7%AE%B1.html"
  },
  {
    path: "/book/Java基础/拆箱与装箱.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/%E6%8B%86%E7%AE%B1%E4%B8%8E%E8%A3%85%E7%AE%B1.html"
  },
  {
    name: "v-5be238f6",
    path: "/book/Java%E5%9F%BA%E7%A1%80/sourceCode.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-5be238f6").then(next)
    },
  },
  {
    path: "/book/Java基础/sourceCode.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/sourceCode.html"
  },
  {
    path: "/book/Java基础/sourceCode.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/sourceCode.html"
  },
  {
    name: "v-4fcb7da0",
    path: "/book/MQ/RabbitMQ.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4fcb7da0").then(next)
    },
  },
  {
    name: "v-0697fa3c",
    path: "/book/MQ/RocketMQ.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0697fa3c").then(next)
    },
  },
  {
    name: "v-18ba53ea",
    path: "/book/MQ/kafka.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-18ba53ea").then(next)
    },
  },
  {
    name: "v-7ccbf834",
    path: "/book/Java%E5%9F%BA%E7%A1%80/%E5%AD%97%E8%8A%82%E7%A0%81.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7ccbf834").then(next)
    },
  },
  {
    path: "/book/Java基础/字节码.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/%E5%AD%97%E8%8A%82%E7%A0%81.html"
  },
  {
    path: "/book/Java基础/字节码.html",
    redirect: "/book/Java%E5%9F%BA%E7%A1%80/%E5%AD%97%E8%8A%82%E7%A0%81.html"
  },
  {
    name: "v-11ee930a",
    path: "/book/note/SecZone.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-11ee930a").then(next)
    },
  },
  {
    name: "v-1c215bc6",
    path: "/book/note/BugFix.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1c215bc6").then(next)
    },
  },
  {
    name: "v-7f864478",
    path: "/book/note/blog.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7f864478").then(next)
    },
  },
  {
    name: "v-4826460a",
    path: "/book/note/study.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4826460a").then(next)
    },
  },
  {
    name: "v-0665e134",
    path: "/book/note/work.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0665e134").then(next)
    },
  },
  {
    name: "v-77cd6ead",
    path: "/book/linux/linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-77cd6ead").then(next)
    },
  },
  {
    path: "/book/linux/linux常用命令.html",
    redirect: "/book/linux/linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"
  },
  {
    path: "/book/linux/linux常用命令.html",
    redirect: "/book/linux/linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"
  },
  {
    name: "v-e81cdfde",
    path: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/Java8%20Stream.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e81cdfde").then(next)
    },
  },
  {
    path: "/book/小技巧/Java8 Stream.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/Java8%20Stream.html"
  },
  {
    path: "/book/小技巧/Java8 Stream.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/Java8%20Stream.html"
  },
  {
    name: "v-2c24b954",
    path: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/code.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2c24b954").then(next)
    },
  },
  {
    path: "/book/小技巧/code.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/code.html"
  },
  {
    path: "/book/小技巧/code.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/code.html"
  },
  {
    name: "v-1206ac8c",
    path: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/git.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1206ac8c").then(next)
    },
  },
  {
    path: "/book/小技巧/git.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/git.html"
  },
  {
    path: "/book/小技巧/git.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/git.html"
  },
  {
    name: "v-6feb4214",
    path: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/markdown.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6feb4214").then(next)
    },
  },
  {
    path: "/book/小技巧/markdown.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/markdown.html"
  },
  {
    path: "/book/小技巧/markdown.html",
    redirect: "/book/%E5%B0%8F%E6%8A%80%E5%B7%A7/markdown.html"
  },
  {
    name: "v-0be86ac6",
    path: "/book/%E5%B9%B6%E5%8F%91/countdownlatch.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0be86ac6").then(next)
    },
  },
  {
    path: "/book/并发/countdownlatch.html",
    redirect: "/book/%E5%B9%B6%E5%8F%91/countdownlatch.html"
  },
  {
    path: "/book/并发/countdownlatch.html",
    redirect: "/book/%E5%B9%B6%E5%8F%91/countdownlatch.html"
  },
  {
    name: "v-6a988a26",
    path: "/book/%E5%88%86%E5%B8%83%E5%BC%8F/distributeSystem.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6a988a26").then(next)
    },
  },
  {
    path: "/book/分布式/distributeSystem.html",
    redirect: "/book/%E5%88%86%E5%B8%83%E5%BC%8F/distributeSystem.html"
  },
  {
    path: "/book/分布式/distributeSystem.html",
    redirect: "/book/%E5%88%86%E5%B8%83%E5%BC%8F/distributeSystem.html"
  },
  {
    name: "v-8bb20748",
    path: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/Docker.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-8bb20748").then(next)
    },
  },
  {
    path: "/book/微服务/Docker.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/Docker.html"
  },
  {
    path: "/book/微服务/Docker.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/Docker.html"
  },
  {
    name: "v-69e78fce",
    path: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-69e78fce").then(next)
    },
  },
  {
    path: "/book/微服务/SpringCloud.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud.html"
  },
  {
    path: "/book/微服务/SpringCloud.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud.html"
  },
  {
    name: "v-544f66c8",
    path: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-544f66c8").then(next)
    },
  },
  {
    path: "/book/微服务/SpringCloud项目搭建.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.html"
  },
  {
    path: "/book/微服务/SpringCloud项目搭建.html",
    redirect: "/book/%E5%BE%AE%E6%9C%8D%E5%8A%A1/SpringCloud%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.html"
  },
  {
    name: "v-509dcd73",
    path: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mongo.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-509dcd73").then(next)
    },
  },
  {
    path: "/book/数据库/mongo.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mongo.html"
  },
  {
    path: "/book/数据库/mongo.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mongo.html"
  },
  {
    name: "v-4f615dd2",
    path: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4f615dd2").then(next)
    },
  },
  {
    path: "/book/数据库/mysql.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql.html"
  },
  {
    path: "/book/数据库/mysql.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql.html"
  },
  {
    name: "v-691ecc5c",
    path: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/%E7%B4%A2%E5%BC%95.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-691ecc5c").then(next)
    },
  },
  {
    path: "/book/数据库/索引.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/%E7%B4%A2%E5%BC%95.html"
  },
  {
    path: "/book/数据库/索引.html",
    redirect: "/book/%E6%95%B0%E6%8D%AE%E5%BA%93/%E7%B4%A2%E5%BC%95.html"
  },
  {
    name: "v-4ee50ef4",
    path: "/book/%E6%A1%86%E6%9E%B6/Mybatis-plus.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4ee50ef4").then(next)
    },
  },
  {
    path: "/book/框架/Mybatis-plus.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/Mybatis-plus.html"
  },
  {
    path: "/book/框架/Mybatis-plus.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/Mybatis-plus.html"
  },
  {
    name: "v-290153d4",
    path: "/book/%E6%A1%86%E6%9E%B6/Spring.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-290153d4").then(next)
    },
  },
  {
    path: "/book/框架/Spring.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/Spring.html"
  },
  {
    path: "/book/框架/Spring.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/Spring.html"
  },
  {
    name: "v-a6b0a580",
    path: "/book/%E6%A1%86%E6%9E%B6/SpringCloud.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-a6b0a580").then(next)
    },
  },
  {
    path: "/book/框架/SpringCloud.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/SpringCloud.html"
  },
  {
    path: "/book/框架/SpringCloud.html",
    redirect: "/book/%E6%A1%86%E6%9E%B6/SpringCloud.html"
  },
  {
    name: "v-58ebf348",
    path: "/book/%E9%9B%86%E5%90%88/Map.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-58ebf348").then(next)
    },
  },
  {
    path: "/book/集合/Map.html",
    redirect: "/book/%E9%9B%86%E5%90%88/Map.html"
  },
  {
    path: "/book/集合/Map.html",
    redirect: "/book/%E9%9B%86%E5%90%88/Map.html"
  },
  {
    name: "v-2034a394",
    path: "/book/%E9%9B%86%E5%90%88/ObjectMapper.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2034a394").then(next)
    },
  },
  {
    path: "/book/集合/ObjectMapper.html",
    redirect: "/book/%E9%9B%86%E5%90%88/ObjectMapper.html"
  },
  {
    path: "/book/集合/ObjectMapper.html",
    redirect: "/book/%E9%9B%86%E5%90%88/ObjectMapper.html"
  },
  {
    name: "v-51bc378c",
    path: "/book/%E9%9B%86%E5%90%88/List.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-51bc378c").then(next)
    },
  },
  {
    path: "/book/集合/List.html",
    redirect: "/book/%E9%9B%86%E5%90%88/List.html"
  },
  {
    path: "/book/集合/List.html",
    redirect: "/book/%E9%9B%86%E5%90%88/List.html"
  },
  {
    name: "v-b1564aac",
    path: "/tag/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Tags", "v-b1564aac").then(next)
    },
    meta: {"pid":"tags","id":"tags"}
  },
  {
    path: "/tag/index.html",
    redirect: "/tag/"
  },
  {
    name: "v-ef9325c4",
    path: "/categories/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("FrontmatterKey", "v-ef9325c4").then(next)
    },
    meta: {"pid":"categories","id":"categories"}
  },
  {
    path: "/categories/index.html",
    redirect: "/categories/"
  },
  {
    name: "v-6319eb4e",
    path: "/timeline/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("TimeLines", "v-6319eb4e").then(next)
    },
    meta: {"pid":"timeline","id":"timeline"}
  },
  {
    path: "/timeline/index.html",
    redirect: "/timeline/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]
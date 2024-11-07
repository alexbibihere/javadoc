module.exports = {
  title: 'Yan-sir',  // 网站标题
  description: '个人网站',
  theme: 'reco',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加网页标签图标)
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  base: '/javadoc/',
  themeConfig: {
    nav: [ // 导航栏配置
      {
        text: 'JAVADOC',
        link: '/java/',
        items: [
          { text: 'Java基础', link: '/' },
          { text: '集合', link: '/' },
          { text: '并发', link: '/' },
          { text: '框架', link: '/' },
          { text: '数据库', link: '/' },
          { text: '小技巧', link: '/' },
          { text: 'linux', link: '/' },
          { text: 'JVM', link: '/' },
          { text: '分布式', link: '/' },
          { text: '微服务', link: '/' },
          { text: 'MQ', link: '/' },
          { text: 'note', link: '/' }
        ]
      },
      { text: '书籍', link: '/books/' }
    ],
    sidebar: [
      {
        title: "Java基础",
        // path: '/book/Java基础',
        collapsable: false, // 不折叠
        children: [
          { title: "拆箱与装箱", path: "/book/Java基础/拆箱与装箱" },
          { title: "字节码", path: "/book/Java基础/字节码" },
          { title: "String", path: "/book/Java基础/String" },
          { title: "StringUtils", path: "/book/Java基础/StringUtils" }
        ],
      },
      {
        title: "集合",
        // path: '/book/集合',
        collapsable: false, // 不折叠
        children: [
          { title: "List", path: "/book/集合/List" },
          { title: "Map", path: "/book/集合/Map" },
          { title: "ObjectMapper", path: "/book/集合/ObjectMapper"}
        ],
      },
      {
        title: "框架",
        // path: '/book/框架',
        collapsable: false, // 不折叠
        children: [
          { title: "Mybatis-plus", path: "/book/框架/Mybatis-plus" },
          { title: "Spring", path: "/book/框架/Spring" },
          { title: "SpringCloud", path: "/book/框架/SpringCloud" }
        ],
      },
      {
        title: "并发",
         path: '/book/并发/',
        collapsable: false, // 不折叠
        children: [
          { title: "countdownlatch" ,path:"/countdownlatch"}
          //   { title: "Map", path: "/book/并发/Map" }
        ],
      },
      {
        title: "JVM",
        // path: '/book/JVM',
        collapsable: false, // 不折叠
        children: [
          { title: "JVM的组成", path: "/book/JVM/JVM的组成" }
          //   { title: "Map", path: "/book/JVM/Map" }
        ],
      },
      {
        title: "数据库",
        // path: '/book/数据库',
        collapsable: false, // 不折叠
        children: [
          { title: "索引", path: "/book/数据库/索引" },
          { title: "mysql", path: "/book/数据库/mysql" }
        ],
      },
      {
        title: "分布式",
        // path: '/book/分布式',
        collapsable: false, // 不折叠
        children: [
          { title: "distributeSystem", path: "/book/分布式/distributeSystem" }
        ],
      },
      {
        title: "微服务",
        // path: '/book/微服务',
        collapsable: false, // 不折叠
        children: [
          { title: "Docker", path: "/book/微服务/Docker" },          
          { title: "SpringCloud", path: "/book/微服务/SpringCloud" },
          { title: "SpringCloud项目搭建", path: "/book/微服务/SpringCloud项目搭建" }
        ],
      },
      {
        title: "小技巧",
        // path: '/book/linux',
        collapsable: false, // 不折叠
        children: [
          { title: "git", path: "/book/小技巧/git" },
          { title: "Java 8 Stream", path: "/book/小技巧/Java 8 Stream" },
          { title: "markdown", path: "/book/小技巧/markdown" }
        ],
      },
      {
        title: "linux",
        // path: '/book/linux',
        collapsable: false, // 不折叠
        children: [
          { title: "linux常用命令", path: "/book/linux/linux常用命令" }
        ],
      },
      {
        title: "note",
        // path: '/book/MQ',
        collapsable: false, // 不折叠
        children: [
          { title: "study", path: "/book/note/study" },
          { title: "SecZone", path: "/book/note/SecZone" },
          { title: "blog", path: "/book/note/blog" }
        ],
      },
      {
        title: "MQ",
        // path: '/book/MQ',
        collapsable: false, // 不折叠
        children: [
          { title: "kafka", path: "/book/MQ/kafka" },
          {title:"RabbitMQ",path:"/book/MQ/RabbitMQ"},
          {title:"RocketMQ",path:"/book/MQ/RocketMQ"}
        ],
      }
    ]
  }
};
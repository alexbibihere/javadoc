---
icon: pen-to-square
date: 2024-8-23
title: 博客
---

# 博客

博客采用 vuespress 搭建，使用 markdown 语法编写。

主要用途是 构建java知识trees，记录学习笔记，分享经验。


# todo

完善博客内容  
 
# git
修改远端 git仓库协议 http为 git

# git 问题
## refusing to merge unrelated histories
- git pull origin master --allow-unrelated-histories

# blog note
- 页面左侧标题去 config.js 里面修改
- 本地启动: npm run dev
- 本地生成 npm run docs:build

- 同步远端: sh deploy.sh
- git push --set-upstream git@github.com:alexbibihere/javadoc.git master

- 修改侧边栏样式 添加到config.js中
   plugins: [
  // ...
  ['vuepress-plugin-side-anchor']
 ],
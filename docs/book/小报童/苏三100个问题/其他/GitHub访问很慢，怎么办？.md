# GitHub访问很慢，怎么办？

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">1 修改本地host文件</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以修改本地host文件，增加配置内容，绕过域名解析，达到加速的目的。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以访问网址：</font>

[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">github.global.ssl.fastly.net.ipaddress.com/#ipinfo</font>](http://github.global.ssl.fastly.net.ipaddress.com/#ipinfo)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">得到CDN和IP地址，对应</font>[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">github.com</font>](http://github.com/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">访问网站：</font>[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">github.com.ipaddress.com/#ipinfo</font>](http://github.com.ipaddress.com/#ipinfo)

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">得到CDN和IP地址，对应</font>[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">github.global.ssl.fastly.net</font>](http://github.global.ssl.fastly.net/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">然后在host文件中添加如下配置：</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">140.82.114.4 github.com</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">199.232.69.194 github.global.ssl.fastly.net</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">2 Github镜像</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">我们可以通过GitHub镜像访问。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">这里提供几个最常用的镜像地址：</font>

1. [<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">https://gitclone.com/</font>](https://gitclone.com/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">（此镜像是直接搜索相关仓库，然后克隆）</font>
2. [<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">https://ghproxy.com/</font>](https://ghproxy.com/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">（GitHub 文件 , Releases , archive , gist ,</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">raw.githubusercontent.com</font>](http://raw.githubusercontent.com/)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">文件代理加速下载服务）</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">也就是说上面的镜像就是一个克隆版的 GitHub，你可以访问上面的镜像网站，网站的内容跟 GitHub 是完整同步的镜像，然后在这个网站里面进行下载克隆等操作。</font>

## **<font style="color:rgb(34, 34, 34);background-color:rgb(248, 246, 244);">3 安装浏览器Github插件</font>**
<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">GitHub加速插件顾名思义它就是一款加速GitHub下载速度的插件，它可以提高Github访问速度：github release、archive以及项目文件下载的加速。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">安装方式：</font>

1. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">下载GitHub加速_1.3.6_chrome扩展插件下载_极简插件。下载链接:</font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font>[<font style="color:rgb(177, 75, 67);background-color:rgb(248, 246, 244);">https://pan.baidu.com/s/1J6m7rywxGWIT8B-cs-SnKg</font>](https://pan.baidu.com/s/1J6m7rywxGWIT8B-cs-SnKg)<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);"> </font><font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">提取码: 35ka</font>
2. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">在浏览器地址栏中输入 chrome://extensions/。</font>
3. <font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">将下载的插件直接拖到该页面松开，后面就按着页面指示走就可以了。</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(248, 246, 244);">当然如果你有VPN，也能快速访问GitHub。</font>



> 更新: 2025-05-15 19:49:17  
> 原文: <https://www.yuque.com/yuqueyonghue6cvnv/cxhfwd/uqmkvzgh303vx7nz>
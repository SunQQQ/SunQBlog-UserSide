<!--
 * @Author: ke.xue
 * @Date: 2022-12-24 14:29:42
 * @LastEditors: ke.xue
 * @LastEditTime: 2022-12-24 15:27:23
 * @FilePath: \SunQBlog-UserSide\README.md
 * @Description: 文件描述
-->
## SunQuan's Blog
>此项目为孙权的个人网站，演示地址 https://codinglife.online

本博客基于Vue2.0开发，使用媒体查询适配PC端和移动端。具备博客、留言板、用户轨迹分析、开放式后台等功能，整体设计风格清新简约，动画效果俏皮可爱，功能较为完善。

博客整体分为用户端/管理后台/接口三部分组成，此套代码为用户端部分。用户端未使用UI框架，自己封装了天气预报、表情包、定位、页面懒加载、日志埋点、弹框、Tip、导航栏、footer/header、回到顶部、心声等组件。

代码涉及一些Vue的基本用法，包括组件、路由、vuex、首屏优化等，代码难度较低，整体风格清新，欢迎大家访问。
## 版本说明
用户端代码分为v1.0和v2.0两个版本，分别对应管理后台和服务端的v1.0和v2.0两个版本。

各端代码都分为v1.0和v2.0两个分支，v1版本已定版，v2版本还在持续迭代优化中。

本地部署时请注意三端的分支需一致
``` bash
1、用户端v1.0版本无账号体系，博文只有博主可新增，访客无法管理自己的留言、评论等内容。
2、用户端v2.0版本添加账号体系，所有访客皆可新增管理自己的博文/留言/心声等。
```
## Build Setup
``` bash
Node.js需使用v14.21.3

# Project setup
yarn install

# Compiles and hot-reloads for development
yarn run serve

# Compiles and minifies for production
yarn run build

# Lints and fixes files
yarn run lint
```


## About Star
个人开源项目维护不易，最后请您给俺点个小星星![star.png](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif)，您的鼓励是俺不断更新的动力![fighting.png](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/100.gif)，
手动笔芯![Rose.png](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif)![Kiss.png](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif)![Heart.png](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif)

## About Me
如果有吐槽或者建议、或者技术上的交流，可在博客留言板联系我。

我的邮箱地址：1585437938@qq.com，也欢迎交流。

我还用原生JS写了一个贪吃蛇小游戏，欢迎来玩：https://codinglife.online/snake
## 博客预览
![index](https://github.com/SunQQQ/SunQBlog-UserSide/blob/master/static/readme_img/index.png)

![leaveMessage](https://github.com/SunQQQ/SunQBlog-UserSide/blob/master/static/readme_img/leaveMessage.png)

![timeLine](https://github.com/SunQQQ/SunQBlog-UserSide/blob/master/static/readme_img/timeLine.png)

![friendUrl](https://github.com/SunQQQ/SunQBlog-UserSide/blob/master/static/readme_img/friendUrl.png)

![aboutMe](https://github.com/SunQQQ/SunQBlog-UserSide/blob/master/static/readme_img/aboutMe.png)

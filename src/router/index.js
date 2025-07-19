import Vue from 'vue';
import Router from 'vue-router';

// 使用如下函数的形式引入，打包时会分包
const BlogIndex = () =>
  import(/* webpackChunkName: "simplePage" */ '@/components/MainPage/BlogIndex');
const BlogDetail = () =>
  import(/* webpackChunkName: "blogDetail", webpackPrefetch: false */ '@/components/MainPage/BlogDetail');
const MessageBoard = () =>
  import(/* webpackChunkName: "simplePage" */ '@/components/MainPage/MessageBoard');
const analytics = () =>
  import(/* webpackChunkName: "analytics", webpackPrefetch: false */ '@/components/MainPage/analytics');
const FriendUrl = () =>
  import(/* webpackChunkName:"simplePage" */ '@/components/MainPage/FriendUrl');
const TimeLine = () =>
  import(/* webpackChunkName:"simplePage" */ '@/components/MainPage/TimeLine');
const AboutMe = () =>
  import(/* webpackChunkName:"simplePage" */ '@/components/MainPage/AboutMe');

const DEFAULT_TITLE = '码语人生 | 开发者故事与技术社区 - CodingLife Online';
const DEFAULT_DESCRIPTION = "码语人生（CodingLife Online）是面向开发者的技术人文社区，记录代码背后的思考、分享技术人的成长故事，在代码中见人生。";
    
// import imageToPdf from '@/components/ExperimentalField/imageToPdf';
// import ExperimentalField from '@/components/ExperimentalField/index';
// import student from '@/components/ExperimentalField/student';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'index',
      component: BlogIndex,
      meta: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION
      }
    },{
      path: '/blog-detail/:id',
      name: 'blog-detail',
      component: BlogDetail,
      meta: {
        title: '博客详情 | 技术文章深度解析 | 码语人生',
        description: '阅读技术博客的完整内容与作者思考，了解代码背后的设计理念与实践经验。欢迎在评论区与开发者交流讨论！'
      }
    },{
      path: '/message-board',
      name: 'message-board',
      component: MessageBoard,
      meta: {
        title: '开发者交流区 | 技术问题讨论 | 码语人生',
        description: '与社区开发者实时交流技术难题、分享开源项目经验。你的每条留言都会得到认真回复，共同构建更好的技术社区。'
      }
    },{
      path: '/time-line',
      name: 'time-line',
      component: TimeLine,
      meta: {
        title: '技术历程 | 项目演进时间轴 | 码语人生',
        description: '回顾码语人生的技术演进历程，包括Vue前端优化、Node.js后端迭代、全栈开发实践等关键节点与经验总结。'
      }
    },{
      path: '/about-me',
      name: 'about-me',
      component: AboutMe,
      meta: {
        title: '关于我们 | 社区背后的故事 | 码语人生',
        description: '了解码语人生社区的创立初衷、开发者的技术背景，以及我们如何通过代码连接技术与人文。'
      }
    },{
      path: '/analytics',
      name: 'analytics',
      component: analytics,
      meta: {
        title: '数据看板 | 博客访问统计 | 码语人生',
        description: '查看码语人生社区的访问数据、用户行为分析及内容热度排行，用数据驱动技术内容优化。'
      }
    },{
      path: '/friend-url',
      name: 'friend-url',
      component: FriendUrl,
      meta: {
        title: '技术资源导航 | 开发工具推荐 | 码语人生',
        description: '精选前端框架、后端架构、DevOps工具等程序员必备资源导航，持续更新业界优质技术站点与开源项目。'
      }
    }
    
    // {
    //   path: '/experimentalField',
    //   name: 'ExperimentalField',
    //   component: ExperimentalField,
    //   children: [
    //     {
    //       path: '/experimentalField/imageToPdf',
    //       name: 'imageToPdf',
    //       component: imageToPdf
    //     }
    //   ]
    // }, {
    //   path: '/student',
    //   name: 'student',
    //   component: student
    // }
  ]
});

router.afterEach((to) => {
  // 1. 动态修改 title
  document.title = to.meta.title || DEFAULT_TITLE

  // 2. 动态修改 description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.content = to.meta.description || DEFAULT_DESCRIPTION
  } else {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = to.meta.description || DEFAULT_DESCRIPTION
    document.head.appendChild(meta)
  }
})

export default router;
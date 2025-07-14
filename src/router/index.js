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

const DEFAULT_TITLE = 'Coding Life | 开发者共创的博客平台 | 分享你的代码与生活';
const DEFAULT_DESCRIPTION = 'Coding Life 是一个源码开源的博客社区，用Markdown书写我们的技术与生活。开发者可自由注册发布技术文章或生活随笔，在这里你将遇到更多志趣相同的小伙伴。';

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
        title: '博客详情 | 文章详情 | Coding Life',
        description: '博客详情 - 深入了解每篇文章的内容和作者。'
      }
    }, {
      path: '/message-board',
      name: 'message-board',
      component: MessageBoard,
      meta: {
        title: '项目交流 | 使用反馈 | 优化建议 | Coding Life',
        description: '与开发者实时交流技术问题，获取开源项目建议。你的每条留言都会得到认真回复！'
      }
    }, {
      path: '/time-line',
      name: 'time-line',
      component: TimeLine,
      meta: {
        title: '开源项目的历程 | 技术博客发展时间轴 | Coding Life',
        description: '技术博客发展时间轴 | 记录Vue项目优化、Node.js后端开发等全栈技术演进历程'
      }
    }, {
      path: '/about-me',
      name: 'about-me',
      component: AboutMe,
      meta: {
        title: '网站背后的故事 | 开发者的自述 | 开源项目的初衷 | Coding Life',
        description: '关于我 - 了解本网站和开发者的背景和故事。'
      }
    }, {
      path: '/analytics',
      name: 'analytics',
      component: analytics,
      meta: {
        title: '技术博客数据分析 | 流量来源统计 | 用户行为追踪 | Coding Life',
        description: '分析 - 查看博客的访问数据和用户互动情况。'
      }
    }, {
      path: '/friend-url',
      name: 'friend-url',
      component: FriendUrl,
      meta: {
        title: '技术资源导航 | 优质开发工具推荐 | Coding Life',
        description: '精选前端开发、后端架构、DevOps工具链等程序员必备资源导航，持续更新业界优质技术站点'
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
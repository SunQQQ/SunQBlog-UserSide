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
        title: '首页 - Coding Life',
        description: '首页 - 欢迎来到我们的博客平台，探索技术与生活的精彩内容。'
      }
    },{
      path: '/blog-detail/:id',
      name: 'blog-detail',
      component: BlogDetail,
      meta: {
        title: '博客详情 - 深入了解每篇文章',
        description: '博客详情 - 深入了解每篇文章的内容和作者。'
      }
    }, {
      path: '/message-board',
      name: 'message-board',
      component: MessageBoard,
      meta: {
        title: '留言板 - 与网站访问者交流和分享想法',
        description: '留言板 - 与网站访问者交流和分享想法。'
      }
    }, {
      path: '/time-line',
      name: 'time-line',
      component: TimeLine,
      meta: {
        title: '时间线 - 查看博客的历史记录和重要事件',
        description: '时间线 - 查看博客的历史记录和重要事件。'
      }
    }, {
      path: '/about-me',
      name: 'about-me',
      component: AboutMe,
      meta: {
        description: '关于我 - 了解本网站和开发者。'
      }
    }, {
      path: '/analytics',
      name: 'analytics',
      component: analytics,
      meta: {
        description: '分析 - 查看博客的访问数据和用户互动情况。'
      }
    }, {
      path: '/friend-url',
      name: 'friend-url',
      component: FriendUrl,
      meta: {
        description: '友情链接 - 访问其他开发者的博客和网站。'
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
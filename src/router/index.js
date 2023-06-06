import Vue from 'vue';
import Router from 'vue-router';
// 使用如下方式引入组件不会分包
// import BlogIndex from '@/components/MainPage/BlogIndex';
// import BlogDetail from '@/components/MainPage/BlogDetail';
// import MessageBoard from '@/components/MainPage/MessageBoard';
// import analytics from '@/components/MainPage/analytics';
// import FriendUrl from '@/components/MainPage/FriendUrl';
// import TimeLine from '@/components/MainPage/TimeLine';
// import AboutMe from '@/components/MainPage/AboutMe';

// 使用如下函数的形式引入，打包时会分包
const BlogIndex = () =>
  import(/* webpackChunkName: "blogPages" */ '@/components/MainPage/BlogIndex');

const BlogIndexCopy = () =>
  import(/* webpackChunkName: "blogPages" */ '@/components/MainPage/BlogIndex-copy');


const BlogDetail = () =>
  import(/* webpackChunkName: "blogPages" */ '@/components/MainPage/BlogDetail');
const MessageBoard = () =>
  import(/* webpackChunkName: "messageBoard" */ '@/components/MainPage/MessageBoard');
const analytics = () =>
  import(/* webpackChunkName: "analytics" */ '@/components/MainPage/analytics');
const FriendUrl = () =>
  import(/* webpackChunkName:"simpleMenu" */ '@/components/MainPage/FriendUrl');
const TimeLine = () =>
  import(/* webpackChunkName:"simpleMenu" */ '@/components/MainPage/TimeLine');
const AboutMe = () =>
  import(/* webpackChunkName:"simpleMenu" */ '@/components/MainPage/AboutMe');

import imageToPdf from '@/components/ExperimentalField/imageToPdf';
import ExperimentalField from '@/components/ExperimentalField/index';
import student from '@/components/ExperimentalField/student';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'BlogIndex',
      component: BlogIndex
    },{
      path:"/BlogIndexCopy",
      name:'BlogIndexCopy',
      component:BlogIndexCopy
    },{
      path: '/BlogDetail',
      name: 'BlogDetail',
      component: BlogDetail
    }, {
      path: '/MessageBoard',
      name: 'MessageBoard',
      component: MessageBoard
    }, {
      path: '/FriendUrl',
      name: 'FriendUrl',
      component: FriendUrl
    }, {
      path: '/TimeLine',
      name: 'TimeLine',
      component: TimeLine
    }, {
      path: '/AboutMe',
      name: 'AboutMe',
      component: AboutMe
    }, {
      path: '/analytics',
      name: 'analytics',
      component: analytics
    }, {
      path: '/experimentalField',
      name: 'ExperimentalField',
      component: ExperimentalField,
      children: [
        {
          path: '/experimentalField/imageToPdf',
          name: 'imageToPdf',
          component: imageToPdf
        }
      ]
    }, {
      path: '/student',
      name: 'student',
      component: student
    }
  ]
});

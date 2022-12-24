/*
 * @Author: ke.xue
 * @Date: 2022-12-24 14:29:42
 * @LastEditors: ke.xue
 * @LastEditTime: 2022-12-24 14:57:26
 * @FilePath: \SunQBlog-UserSide\src\router\index.js
 * @Description: 文件描述
 */
import Vue from 'vue';
import Router from 'vue-router';
import BlogDetail from '@/components/MainPage/BlogDetail';
import BlogIndex from '@/components/MainPage/BlogIndex';
import MessageBoard from '@/components/MainPage/MessageBoard';
import FriendUrl from '@/components/MainPage/FriendUrl';
import TimeLine from '@/components/MainPage/TimeLine';
import AboutMe from '@/components/MainPage/AboutMe';
import analytics from '@/components/MainPage/analytics';
import imageToPdf from '@/components/ExperimentalField/imageToPdf';
import ExperimentalField from '@/components/ExperimentalField/index';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  scrollBehavior:() => ({ y:0 }),
  routes: [
    {
      path: '/',
      name: 'BlogIndex',
      component: BlogIndex
    }, {
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
      path:'/TimeLine',
      name:'TimeLine',
      component:TimeLine
    }, {
      path:'/AboutMe',
      name:'AboutMe',
      component:AboutMe
    },{
      path:'/analytics',
      name:'analytics',
      component:analytics
    },{
      path:'/experimentalField',
      name: 'ExperimentalField',
      component:ExperimentalField,
      children: [
        {
          path:'/experimentalField/imageToPdf',
          name:'imageToPdf',
          component:imageToPdf
        }
      ]
    }
  ]
});

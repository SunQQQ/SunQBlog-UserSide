import Vue from 'vue';
import Router from 'vue-router';
import BlogDetail from '@/components/MainPage/BlogDetail';
import BlogIndex from '@/components/MainPage/BlogIndex';
import MessageBoard from '@/components/MainPage/MessageBoard';
import FriendUrl from '@/components/MainPage/FriendUrl';
import TimeLine from '@/components/MainPage/TimeLine';
import AboutMe from '@/components/MainPage/AboutMe';

Vue.use(Router)

export default new Router({
  scrollBehavior:() => ({ y:0 }),
  routes: [
    {
      path: '/',
      name: 'BlogIndex',
      component: BlogIndex
    },
    {
      path: '/BlogDetail',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/MessageBoard',
      name: 'MessageBoard',
      component: MessageBoard
    },
    {
      path: '/FriendUrl',
      name: 'FriendUrl',
      component: FriendUrl
    },
    {
      path:'/TimeLine',
      name:'TimeLine',
      component:TimeLine
    },
    {
      path:'/AboutMe',
      name:'AboutMe',
      component:AboutMe
    }
  ]
})
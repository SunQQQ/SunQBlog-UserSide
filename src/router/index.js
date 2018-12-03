import Vue from 'vue'
import Router from 'vue-router'
import TopBar from '@/components/TopBar'
import BlogDetail from '@/components/BlogDetail'
import BlogIndex from '@/components/BlogIndex'
import MessageBoard from '@/components/MessageBoard'
import FriendUrl from '@/components/FriendUrl'
import TimeLine from '@/components/TimeLine'
import AboutMe from '@/components/AboutMe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/TopBar',
      name: 'TopBar',
      component: TopBar
    },
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
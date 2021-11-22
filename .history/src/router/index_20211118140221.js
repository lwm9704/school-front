
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '../view/home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('/view/user')
        },
        {
          path: '/code',
          name: 'code',
          component: () => import('@/view/code')
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('@/view/course')
        },
        {
          path: '/grade',
          name: 'grade',
          component: () => import('@/view/grade')
        },
        {
          path: '/lecture',
          name: 'lecture',
          component: () => import('@/view/lecture')
        },
        {
          path: '/member',
          name: 'member',
          component: () => import('@/view/member')
        },
        {
          path: '/score',
          name: 'score',
          component: () => import('@/view/score')
        },
        {
          path: '/teaching',
          name: 'teaching',
          component: () => import('@/view/teaching')
        }
      ]
    },

  ]
})

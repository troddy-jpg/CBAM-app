import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/essays',
    name: 'essays',
    component: () => import(/* webpackChunkName: "about" */ '../views/EssaysView.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommentsView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import singleEssayView from '../components/SingleEssayView'
import CommentPageView from '../components/CommentPageView'

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
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  },
  {
    path: '/essay/:id',
    name: 'essay',
    props: true,
    component: singleEssayView
  },
  //this.$router.push('/essay/' + this.essay.id + '/comments/' + lineNumber)
  {
    path: '/essay/:id/:line',
    name: 'commentPage',
    props: true,
    component: CommentPageView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

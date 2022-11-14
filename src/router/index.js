import { createRouter, createWebHashHistory } from 'vue-router'
import todoVue from '../views/todo'

const routes = [
  {
    path: '/',
    name: 'todo-home',
    component: todoVue
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

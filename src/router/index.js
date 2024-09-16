import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'vuehome',
    component: HomeView
  },
  {
    path: '',
    name: 'toolbar',
    component: () => import('../views/Toolsbar.vue'),
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/Orders.vue')
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

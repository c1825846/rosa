import Vue from 'vue'
import VueRouter from 'vue-router'
import Catalog from "@/views/Catalog";
import Discounts from "@/views/Discounts";
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: () => import('@/views/Discounts')
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
  ,
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

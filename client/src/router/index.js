import Vue from 'vue'
import VueRouter from 'vue-router'
import Catalog from "@/views/Catalog";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
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

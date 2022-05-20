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
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/views/Orders')
    },
    {
        path: '/clients',
        name: 'Clients',
        component: () => import('@/views/Clients')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

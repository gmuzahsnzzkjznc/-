import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles.css'
const router = createRouter({ history: createWebHashHistory(), routes: [
  { path: '/', redirect: '/home' }, { path: '/home', component: () => import('./views/Home.vue') },
  { path: '/category/:id?', component: () => import('./views/Category.vue') }, { path: '/product/:id', component: () => import('./views/Product.vue') },
  { path: '/cart', component: () => import('./views/Cart.vue') }, { path: '/checkout', component: () => import('./views/Checkout.vue') },
  { path: '/orders', component: () => import('./views/Orders.vue') }, { path: '/account', component: () => import('./views/Account.vue') },
  { path: '/membership', component: () => import('./views/Membership.vue') },
  { path: '/login', component: () => import('./views/Login.vue') },
] })
createApp(App).use(router).mount('#app')


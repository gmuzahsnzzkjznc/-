import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles.css'

const decodeToken = token => {
  try {
    const raw = token.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(raw.padEnd(Math.ceil(raw.length / 4) * 4, '=')))
  } catch {
    return null
  }
}

const hasValidUserSession = () => {
  const token = sessionStorage.getItem('fresh_token')
  const role = sessionStorage.getItem('fresh_role')
  const payload = token && decodeToken(token)
  return Boolean(payload && payload.role === 'user' && role === 'user' && payload.exp > Date.now())
}

const router = createRouter({ history: createWebHashHistory(), routes: [
  { path: '/', redirect: '/login' }, { path: '/home', component: () => import('./views/Home.vue') },
  { path: '/category/:id?', component: () => import('./views/Category.vue') }, { path: '/product/:id', component: () => import('./views/Product.vue') },
  { path: '/cart', component: () => import('./views/Cart.vue') }, { path: '/checkout', component: () => import('./views/Checkout.vue') },
  { path: '/orders', component: () => import('./views/Orders.vue') }, { path: '/account', component: () => import('./views/Account.vue') },
  { path: '/membership', component: () => import('./views/Membership.vue') },
  { path: '/addresses', component: () => import('./views/Addresses.vue') },
  { path: '/settings', component: () => import('./views/AccountSettings.vue') },
  { path: '/login', component: () => import('./views/Login.vue') },
] })

router.beforeEach(to => {
  if (to.path === '/login') {
    if (hasValidUserSession()) return to.query.redirect || '/home'
    return true
  }
  if (!hasValidUserSession()) return { path: '/login', query: { redirect: to.fullPath } }
  return true
})

createApp(App).use(router).mount('#app')
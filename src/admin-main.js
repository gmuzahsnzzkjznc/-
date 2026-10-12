import { createApp } from 'vue'
import AdminApp from './admin/AdminApp.vue'
import './admin/admin.css'
const decode = token => { try { const raw=token.replace(/-/g,'+').replace(/_/g,'/'); return JSON.parse(atob(raw.padEnd(Math.ceil(raw.length/4)*4,'='))) } catch { return null } }
const params=new URLSearchParams(window.location.search), queryToken=params.get('token'), sessionToken=sessionStorage.getItem('fresh_token'), token=queryToken||sessionToken, payload=token&&decode(token)
const valid=payload&&payload.role==='admin'&&payload.exp>Date.now()&&(params.get('role')||'admin')==='admin'
if (!valid) { window.location.href='/index.html#/login' } else { sessionStorage.setItem('fresh_token',token);sessionStorage.setItem('fresh_role','admin');createApp(AdminApp).mount('#admin-app') }

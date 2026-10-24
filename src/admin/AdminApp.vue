<template>
  <div class="admin-shell"><aside class="admin-sidebar"><div class="admin-brand"><span class="admin-logo">鲜</span><div><b>鲜选</b><small>OPERATIONS CENTER</small></div></div><div class="workspace-label">管理工作台</div><button v-for="item in navItems" :key="item.key" class="admin-nav" :class="{active:active===item.key}" @click="active=item.key"><span>{{item.icon}}</span>{{item.label}}<em v-if="item.badge">{{item.badge}}</em></button><div class="admin-side-foot">系统运行正常<br/><span>最后同步：10:24:36</span></div></aside><main class="admin-main"><header class="admin-header"><div><span class="admin-eyebrow">FRESH SELECT · ADMIN</span><h1>{{current.label}}</h1><p>{{current.desc}}</p></div><div class="admin-profile"><span class="admin-avatar">管</span><div><b>运营管理员</b><small>超级管理员 · 全部权限</small></div><button @click="logout">退出</button></div></header><Dashboard v-if="active==='dashboard'"/><UsersView v-else-if="active==='users'" @notify="notify"/><ContentView v-else-if="active==='content'" @notify="notify"/><MembersView v-else-if="active==='members'" @notify="notify"/><OrdersView v-else-if="active==='orders'" @notify="notify"/><DataView v-else :type="active" @notify="notify"/><div v-if="toast" class="admin-toast">✓ {{toast}}</div></main></div>
</template>
<script setup>
import { computed, ref } from 'vue'
import Dashboard from './views/Dashboard.vue'
import DataView from './views/DataView.vue'
import ContentView from './views/ContentView.vue'
import MembersView from './views/MembersView.vue'
import OrdersView from './views/OrdersView.vue'
import UsersView from './views/UsersView.vue'
const navItems=[{key:'dashboard',label:'经营总览',desc:'实时掌握平台经营状态与核心指标',icon:'◈'},{key:'users',label:'用户管理',desc:'查询用户资料，管理用户状态',icon:'♙',badge:'12'},{key:'orders',label:'订单管理',desc:'处理订单状态、退款及履约流程',icon:'☷',badge:'8'},{key:'content',label:'首页内容',desc:'管理轮播图、公告和推荐商品',icon:'▰'},{key:'members',label:'会员管理',desc:'管理会员等级、折扣和专属优惠券',icon:'♧'}]
const active=ref('dashboard'),toast=ref(''),current=computed(()=>navItems.find(x=>x.key===active.value)),notify=m=>{toast.value=m;setTimeout(()=>toast.value='',2200)},logout=()=>{sessionStorage.removeItem('fresh_token');sessionStorage.removeItem('fresh_role');window.location.href='/index.html#/login'}
</script>


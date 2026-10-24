<template>
  <router-view v-if="route.path === '/login'" />
  <div v-else class="app-shell">
    <div class="top-strip"><div class="container strip-inner"><span>鲜选到家 · 满 ¥59 免配送费</span><span>营业时间 07:00 - 22:00　|　配送范围：全城</span></div></div>
    <header class="header"><div class="container header-inner"><router-link to="/home" class="brand"><span class="brand-mark">鲜</span><span><b>鲜选</b><small>FRESH SELECT</small></span></router-link><div class="search"><span>⌕</span><input v-model="keyword" @keyup.enter="search" placeholder="搜索水果、蔬菜、海鲜..."/><button @click="search">搜索</button></div><div class="header-actions"><router-link to="/cart" class="cart-link">🛒<em>{{ cartCount }}</em></router-link><div class="header-user"><UserAvatar class="header-user-avatar" :user="store.user"/><span class="header-user-name">{{ store.user.nickname }}</span></div></div></div></header>
    <nav class="nav"><div class="container nav-inner"><router-link to="/category" class="all-cats">☰　全部商品分类</router-link><router-link to="/home">首页</router-link><router-link to="/category">分类</router-link><router-link to="/membership">会员权益</router-link><router-link to="/account">我的</router-link><span class="nav-note">每日新鲜　·　安心到家</span></div></nav>
    <main><router-view /></main>
    <footer class="footer"><div class="container footer-grid"><div><div class="brand footer-brand"><span class="brand-mark">鲜</span><span><b>鲜选</b><small>FRESH SELECT</small></span></div><p>精选每一份新鲜，<br/>把好生活送到家。</p></div><div><b>购物指南</b><a>会员权益</a><a>配送说明</a><a>售后服务</a></div><div><b>关于鲜选</b><a>品牌故事</a><a>联系我们</a><a>加入我们</a></div><div class="footer-service"><b>客服热线</b><strong>400-820-8820</strong><span>每日 08:00 - 22:00</span></div></div><div class="copyright">© 2026 鲜选生鲜商城　|　让新鲜成为日常</div></footer>
    <div v-if="toast" class="toast">✓ {{ toast }}</div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { cartCount, store } from './data'
import UserAvatar from './components/UserAvatar.vue'
const router=useRouter(), route=useRoute(), keyword=ref(''), toast=ref('')
const search=()=>{ if(keyword.value.trim()) router.push({path:'/category',query:{q:keyword.value.trim()}}) }
const notify=(message)=>{toast.value=message;setTimeout(()=>toast.value='',2200)}
provide('notify',notify)
</script>

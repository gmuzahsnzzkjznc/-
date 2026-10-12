<template>
  <section class="container page account-page">
    <div class="account-head"><div class="avatar">林</div><div><span class="eyebrow">MEMBER CENTER</span><h1>林女士，欢迎回来</h1><p>鲜选会员 · 已陪伴你 186 天</p></div><div class="points"><small>我的积分</small><b>{{store.user.points}}</b><span>积分明细 →</span></div></div>
    <div class="account-grid">
      <aside class="account-menu">
        <button :class="{active:section==='profile'}" @click="section='profile'">◎ 个人中心</button>
        <router-link to="/orders">▤ 我的订单 <em>2</em></router-link>
        <button :class="{active:section==='favorites'}" @click="section='favorites'">♡ 个人收藏 <em>{{favoriteProducts.length}}</em></button>
        <a>♧ 优惠券 <em>3</em></a><a>⌖ 收货地址</a><a>⚙ 账号设置</a><a @click="$router.push('/login')">↪ 退出登录</a>
      </aside>
      <div class="account-content">
        <template v-if="section==='profile'">
          <div class="account-stats"><div><b>2</b><span>待处理订单</span></div><div><b>3</b><span>优惠券</span></div><div><b>12</b><span>累计购买</span></div></div>
          <section class="account-card"><div class="section-head"><div><span class="eyebrow">RECENT ORDERS</span><h2>最近订单</h2></div><router-link to="/orders">查看全部 →</router-link></div><div v-for="o in store.orders" :key="o.id" class="mini-order"><span class="order-thumb" :style="{background:findProduct(o.items[0]).color}">{{findProduct(o.items[0]).emoji}}</span><span><b>{{findProduct(o.items[0]).name}}</b><small>{{o.date}} · {{o.status}}</small></span><strong>¥{{o.total.toFixed(1)}}</strong></div></section>
        </template>
        <section v-else class="account-card favorite-card"><div class="section-head"><div><span class="eyebrow">MY FAVORITES</span><h2>个人收藏</h2></div><span>{{favoriteProducts.length}} 件商品</span></div><div v-if="favoriteProducts.length" class="product-grid"><ProductCard v-for="product in favoriteProducts" :key="product.id" :product="product" /></div><div v-else class="favorites-empty"><span>♡</span><b>还没有收藏商品</b><p>去逛逛，收藏喜欢的新鲜好物吧。</p><router-link to="/category" class="primary">去逛逛</router-link></div></section>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import { store, findProduct } from '../data'
import ProductCard from '../components/ProductCard.vue'
const section = ref('profile')
const favoriteProducts = computed(() => store.favorites.map(findProduct).filter(Boolean))
</script>


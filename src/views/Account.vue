<template>
  <section class="container page account-page">
    <div class="account-head"><UserAvatar class="avatar" :user="store.user"/><div><span class="eyebrow">MEMBER CENTER</span><h1>{{store.user.nickname}}，欢迎回来</h1><p>{{store.membership.name}} · 有效期至 {{store.membership.expireAt}}</p></div><div class="points"><small>我的积分</small><b>{{store.user.points}}</b><span>积分明细 →</span></div></div>
    <div class="account-grid">
      <aside class="account-menu">
        <router-link to="/account" :class="{active:section==='profile'}">◎ 个人中心</router-link>
        <router-link to="/orders">▤ 我的订单 <em>{{store.orders.length}}</em></router-link>
        <router-link to="/account?section=favorites" :class="{active:section==='favorites'}">♡ 个人收藏 <em>{{favoriteProducts.length}}</em></router-link>
        <router-link to="/account?section=coupons" :class="{active:section==='coupons'}">♧ 优惠券 <em>{{availableBenefits}}</em></router-link>
        <router-link to="/addresses">⌖ 收货地址</router-link><router-link to="/settings">⚙ 账号设置</router-link><a @click="$router.push('/login')">↪ 退出登录</a>
      </aside>
      <div class="account-content">
        <template v-if="section==='profile'"><div class="account-stats"><div><b>2</b><span>待处理订单</span></div><div><b>{{availableBenefits}}</b><span>可用权益</span></div><div><b>12</b><span>累计购买</span></div></div><section class="account-card"><div class="section-head"><div><span class="eyebrow">RECENT ORDERS</span><h2>最近订单</h2></div><router-link to="/orders">查看全部 →</router-link></div><div v-for="o in store.orders" :key="o.id" class="mini-order"><span class="order-thumb" :style="{background:findProduct(o.items[0]).color}">{{findProduct(o.items[0]).emoji}}</span><span><b>{{findProduct(o.items[0]).name}}</b><small>{{o.date}} · {{o.status}}</small></span><strong>¥{{o.total.toFixed(1)}}</strong></div></section></template>
        <section v-else-if="section==='coupons'" class="account-card coupon-card"><div class="section-head"><div><span class="eyebrow">MY BENEFITS</span><h2>会员专享权益</h2><p>以下是 {{store.membership.name}} 的开卡四项专项权益，使用后权益券会变灰。</p></div><span>{{availableBenefits}} 项可用</span></div><div class="benefit-coupon-grid"><button v-for="benefit in membershipBenefits" :key="benefit.id" class="benefit-coupon" :class="{used:isBenefitUsed(benefit.id)}" :disabled="isBenefitUsed(benefit.id)" @click="useBenefit(benefit)"><span class="benefit-coupon-icon">{{benefit.icon}}</span><span class="benefit-coupon-copy"><b>{{benefit.name}}</b><small>{{benefit.description}}</small><em>{{benefit.detail}}</em></span><span class="benefit-coupon-status">{{isBenefitUsed(benefit.id)?'已使用':'立即使用'}}</span></button></div></section>
        <section v-else class="account-card favorite-card"><div class="section-head"><div><span class="eyebrow">MY FAVORITES</span><h2>个人收藏</h2></div><span>{{favoriteProducts.length}} 件商品</span></div><div v-if="favoriteProducts.length" class="product-grid"><ProductCard v-for="product in favoriteProducts" :key="product.id" :product="product" /></div><div v-else class="favorites-empty"><span>♡</span><b>还没有收藏商品</b><p>去逛逛，收藏喜欢的新鲜好物吧。</p><router-link to="/category" class="primary">去逛逛</router-link></div></section>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { store, findProduct, membershipBenefits, useMembershipBenefit } from '../data'
import ProductCard from '../components/ProductCard.vue'
import UserAvatar from '../components/UserAvatar.vue'
const route=useRoute(), notify=inject('notify')
const section=computed(()=>['favorites','coupons'].includes(route.query.section)?route.query.section:'profile')
const favoriteProducts=computed(()=>store.favorites.map(findProduct).filter(Boolean))
const availableBenefits=computed(()=>membershipBenefits.filter(benefit=>!isBenefitUsed(benefit.id)).length)
const isBenefitUsed=benefitId=>store.membership.usedBenefits.includes(benefitId)
const useBenefit=benefit=>{useMembershipBenefit(benefit.id);notify(`${benefit.name}权益已使用`)}
</script>

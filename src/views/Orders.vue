<template>
  <section class="container page orders-page">
    <div class="orders-layout">
      <aside class="account-menu orders-menu">
        <router-link to="/account">◎ 个人中心</router-link>
        <router-link to="/orders" class="active">▤ 我的订单 <em>{{store.orders.length}}</em></router-link>
        <router-link to="/account?section=favorites">♡ 个人收藏 <em>{{store.favorites.length}}</em></router-link>
        <a @click="notify('优惠券功能即将开放')">♧ 优惠券 <em>3</em></a>
        <router-link to="/addresses">⌖ 收货地址</router-link>
        <router-link to="/settings">⚙ 账号设置</router-link>
        <a @click="$router.push('/login')">↪ 退出登录</a>
      </aside>
      <div class="orders-main">
        <div class="page-heading"><div><span class="eyebrow">MY ORDERS</span><h1>我的订单</h1><p>查看订单进度，管理每一次新鲜到家。</p></div><router-link to="/category" class="secondary">继续买买买</router-link></div>
        <div class="order-tabs"><button v-for="t in tabs" :key="t" :class="{active:tab===t}" @click="tab=t">{{t}}</button></div>
        <div class="orders"><article v-for="order in filtered" :key="order.id" class="order-card"><div class="order-head"><b>{{order.date}}</b><span>订单号：{{order.id}}</span><strong>{{order.status}}</strong></div><div class="order-body"><div class="order-products"><span v-for="id in order.items" :key="id" class="order-thumb" :style="{background:findProduct(id).color}">{{findProduct(id).emoji}}</span><div><b>{{findProduct(order.items[0]).name}}<span v-if="order.items.length>1"> 等 {{order.items.length}} 件商品</span></b><p>配送至 上海市静安区南京西路 888 号</p></div></div><div class="order-total"><small>实付金额</small><strong>¥{{order.total.toFixed(1)}}</strong></div><div class="order-actions"><button v-if="order.status==='配送中'" class="primary small" @click="notify('配送员正在火速赶来')">查看配送</button><button v-else class="secondary small">再次购买</button><button class="text-button">订单详情</button></div></div><div v-if="order.status==='配送中'" class="tracking"><span class="done">✓ 已下单</span><i></i><span class="done">✓ 已拣货</span><i></i><span class="current">● 配送中</span><i></i><span>○ 已送达</span></div></article><div v-if="!filtered.length" class="empty">暂无相关订单</div></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {computed,ref,inject} from 'vue'
import {store,findProduct} from '../data'
const notify=inject('notify'),tab=ref('全部'),tabs=['全部','待付款','待配送','配送中','已完成']
const filtered=computed(()=>tab.value==='全部'?store.orders:store.orders.filter(o=>o.status===tab.value||tab.value==='配送中'&&o.status==='配送中'))
</script>

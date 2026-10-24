<template>
  <section class="container page membership-page">
    <div class="page-heading"><div><span class="eyebrow">MEMBER BENEFITS</span><h1>会员权益</h1><p>选择适合你的会员方案，全年畅享专属优惠。</p></div></div>
    <div class="membership-plans">
      <article class="membership-plan gold-plan">
        <div class="plan-header"><div class="plan-icon">♛</div><div><span class="plan-kicker">FRESH SELECT GOLD</span><h2>鲜选黄金会员</h2></div><span class="plan-tag">超值推荐</span></div>
        <div class="plan-benefit-title">开卡专享四大权益</div>
        <div class="plan-benefit-tags"><span>会员价</span><span>会员日</span><span>免运费</span><span>专享券</span></div>
        <ul class="plan-details"><li><b>会员价</b><span>可以打 95 折</span></li><li><b>会员日</b><span>购买指定商品打 88 折</span></li><li><b>免运费</b><span>每日一次免运费</span></li><li><b>专享券</b><span>每周可领 6 张，购买该类别商品满指定金额立减相应金额</span></li></ul>
        <button class="plan-buy" @click="purchase('鲜选黄金会员')"><span>立即购买</span><strong>¥258<small>/年</small></strong></button>
      </article>
      <article class="membership-plan diamond-plan">
        <div class="diamond-glow">✦</div>
        <div class="plan-header"><div class="plan-icon">◆</div><div><span class="plan-kicker">FRESH SELECT DIAMOND</span><h2>鲜选钻石会员</h2></div><span class="plan-tag">尊享</span></div>
        <div class="plan-benefit-title">开卡专享四大权益</div>
        <div class="plan-benefit-tags"><span>会员价</span><span>会员日</span><span>免运费</span><span>专享券</span></div>
        <ul class="plan-details"><li><b>会员价</b><span>可以打九折</span></li><li><b>会员日</b><span>购买指定商品打 85 折</span></li><li><b>免运费</b><span>每日一次免运费</span></li><li><b>专享券</b><span>每周可领 6 张，购买该类别商品满指定金额立减相应金额</span></li></ul>
        <button class="plan-buy" @click="purchase('鲜选钻石会员')"><span>立即购买</span><strong>¥500<small>/年</small></strong></button>
      </article>
    </div>
  </section>
</template>
<script setup>
import { inject } from 'vue'
import { activateMembership } from '../data'
const notify = inject('notify')
const purchase = name => { const level=name.includes('钻石')?'diamond':'gold'; activateMembership(name,level); notify(`已开通${name}，权益已同步到我的优惠券`) }
</script>



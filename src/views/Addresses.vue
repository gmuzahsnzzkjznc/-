<template>
  <section class="container page address-page">
    <div class="address-titlebar"><div><span class="eyebrow">ADDRESS BOOK</span><h1>收货地址</h1><p>管理你的收货地址，让每一次配送都准确到达。</p></div><router-link to="/account" class="back-link">← 返回我的</router-link></div>
    <section v-if="currentAddress" class="current-address-card"><div class="current-address-top"><span class="location-icon">⌖</span><div><span class="eyebrow">CURRENT ADDRESS</span><h2>当前使用地址</h2></div><div class="address-badges"><b>当前使用</b><em v-if="currentAddress.isDefault">默认地址</em></div></div><div class="address-main"><div><strong>{{currentAddress.receiver}}</strong><span>{{currentAddress.phone}}</span><label>{{currentAddress.label}}</label></div><p>{{currentAddress.region}} {{currentAddress.detail}}</p></div><div class="location-status">● 定位服务正常　·　配送范围内</div></section>
    <section class="add-address-card" @click="openAdd"><div class="add-icon">＋</div><div><h2>新增收货地址</h2><p>手动填写、地图选择或使用当前位置自动填写</p></div><span>→</span></section>
    <section class="address-list-section"><div class="section-head"><div><span class="eyebrow">MY ADDRESSES</span><h2>我的地址</h2></div><span class="muted">{{addresses.length}} 个地址</span></div><div v-if="addresses.length" class="address-list"><article v-for="address in addresses" :key="address.id" class="address-card" :class="{selected:address.current}" draggable="true" @dragstart="dragStart(address)" @dragover.prevent @drop="dropAddress(address)" @click="setCurrent(address)"><div class="address-card-head"><span class="drag-handle">⋮⋮</span><div class="address-person"><strong>{{address.receiver}}</strong><span>{{maskPhone(address.phone)}}</span><label>{{address.label}}</label></div><div class="address-actions"><button @click.stop="openEdit(address)">修改</button><button @click.stop="remove(address)">删除</button><button v-if="!address.current" @click.stop="setCurrent(address)">设为当前地址</button><b v-else>✓ 当前使用</b></div></div><p class="address-detail">⌖ {{address.region}} {{address.detail}}</p><div class="address-card-foot"><span v-if="address.isDefault">默认地址</span><small>点击地址卡片可切换当前使用地址</small></div></article></div><div v-else class="address-empty"><span>⌖</span><h2>还没有收货地址</h2><p>新增一个地址，方便我们把新鲜商品送到家。</p><button class="primary" @click="openAdd">＋ 新增第一个地址</button></div></section>
    <div v-if="showForm" class="address-modal" @click.self="closeForm"><form class="address-form" @submit.prevent="saveAddress"><div class="form-heading"><div><span class="eyebrow">{{editing?'EDIT ADDRESS':'NEW ADDRESS'}}</span><h2>{{editing?'修改收货地址':'新增收货地址'}}</h2></div><button type="button" @click="closeForm">×</button></div><div class="form-grid"><label>收货人<input v-model.trim="form.receiver" required placeholder="请输入收货人姓名"/></label><label>手机号码<input v-model.trim="form.phone" required placeholder="请输入手机号码"/></label><label>所在地区<select v-model="form.region" required><option disabled value="">请选择所在地区</option><option>上海市 静安区</option><option>上海市 徐汇区</option><option>上海市 长宁区</option></select></label><label>地址标签<div class="label-options"><button v-for="label in labels" type="button" :class="{active:form.label===label}" @click="form.label=label">{{label}}</button></div></label><label class="full-field">详细地址<textarea v-model.trim="form.detail" required placeholder="请输入街道、楼栋、门牌号等详细地址"></textarea></label></div><div class="form-tools"><div class="location-tools"><button type="button" class="location-fill" @click="useLocation">⌖ 使用当前位置</button><button type="button" class="location-fill" @click="chooseMap">▧ 地图选择位置</button></div><label class="switch-label"><input type="checkbox" v-model="form.isDefault"/> 设为默认地址</label></div><button class="primary full" type="submit">保存地址</button></form></div>
  </section>
</template>
<script setup>
import { computed, reactive, ref, inject } from 'vue'
import { addresses } from '../data'

const notify=inject('notify')
const showForm=ref(false)
const editing=ref(null)
const dragId=ref(null)
const labels=['家','公司','学校','其他']
const emptyForm=()=>({receiver:'',phone:'',region:'',detail:'',label:'家',isDefault:false})
const form=reactive(emptyForm())
const currentAddress=computed(()=>addresses.find(address=>address.current)||addresses.find(address=>address.isDefault)||addresses[0])
const resetForm=()=>Object.assign(form,emptyForm())
const openAdd=()=>{editing.value=null;resetForm();showForm.value=true}
const openEdit=address=>{editing.value=address.id;Object.assign(form,address);showForm.value=true}
const closeForm=()=>{showForm.value=false}
const saveAddress=()=>{
  const existing=editing.value&&addresses.find(item=>item.id===editing.value)
  if(form.isDefault||!addresses.length) addresses.forEach(address=>{address.isDefault=false;address.current=false})
  if(existing){
    Object.assign(existing,form)
    if(form.isDefault||!addresses.some(address=>address.isDefault)){existing.isDefault=true;existing.current=true}
  }else{
    const address={...form,id:Date.now(),current:form.isDefault||!addresses.length,isDefault:form.isDefault||!addresses.length}
    addresses.push(address)
    if(address.current) addresses.forEach(item=>{if(item.id!==address.id)item.current=false})
  }
  showForm.value=false
  notify('地址保存成功')
}
const setCurrent=address=>{
  addresses.forEach(item=>{item.current=item.id===address.id;item.isDefault=item.id===address.id})
  notify(`已切换至${address.label}地址`)
}
const remove=address=>{
  if(!window.confirm(`确定删除“${address.region} ${address.detail}”吗？`)) return
  const index=addresses.findIndex(item=>item.id===address.id)
  addresses.splice(index,1)
  if(address.current&&addresses[0]){addresses[0].current=true;addresses[0].isDefault=true}
  notify('地址已删除')
}
const useLocation=()=>{form.region='上海市 静安区';form.detail='南京西路 888 号（当前位置）';notify('已使用当前位置填充地址')}
const chooseMap=()=>{form.region='上海市 静安区';form.detail='南京西路 888 号（地图选点）';notify('地图选点已填入地址')}
const maskPhone=phone=>phone?.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')||''
const dragStart=address=>{dragId.value=address.id}
const dropAddress=target=>{
  if(!dragId.value||dragId.value===target.id) return
  const from=addresses.findIndex(address=>address.id===dragId.value)
  const to=addresses.findIndex(address=>address.id===target.id)
  const [moved]=addresses.splice(from,1)
  addresses.splice(to,0,moved)
  dragId.value=null
  notify('地址顺序已调整')
}
</script>

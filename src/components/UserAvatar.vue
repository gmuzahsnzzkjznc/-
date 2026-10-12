<template><span class="user-avatar" :class="{ 'has-photo': user?.avatar }"><img v-if="user?.avatar" :src="user.avatar" :style="{ objectPosition: user.avatarPosition || '50% 50%' }" alt="用户头像"/><span v-else>{{ initials }}</span></span></template>
<script setup>
import { computed } from 'vue'
const props=defineProps({user:{type:Object,required:true}})
const initials=computed(()=>String(props.user.nickname||props.user.name||'用').trim().slice(0,1)||'用')
</script>

<template>
  <section class="container page settings-page">
    <header class="settings-heading"><div><span class="eyebrow">ACCOUNT CENTER</span><h1>账户设置</h1><p>维护个人资料与账号安全，资料修改将同步到鲜选各页面。</p></div><router-link to="/account" class="settings-back">← 返回个人中心</router-link></header>

    <section class="settings-card profile-settings-card">
      <div class="settings-card-heading"><div><span class="settings-icon">♙</span><div><h2>个人资料</h2><p>你的头像、昵称和性别信息</p></div></div><span class="sync-status">● 已开启全站同步</span></div>
      <div class="profile-setting-row avatar-setting-row"><div class="setting-label">用户头像<small>支持 JPG、PNG、WEBP 图片</small></div><div class="avatar-setting-value"><UserAvatar class="settings-avatar" :user="store.user"/><button class="text-button" @click="openAvatar">修改头像</button></div></div>
      <button class="profile-setting-row setting-button" @click="openNickname"><span class="setting-label">用户昵称<small>昵称将在个人中心及互动内容中同步展示</small></span><span class="setting-value">{{store.user.nickname}} <i>›</i></span></button>
      <button class="profile-setting-row setting-button" @click="showGender=true"><span class="setting-label">性别设置<small>此信息仅用于完善个人资料</small></span><span class="setting-value">{{store.user.gender}} <i>›</i></span></button>
    </section>

    <section class="settings-card security-settings-card">
      <div class="settings-card-heading"><div><span class="settings-icon security-icon">⌑</span><div><h2>账号安全</h2><p>保护账号和登录状态</p></div></div><span class="security-level">安全状态良好</span></div>
      <button class="security-row" @click="showPassword=true"><span><b>修改密码</b><small>定期更新密码可提升账号安全</small></span><em>修改密码　›</em></button>
      <div class="devices-heading"><div><b>登录设备</b><small>查看并管理当前账号的登录状态</small></div><span>{{devices.filter(item=>item.active).length}} 台设备</span></div>
      <div v-for="device in devices" :key="device.id" class="device-row"><span class="device-icon">{{device.icon}}</span><span class="device-info"><b>{{device.name}} <em v-if="device.current">当前设备</em></b><small>{{device.detail}}</small></span><button v-if="device.current" @click="logoutCurrent">退出当前设备</button><button v-else-if="device.active" @click="logoutDevice(device)">退出登录</button><span v-else class="device-ended">已退出</span></div>
    </section>

    <div v-if="showNickname" class="settings-overlay" @click.self="showNickname=false"><section class="settings-dialog"><header><div><span class="eyebrow">PROFILE</span><h2>修改昵称</h2></div><button class="dialog-close" @click="showNickname=false">×</button></header><div class="current-nickname">当前昵称 <b>{{store.user.nickname}}</b></div><label class="settings-field">新昵称<input v-model.trim="nickname" maxlength="16" placeholder="请输入 2-16 个字符的昵称" @keyup.enter="saveNickname"/><small>{{Array.from(nickname).length}} / 16</small></label><p class="validation-hint">昵称长度为 2-16 位，不可使用敏感词或重复昵称。</p><p v-if="nicknameError" class="settings-error">{{nicknameError}}</p><button class="primary full" @click="saveNickname">保存昵称</button></section></div>

    <div v-if="showGender" class="settings-overlay gender-overlay" @click.self="showGender=false"><section class="gender-sheet"><div class="sheet-handle"></div><header><h2>选择性别</h2><button class="dialog-close" @click="showGender=false">×</button></header><label v-for="gender in genders" :key="gender" class="gender-option" :class="{selected:store.user.gender===gender}" @click="saveGender(gender)"><span>{{gender}}</span><i>{{store.user.gender===gender?'✓':''}}</i></label></section></div>

    <div v-if="showAvatar" class="settings-overlay" @click.self="closeAvatar"><section class="settings-dialog avatar-dialog"><header><div><span class="eyebrow">PROFILE PHOTO</span><h2>{{previewSource?'预览并裁剪头像':'修改头像'}}</h2></div><button class="dialog-close" @click="closeAvatar">×</button></header>
      <template v-if="previewSource"><p class="avatar-preview-hint">拖动滑块调整头像取景，确认后将同步更新至个人中心。</p><div class="avatar-crop-window"><img :src="previewSource" :style="cropPreviewStyle" alt="头像裁剪预览"/></div><label class="crop-control">缩放<input v-model.number="cropZoom" type="range" min="1" max="2.5" step="0.05"/></label><label class="crop-control">水平位置<input v-model.number="cropX" type="range" min="-1" max="1" step="0.05"/></label><label class="crop-control">垂直位置<input v-model.number="cropY" type="range" min="-1" max="1" step="0.05"/></label><div class="dialog-actions"><button class="secondary" @click="previewSource=''">重新选择</button><button class="primary" @click="confirmAvatar">确认使用</button></div></template>
      <template v-else><div class="avatar-choice-preview"><UserAvatar class="settings-avatar large-avatar" :user="store.user"/><span>当前头像</span></div><div class="avatar-source-actions"><button class="secondary" @click="triggerFile">上传本地图片</button><button class="secondary" @click="triggerCamera">拍摄照片</button><button class="default-avatar-button" @click="useDefaultAvatar">使用默认头像</button></div><input ref="fileInput" class="visually-hidden" type="file" accept="image/*" @change="readImage"/><input ref="cameraInput" class="visually-hidden" type="file" accept="image/*" capture="environment" @change="readImage"/><p class="validation-hint">选择图片后可预览并调整裁剪区域，再确认保存。</p></template>
    </section></div>

    <div v-if="showPassword" class="settings-overlay" @click.self="closePassword"><form class="settings-dialog" @submit.prevent="savePassword"><header><div><span class="eyebrow">SECURITY</span><h2>修改密码</h2></div><button type="button" class="dialog-close" @click="closePassword">×</button></header><label class="settings-field">旧密码<input v-model="passwordForm.oldPassword" type="password" autocomplete="current-password" placeholder="请输入当前密码"/></label><label class="settings-field">新密码<input v-model="passwordForm.newPassword" type="password" autocomplete="new-password" placeholder="8-20 位，包含字母和数字"/></label><label class="settings-field">确认新密码<input v-model="passwordForm.confirmPassword" type="password" autocomplete="new-password" placeholder="请再次输入新密码"/></label><ul class="password-rules"><li>密码长度 8-20 位</li><li>必须同时包含英文字母和数字</li><li>避免使用简单或常见密码</li></ul><p v-if="passwordError" class="settings-error">{{passwordError}}</p><button class="primary full" type="submit">确认修改</button></form></div>
    <div v-if="toast" class="settings-toast">✓ {{toast}}</div>
  </section>
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveUserProfile, store } from '../data'
import UserAvatar from '../components/UserAvatar.vue'

const notify=inject('notify'), router=useRouter(), genders=['男','女','保密'], toast=ref('')
const showNickname=ref(false), showGender=ref(false), showAvatar=ref(false), showPassword=ref(false)
const nickname=ref(''), nicknameError=ref(''), passwordError=ref(''), previewSource=ref(''), cropZoom=ref(1), cropX=ref(0), cropY=ref(0)
const fileInput=ref(null), cameraInput=ref(null)
const passwordForm=reactive({oldPassword:'',newPassword:'',confirmPassword:''})
const devices=reactive([{id:1,name:'本设备 · Windows 浏览器',detail:'当前登录 · 最近活动：刚刚',icon:'▣',current:true,active:true},{id:2,name:'iPhone · Safari',detail:'上海 · 最近活动：昨天 20:18',icon:'▯',current:false,active:true}])
let toastTimer
const cropPreviewStyle=computed(()=>({transform:`scale(${cropZoom.value}) translate(${cropX.value*-12}%,${cropY.value*-12}%)`}))
const flash=message=>{toast.value=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.value='',2300)}
const openNickname=()=>{nickname.value=store.user.nickname;nicknameError.value='';showNickname.value=true}
const saveNickname=()=>{const value=nickname.value.trim(),length=Array.from(value).length;if(length<2||length>16){nicknameError.value='昵称长度需为 2-16 个字符';return}if(/管理员|官方|客服|色情|诈骗|傻逼/i.test(value)){nicknameError.value='昵称包含不适宜使用的内容';return}const reserved=['小王','快乐用户','鲜选用户'];if(value!==store.user.nickname&&reserved.includes(value)){nicknameError.value='该昵称已被使用，请换一个试试';return}store.user.nickname=value;store.user.name=value;saveUserProfile();showNickname.value=false;flash('昵称已更新并同步')}
const saveGender=value=>{store.user.gender=value;saveUserProfile();showGender.value=false;flash('性别资料已更新')}
const openAvatar=()=>{previewSource.value='';showAvatar.value=true}
const closeAvatar=()=>{showAvatar.value=false;previewSource.value=''}
const triggerFile=()=>fileInput.value?.click()
const triggerCamera=()=>cameraInput.value?.click()
const readImage=event=>{const file=event.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){flash('请选择图片文件');return}if(file.size>12*1024*1024){flash('图片不能超过 12MB');event.target.value='';return}const reader=new FileReader();reader.onload=()=>{previewSource.value=String(reader.result);cropZoom.value=1;cropX.value=0;cropY.value=0};reader.readAsDataURL(file);event.target.value=''}
const confirmAvatar=()=>{const image=new Image();image.onload=()=>{const side=Math.min(image.naturalWidth,image.naturalHeight)/cropZoom.value;const centerX=image.naturalWidth/2+cropX.value*(image.naturalWidth-side)/2;const centerY=image.naturalHeight/2+cropY.value*(image.naturalHeight-side)/2;const sx=Math.max(0,Math.min(image.naturalWidth-side,centerX-side/2));const sy=Math.max(0,Math.min(image.naturalHeight-side,centerY-side/2));const canvas=document.createElement('canvas');canvas.width=320;canvas.height=320;canvas.getContext('2d').drawImage(image,sx,sy,side,side,0,0,320,320);store.user.avatar=canvas.toDataURL('image/jpeg',0.84);store.user.avatarPosition='50% 50%';saveUserProfile();closeAvatar();flash('头像已更新并同步')};image.onerror=()=>flash('图片读取失败，请重试');image.src=previewSource.value}
const useDefaultAvatar=()=>{store.user.avatar='';store.user.avatarPosition='50% 50%';saveUserProfile();closeAvatar();flash('已切换为默认头像')}
const resetPasswordForm=()=>Object.assign(passwordForm,{oldPassword:'',newPassword:'',confirmPassword:''})
const closePassword=()=>{showPassword.value=false;passwordError.value='';resetPasswordForm()}
const savePassword=()=>{passwordError.value='';const current=localStorage.getItem('fresh_demo_password')||'123456';if(passwordForm.oldPassword!==current){passwordError.value='旧密码不正确';return}if(passwordForm.newPassword.length<8||passwordForm.newPassword.length>20||!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*._-]+$/.test(passwordForm.newPassword)){passwordError.value='新密码需为 8-20 位，并同时包含字母和数字';return}if(/^(password|12345678|qwerty123|abc12345)$/i.test(passwordForm.newPassword)){passwordError.value='请勿使用过于简单的密码';return}if(passwordForm.newPassword!==passwordForm.confirmPassword){passwordError.value='两次输入的新密码不一致';return}localStorage.setItem('fresh_demo_password',passwordForm.newPassword);closePassword();window.alert('密码修改成功，请重新登录');sessionStorage.removeItem('fresh_token');sessionStorage.removeItem('fresh_role');router.push('/login')}
const logoutCurrent=()=>{sessionStorage.removeItem('fresh_token');sessionStorage.removeItem('fresh_role');router.push('/login')}
const logoutDevice=device=>{device.active=false;flash('该设备已退出登录')}
</script>

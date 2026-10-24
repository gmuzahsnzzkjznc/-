<template>
  <div class="member-management">
    <section class="member-metrics">
      <article v-for="metric in metrics" :key="metric.label" class="member-metric-card" :class="`tone-${metric.tone}`">
        <div class="member-metric-icon">{{ metric.icon }}</div>
        <div class="member-metric-copy"><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong><small>{{ metric.note }}</small></div>
      </article>
    </section>
    <section class="admin-card member-list-card">
      <div class="member-list-head"><div><span class="admin-eyebrow">MEMBER DIRECTORY</span><h2>会员信息列表</h2><p>查看会员资料、等级、消费情况和当前状态。</p></div><button class="admin-primary" @click="emit('notify', '已打开新增会员弹窗')">＋ 新增会员</button></div>
      <div class="member-toolbar"><div class="search-admin member-search">⌕ <input v-model.trim="keyword" placeholder="搜索会员姓名、手机号、会员编号..." /></div><select v-model="levelFilter"><option value="全部等级">全部等级</option><option v-for="level in levels" :key="level" :value="level">{{ level }}</option></select><select v-model="statusFilter"><option value="全部状态">全部状态</option><option value="正常">正常</option><option value="已停用">已停用</option></select></div>
      <div class="data-summary"><span>共 {{ filteredMembers.length }} 条会员记录</span><span>统计周期：{{ period }}</span></div>
      <div class="member-table-wrap"><table class="member-table"><thead><tr><th>会员信息</th><th>会员等级</th><th>注册时间</th><th>最近活跃</th><th>累计消费</th><th>订单数</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-for="member in filteredMembers" :key="member.id"><td><div class="member-identity"><span class="member-avatar">{{ member.name.slice(0, 1) }}</span><div><b>{{ member.name }}</b><small>{{ member.id }} · {{ member.phone }}</small></div></div></td><td><span class="member-level" :class="member.levelClass">{{ member.level }}</span></td><td>{{ member.joinedAt }}</td><td>{{ member.lastActive }}</td><td class="member-spend">¥{{ member.spend.toLocaleString('zh-CN', { minimumFractionDigits: 2 }) }}</td><td>{{ member.orders }} 单</td><td><span class="member-status" :class="member.status === '正常' ? 'is-active' : 'is-disabled'">{{ member.status }}</span></td><td><button class="table-action" @click="emit('notify', `已打开“${member.name}”会员详情`)">查看详情</button></td></tr><tr v-if="!filteredMembers.length"><td colspan="8" class="member-empty">没有找到符合条件的会员</td></tr></tbody></table></div>
      <div class="pagination"><button disabled>‹</button><span class="active">1</span><button>2</button><button>3</button><span>…</span><button>›</button></div>
    </section>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const emit = defineEmits(['notify'])
const keyword = ref(''), levelFilter = ref('全部等级'), statusFilter = ref('全部状态'), period = '2026 年 10 月'
const levels = ['普通会员', '白银会员', '黄金会员', '钻石会员']
const metrics = [{ label: '会员总数', value: '24,680', note: '较上月增长 8.6%', icon: '♧', tone: 'green' }, { label: '新增会员数', value: '1,286', note: '本月新增注册会员', icon: '＋', tone: 'blue' }, { label: '活跃会员数', value: '18,420', note: '近 30 天有消费或访问', icon: '✦', tone: 'orange' }, { label: '会员消费占比', value: '62.8%', note: '会员订单销售额占比', icon: '¥', tone: 'purple' }]
const members = [{ id: 'U10028', name: '林女士', phone: '138****2088', level: '黄金会员', levelClass: 'level-gold', joinedAt: '2026-03-12', lastActive: '今天 10:18', spend: 2680.5, orders: 28, status: '正常' }, { id: 'U10029', name: '王先生', phone: '139****3812', level: '普通会员', levelClass: 'level-normal', joinedAt: '2026-04-08', lastActive: '今天 09:42', spend: 986.8, orders: 12, status: '正常' }, { id: 'U10030', name: '陈女士', phone: '137****6621', level: '白银会员', levelClass: 'level-silver', joinedAt: '2026-05-21', lastActive: '昨天 18:06', spend: 1428.2, orders: 19, status: '正常' }, { id: 'U10031', name: '赵先生', phone: '136****7190', level: '钻石会员', levelClass: 'level-diamond', joinedAt: '2026-01-17', lastActive: '今天 08:55', spend: 5688, orders: 43, status: '正常' }, { id: 'U10032', name: '周女士', phone: '158****9203', level: '黄金会员', levelClass: 'level-gold', joinedAt: '2026-06-03', lastActive: '2026-10-21', spend: 2180.9, orders: 24, status: '正常' }, { id: 'U10033', name: '刘先生', phone: '186****4028', level: '普通会员', levelClass: 'level-normal', joinedAt: '2026-07-19', lastActive: '2026-09-28', spend: 326, orders: 4, status: '已停用' }]
const filteredMembers = computed(() => { const query = keyword.value.toLowerCase(); return members.filter(member => (!query || [member.id, member.name, member.phone, member.level].some(value => value.toLowerCase().includes(query))) && (levelFilter.value === '全部等级' || member.level === levelFilter.value) && (statusFilter.value === '全部状态' || member.status === statusFilter.value)) })
</script>

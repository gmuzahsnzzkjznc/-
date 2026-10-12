import { reactive, computed } from 'vue'
export const categories = [
  { id:'fruit', name:'新鲜水果', icon:'🍊', color:'#fff0d8' }, { id:'vegetable', name:'时令蔬菜', icon:'🥬', color:'#eaf5dd' }, { id:'meat', name:'肉禽蛋品', icon:'🥩', color:'#fde4df' }, { id:'seafood', name:'水产海鲜', icon:'🦐', color:'#e2f2f7' }, { id:'staple', name:'粮油调味', icon:'🍚', color:'#f7efd6' }, { id:'snack', name:'休闲零食', icon:'🍪', color:'#f2e7f6' }, { id:'drink', name:'饮品乳品', icon:'🥛', color:'#e7eef9' }, { id:'ready', name:'方便速食', icon:'🍜', color:'#ffe8d5' },
]
export const products = [
  {id:1,name:'云南蓝莓 125g',category:'fruit',price:19.9,oldPrice:26.9,unit:'盒',tag:'今日特价',rating:4.9,sales:2680,origin:'云南玉溪',color:'#dce7fa',emoji:'🫐',desc:'颗颗饱满，酸甜多汁，精选当季头茬蓝莓。'},
  {id:2,name:'赣南脐橙 5kg',category:'fruit',price:39.9,oldPrice:59.9,unit:'箱',tag:'产地直采',rating:4.8,sales:1840,origin:'江西赣州',color:'#ffe2be',emoji:'🍊',desc:'果肉细嫩、汁水丰盈，现摘现发。'},
  {id:3,name:'有机奶油生菜 250g',category:'vegetable',price:8.9,oldPrice:12.9,unit:'份',tag:'有机认证',rating:4.9,sales:3150,origin:'山东寿光',color:'#dff1d7',emoji:'🥬',desc:'清脆爽口，来自每日清晨采摘的有机农场。'},
  {id:4,name:'谷饲原切西冷牛排 200g',category:'meat',price:32.8,oldPrice:45,unit:'袋',tag:'会员立减',rating:4.7,sales:920,origin:'澳大利亚',color:'#f6d8d2',emoji:'🥩',desc:'谷饲安格斯，肉质鲜嫩，适合煎烤。'},
  {id:5,name:'鲜活基围虾 500g',category:'seafood',price:29.9,oldPrice:39.9,unit:'盒',tag:'活鲜速达',rating:4.8,sales:1260,origin:'湛江',color:'#d9eef2',emoji:'🦐',desc:'鲜活现捞，个大肉弹，冷链送到家。'},
  {id:6,name:'山姆甄选鸡蛋 30枚',category:'meat',price:24.9,oldPrice:32.9,unit:'盒',tag:'新鲜到家',rating:4.9,sales:2280,origin:'湖北荆门',color:'#fff0ca',emoji:'🥚',desc:'谷物喂养，蛋黄饱满，早餐营养首选。'},
  {id:7,name:'五常稻花香大米 5kg',category:'staple',price:59.9,oldPrice:79.9,unit:'袋',tag:'本月热卖',rating:4.8,sales:870,origin:'黑龙江五常',color:'#f5eccf',emoji:'🍚',desc:'粒粒饱满，米香浓郁，来自核心产区。'},
  {id:8,name:'高钙鲜牛奶 250ml*12',category:'drink',price:35.9,oldPrice:42.9,unit:'箱',tag:'买一赠一',rating:4.8,sales:1760,origin:'内蒙古',color:'#e5eef8',emoji:'🥛',desc:'奶香自然，冷藏配送，日期新鲜。'},
]
const defaultUser={name:'林女士',nickname:'林女士',phone:'138****2088',points:4280,gender:'保密',avatar:'',avatarPosition:'50% 50%'}
const loadUser=()=>{try{return {...defaultUser,...JSON.parse(localStorage.getItem('fresh_user_profile')||'{}')}}catch{return defaultUser}}
export const store = reactive({ cart:[{productId:1,quantity:1},{productId:3,quantity:2}], favorites:[2], orders:[{id:'FS20261009028',status:'配送中',date:'2026-10-09 10:32',total:68.7,items:[1,3]},{id:'FS20261007116',status:'已完成',date:'2026-10-07 16:20',total:59.9,items:[7]}], user:loadUser() })
export const saveUserProfile=()=>{store.user.name=store.user.nickname;try{localStorage.setItem('fresh_user_profile',JSON.stringify({nickname:store.user.nickname,gender:store.user.gender,avatar:store.user.avatar,avatarPosition:store.user.avatarPosition}))}catch{}}
export const addresses = reactive([{id:1,receiver:'林女士',phone:'138****2088',region:'上海市 静安区',detail:'南京西路 888 号 鲜选公寓 12F',label:'家',isDefault:true,current:true},{id:2,receiver:'林女士',phone:'138****2088',region:'上海市 徐汇区',detail:'漕溪北路 28 号 3 栋 502',label:'公司',isDefault:false,current:false}])
export const cartCount = computed(() => store.cart.reduce((sum,item)=>sum+item.quantity,0))
export const findProduct = id => products.find(p => p.id === Number(id))
export const addToCart = (id, quantity=1) => { const item=store.cart.find(x=>x.productId===Number(id)); item ? item.quantity += quantity : store.cart.push({productId:Number(id),quantity}) }
export const cartItems = computed(() => store.cart.map(i=>({...i,product:findProduct(i.productId),subtotal:findProduct(i.productId).price*i.quantity})))



import { createRouter, createWebHistory } from 'vue-router';  
import Home from '../views/HomeH.vue'; // 商品页面组件  
import ChatComponent from '../components/ChatComponent.vue'; // 聊天组件  

const routes = [  
  { path: '/', component: Home }, // 商品页面  
  { path: '/chat', component: ChatComponent }, // 聊天页面  
];  

const router = createRouter({  
  history: createWebHistory(),  
  routes,  
});  

export default router;  
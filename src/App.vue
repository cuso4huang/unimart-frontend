<template>  
  <div id="app">  
    <header>  
      <h1>UniMart (Logo)</h1>  
      <nav class="navigation">  
        <div class="nav-links">  
          <router-link to="/chat">聊天信息</router-link>  

        </div>  
        <div class="dropdown">  
          <a href="#" @mouseover="showSidebarOptions">个人中心</a>  
          <ul v-if="sidebarVisible" class="sidebar-menu" @mouseleave="hideSidebarOptions">  
            <li>学生认证状态</li>  
            <li>个人信息设置</li>  
            <li>个人订单信息</li>  
            <li>配送模块</li>  
            <li>申请处理</li>  
            <li>退出登录</li>  
          </ul>  
        </div>  
      </nav>  
    </header>  

    <main>  
      <router-view></router-view> <!-- 这里渲染根据路由选择的组件 -->  
    </main>  
  </div>  
</template>  

<script>  
import { defineComponent } from 'vue';  

export default defineComponent({  
  data() {  
    return {  
      sidebarVisible: false,  
    };  
  },  
  methods: {  
    showSidebarOptions() {  
      this.sidebarVisible = true;  
    },  
    hideSidebarOptions() {  
      this.sidebarVisible = false;  
    },  
  },  
});  
</script>  

<style>  
body {  
  font-family: Arial, sans-serif;  
}  

header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  padding: 10px;  
  background-color: #f2f2f2;  
}  

.navigation {  
  display: flex;  
  align-items: center;  
}  

.nav-links {  
  display: flex;  
  gap: 20px; /* 为链接之间设置间距 */  
}  

.dropdown {  
  position: relative;  
  margin-left: 20px; /* 增加聊天信息和个人中心之间的间距 */  
}  

.sidebar-menu {  
  position: absolute;  
  background-color: #f9f9f9;  
  border: 1px solid #ccc;  
  width: 200px; /* 设置下拉条目宽度 */  
  list-style-type: none;  
  padding: 10px;  
}  

.sidebar-menu li {  
  margin: 5px 0;  
}  

main {  
  padding: 20px;  
}  
</style>  
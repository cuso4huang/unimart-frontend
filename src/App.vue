<template>  
  <div id="app" class="container">  
    <div class="image-side"></div> <!-- 左侧图片区域 -->
    <div class="login-container">  
      <h1 class="title">交易平台</h1>  
      <form @submit.prevent="handleLogin" class="login-form">  
        <div class="form-group">  
          <label for="username">用户名</label>  
          <input type="text" id="username" v-model="username" required />  
        </div>  
        <div class="form-group">  
          <label for="password">密码</label>  
          <input type="password" id="password" v-model="password" required />  
        </div>  
        <button type="submit">登录</button>  
      </form>  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>  
      <div class="footer-links">  
        <a href="#" class="register-link">账号注册</a>  
        <a href="#" class="forgot-password-link">忘记密码</a>  
      </div>  
    </div>  
  </div>  
</template>  

<script>  
export default {  
  data() {  
    return {  
      username: '',  
      password: '',  
      errorMessage: ''  
    };  
  },  
  methods: {  
    handleLogin() {  
      // 模拟登录逻辑  
      if (this.username === 'admin' && this.password === 'password') {  
        alert('登录成功！');  
      } else {  
        this.errorMessage = '用户名或密码错误';  
      }  
    }  
  }  
};  
</script>  

<style scoped>  
body {  
  margin: 0;  
  height: 100vh;  
}  

.container {  
  display: flex; /* 使用 Flexbox 布局 */
  height: 100%; 
}

.image-side {  
  flex: 0.5; /* 左侧占据50%的空间 */
  background-image: url('@/assets/1.jpg'); /* 引用本地图像 */
  background-size: cover;  
  background-position: center;  
  min-height:1000px;
  min-width:600px;
}

.login-container {  
  min-width: 300px; 
  max-height:350px; 
  margin: 200px auto; /* 添加上边距以留出空间 */
  padding: 20px;  
  border: 1px solid #ccc;  
  border-radius: 5px;  
  margin-left: 250px; /* 添加左边距，使得登录框向右移动 */
}  

.title {  
  text-align: center; /* 将标题居中 */  
}  

.login-form {  
  display: flex;  
  flex-direction: column; /* 使用列方向排列表单元素 */  
}  

.form-group {  
  margin-bottom: 15px;  
}  

label {  
  display: block;  
  margin-bottom: 5px;  
}  

input {  
  width: 100%;  
  padding: 8px;  
  box-sizing: border-box;  
}  

button {  
  width: 100%;  
  padding: 10px;  
  background-color: #007bff;  
  color: white;  
  border: none;  
  border-radius: 5px;  
  cursor: pointer;  
}  

button:hover {  
  background-color: #0056b3;  
}  

.error {  
  color: red;  
  margin-top: 10px;  
  text-align: center; /* 错误消息也居中 */  
}  

.footer-links {  
  display: flex;  
  justify-content: space-between; /* 使链接左右对齐 */  
  margin-top: 20px; /* 添加顶部间距 */  
}  

.footer-links a {  
  color: #007bff; /* 链接颜色 */  
  text-decoration: none; /* 无下划线 */  
  font-size: 14px; /* 字体大小 */  
}  

.footer-links a:hover {  
  text-decoration: underline; /* 悬停时下划线 */  
}  
</style>  
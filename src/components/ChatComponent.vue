<!-- src/components/ChatComponent.vue -->  
<template>  
  <div class="chat-container">  
    
    <div class="chat-content">  
      <div class="chat-list">  
        <div class="chat-item" v-for="user in users" :key="user.id">  
          {{ user.name }}  
        </div>  
      </div>  
      <div class="chat-window">  
        <div class="messages">  
          <div class="message" v-for="message in messages" :key="message.id">  
            <strong>{{ message.sender }}:</strong> {{ message.text }}  
          </div>  
        </div>  
        <div class="input-area">  
          <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />  
          <button @click="sendMessage">发送</button>  
        </div>  
      </div>  
    </div>  
  </div>  
</template>  

<script>  
export default {  
  name: 'ChatComponent',  // 这里更新组件名称  
  data() {  
    return {  
      newMessage: '',  
      messages: [],  
      users: [  
        { id: 1, name: 'www' },  
        { id: 2, name: '小壳' },  
      ],  
    };  
  },  
  methods: {  
    sendMessage() {  
      if (this.newMessage.trim()) {  
        this.messages.push({  
          id: Date.now(),  
          sender: '我',  
          text: this.newMessage,  
        });  
        this.newMessage = '';  
      }  
    },  
  },  
};  
</script>  

<style>  
.chat-container {  
  display: flex;  
  flex-direction: column;  
  height: 100vh;  
}  

header {  
  background-color: #f2f2f2;  
  padding: 10px;  
}  

.chat-content {  
  display: flex;  
  flex: 1;  
}  

.chat-list {  
  width: 150px; /* 聊天用户列表宽度 */  
  border-right: 1px solid #ccc;  
  padding: 10px;  
  overflow-y: auto;  
}  

.chat-item {  
  padding: 8px;  
  cursor: pointer;  
}  

.chat-item:hover {  
  background-color: #f0f0f0;  
}  

.chat-window {  
  flex: 1;  
  display: flex;  
  flex-direction: column;  
}  

.messages {  
  flex: 1;  
  padding: 10px;  
  border-bottom: 1px solid #ccc;  
  overflow-y: auto;  
}  

.input-area {  
  display: flex;  
  padding: 10px;  
}  

.input-area input {  
  flex: 1;  
  padding: 8px;  
}  

.input-area button {  
  padding: 8px;  
}  
</style>  
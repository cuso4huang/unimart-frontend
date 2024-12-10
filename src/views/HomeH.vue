<template>  
  <div id="home">  
   

    <main>  
      <div class="product">  
        <img :src="product.imageUrl" alt="产品图片" />  
        <div class="product-info">  
          <h2>{{ product.name }}</h2>  
          <p>浏览 {{ product.views }}</p>  
          <p>¥ {{ product.price }}</p>  
          <p>分类: {{ product.category }}</p>  
          <p>发布日期: {{ product.releaseDate }}</p>  
          <button @click="buyNow">立即购买</button>  
        </div>  
      </div>  

      <div class="product-details">  
        <h3>商品详情</h3>  
        <p>{{ product.details }}</p>  
      </div>  
    </main>  
  </div>  
</template>  

<script>  
export default {  
  data() {  
    return {  
      product: {  
        name: '键盘',  
        views: 8,  
        price: 200,  
        category: 'www',  
        releaseDate: '2024-03-18',  
        imageUrl: 'http://example.com/keyboard.jpg', // 产品图片链接  
        details: '这是一款高质量的键盘，适合各种用户需求。',  
      },  
      sidebarVisible: false,  
    };  
  },  
  methods: {  
    buyNow() {  
      alert('立即购买功能尚未实现');  
    },  
    showSidebarOptions() {  
      this.sidebarVisible = true;  
    },  
    hideSidebarOptions() {  
      this.sidebarVisible = false;  
    },  
  },  
};  
</script>  

<style>  
/* 添加商品页面样式 */  
main {  
  padding: 20px;  
}  
.product {  
  display: flex;  
  margin-bottom: 20px;  
}  
.product img {  
  width: 200px;  
  height: auto;  
  margin-right: 20px;  
}  
.product-info {  
  display: flex;  
  flex-direction: column;  
}  
.product-details {  
  margin-top: 20px;  
}  
</style>  
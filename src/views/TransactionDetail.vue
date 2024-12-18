<template>
  <div class="transaction-detail">
    <nav-bar></nav-bar>
    <div class="content" v-loading="loading">
      <el-card v-if="transaction">
        <div slot="header" class="header">
          <span>交易详情</span>
        </div>
        <div class="info-content">
          <!-- 基本信息 -->
          <div class="info-section">
            <h3>基本信息</h3>
            <div class="info-item">
              <span class="label">交易号：</span>
              <span>{{ transaction.transactionId }}</span>
            </div>
            <div class="info-item">
              <span class="label">交易状态：</span>
              <el-tag :type="getStatusType(transaction.transactionStatus)">{{ getStatusText(transaction.transactionStatus) }}</el-tag>
            </div>
            <div class="info-item">
              <span class="label">交易时间：</span>
              <span>{{ formatDate(transaction.transactionTime) }}</span>
            </div>
            <div class="info-item">
              <span class="label">支付方式：</span>
              <span>{{ getPaymentMethodText(transaction.paymentMethod) }}</span>
            </div>
            <div class="info-item">
              <span class="label">交易金额：</span>
              <span class="amount">¥{{ transaction.totalAmount }}</span>
            </div>
          </div>

          <!-- 商品信息 -->
          <div class="info-section">
            <h3>商品信息</h3>
            <div class="info-item">
              <span class="label">商品名称：</span>
              <span>{{ transaction.product?.productName }}</span>
            </div>
            <div class="info-item">
              <span class="label">商品描述：</span>
              <span>{{ transaction.product?.productDescription }}</span>
            </div>
          </div>

          <!-- 交易双方信息 -->
          <div class="info-section">
            <h3>交易双方</h3>
            <div class="info-item">
              <span class="label">买家：</span>
              <span>{{ transaction.buyer?.userName }}</span>
            </div>
            <div class="info-item">
              <span class="label">卖家：</span>
              <span>{{ transaction.seller?.userName }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="actions">
          <!-- 评价按钮 -->
          <el-button
            v-if="transaction.transactionStatus === 'PAID'"
            type="primary"
            @click="openRatingDialog"
            size="small"
          >
            {{ isBuyer ? '评价卖家' : '评价买家' }}
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 评分对话框 -->
    <rating-dialog
      :visible.sync="ratingDialogVisible"
      :transaction-id="transaction?.transactionId"
      :to-user-id="isBuyer ? transaction?.seller?.userId : transaction?.buyer?.userId"
      :is-buyer="isBuyer"
      @success="handleRatingSuccess"
    ></rating-dialog>
  </div>
</template>

<script>
import { getTransactionDetail } from '@/api/transaction'
import { formatDate } from '@/utils/date'
import NavBar from '@/components/NavBar.vue'
import RatingDialog from '@/components/RatingDialog.vue'
import { mapState } from 'vuex'

export default {
  name: 'TransactionDetail',
  components: {
    NavBar,
    RatingDialog
  },
  data() {
    return {
      loading: false,
      transaction: null,
      ratingDialogVisible: false
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.userInfo
    }),
    isBuyer() {
      return this.transaction && this.currentUser && 
        this.transaction.buyer?.userId === this.currentUser.id
    }
  },
  created() {
    this.fetchTransactionDetail()
  },
  methods: {
    formatDate,
    async fetchTransactionDetail() {
      const transactionId = this.$route.params.id
      this.loading = true
      try {
        const response = await getTransactionDetail(transactionId)
        this.transaction = response
      } catch (error) {
        console.error('获取交易详情失败:', error)
        this.$message.error('获取交易详情失败')
      } finally {
        this.loading = false
      }
    },
    getStatusType(status) {
      const statusMap = {
        'PENDING_PAYMENT': 'warning',
        'PAID': 'success',
        'COMPLETED': 'success',
        'CANCELLED': 'info'
      }
      return statusMap[status] || 'info'
    },
    getStatusText(status) {
      const statusMap = {
        'PENDING_PAYMENT': '待支付',
        'PAID': '已支付',
        'COMPLETED': '已完成',
        'CANCELLED': '已取消'
      }
      return statusMap[status] || status
    },
    getPaymentMethodText(method) {
      const methodMap = {
        'WECHAT': '微信支付',
        'ALIPAY': '支付宝'
      }
      return methodMap[method] || method
    },
    openRatingDialog() {
      this.ratingDialogVisible = true
    },
    handleRatingSuccess() {
      this.fetchTransactionDetail() // 刷新交易详情
      this.$message.success('评价成功')
    }
  }
}
</script>

<style scoped>
.transaction-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.info-section {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  width: 100px;
  color: #606266;
}

.amount {
  color: #ff4d4f;
  font-weight: bold;
}

.actions {
  margin-top: 20px;
  text-align: right;
  padding-right: 20px;
}
</style> 
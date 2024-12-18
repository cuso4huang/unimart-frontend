<template>
  <div class="transaction-record">
    <nav-bar></nav-bar>
    <div class="content">
      <el-card class="record-card">
        <div slot="header" class="header">
          <span>交易记录</span>
        </div>
        
        <el-table
          :data="transactionList"
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column label="商品信息" min-width="200">
            <template slot-scope="{row}">
              <div class="product-info">
                <span>{{ row.productName }}</span>
                <span class="price">¥{{ row.totalAmount }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="paymentMethod" label="支付方式" width="120">
            <template slot-scope="{row}">
              <span>{{ row.paymentMethod }}</span>
            </template>
          </el-table-column>
          
          <el-table-column prop="status" label="交易状态" width="120">
            <template slot-scope="{row}">
              <el-tag :type="getStatusType(row.status)">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          
          <el-table-column prop="createTime" label="交易时间" width="160">
            <template slot-scope="{row}">
              <span>{{ formatDate(row.createTime) }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="{row}">
              <div class="operation-buttons">
                <el-button
                  v-if="row.status === '已支付' && !row.isRated"
                  type="primary"
                  size="small"
                  @click.stop="openRatingDialog(row)"
                >
                  评价
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="$router.push(`/transaction/${row.transactionId}`)"
                >
                  查看详情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 评分对话框 -->
    <rating-dialog
      :visible.sync="ratingDialogVisible"
      :transaction-id="currentTransaction.transactionId"
      :to-user-id="currentTransaction.toUserId"
      :is-buyer="currentTransaction.isBuyer"
      @success="handleRatingSuccess"
    ></rating-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import NavBar from '@/components/NavBar.vue'
import RatingDialog from '@/components/RatingDialog.vue'
import { getMyTransactions } from '@/api/transaction'

export default {
  name: 'TransactionRecord',
  components: {
    NavBar,
    RatingDialog
  },
  data() {
    return {
      transactionList: [],
      loading: false,
      ratingDialogVisible: false,
      currentTransaction: {
        transactionId: null,
        toUserId: null,
        isBuyer: true
      }
    }
  },
  created() {
    this.fetchTransactionList()
  },
  methods: {
    formatDate,
    async fetchTransactionList() {
      this.loading = true
      try {
        const response = await getMyTransactions()
        this.transactionList = response
      } catch (error) {
        console.error('获取交易记录失败:', error)
        this.$message.error('获取交易记录失败')
      } finally {
        this.loading = false
      }
    },
    getStatusType(status) {
      const statusMap = {
        '待支付': 'warning',
        '已支付': 'success',
        '��取消': 'info',
        '已完成': 'success'
      }
      return statusMap[status] || 'info'
    },
    openRatingDialog(transaction) {
      this.currentTransaction = {
        transactionId: transaction.transactionId,
        toUserId: transaction.isBuyer ? transaction.sellerId : transaction.buyerId,
        isBuyer: transaction.isBuyer
      }
      this.ratingDialogVisible = true
    },
    handleRatingSuccess() {
      this.fetchTransactionList()
      this.$message.success('评价成功')
    }
  }
}
</script>

<style scoped>
.transaction-record {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.record-card {
  margin-bottom: 20px;
}

.header {
  font-size: 16px;
  font-weight: bold;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.price {
  color: #ff4d4f;
  font-weight: bold;
  margin-top: 5px;
}

.operation-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.el-button--text {
  padding: 0;
}
</style> 
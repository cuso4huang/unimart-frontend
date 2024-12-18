<template>
  <el-dialog
    title="评价"
    :visible.sync="visible"
    width="500px"
    @close="handleClose"
  >
    <div class="rating-content">
      <div class="rating-section">
        <span class="label">评分：</span>
        <el-rate v-model="form.rating" :max="5"></el-rate>
      </div>
      
      <div class="comment-section">
        <span class="label">评价内容：</span>
        <el-input
          type="textarea"
          v-model="form.comment"
          :rows="4"
          :placeholder="isBuyer ? '请输入对卖家的评价' : '请输入对买家的评价'"
        ></el-input>
      </div>

      <div class="upload-section">
        <span class="label">上传图片：</span>
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">
        提交评价
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createReview } from '@/api/review'

export default {
  name: 'RatingDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    transactionId: {
      type: Number,
      required: true
    },
    toUserId: {
      type: Number,
      required: true
    },
    isBuyer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        rating: 5, // 评分
        comment: '',
        imageUrls: []
      },
      submitting: false
    }
  },
  methods: {
    handleClose() {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {
        rating: 5,
        comment: '',
        imageUrls: []
      }
    },
    handleUploadSuccess(response) {
      this.form.imageUrls.push(response.url)
    },
    handleRemove(file) {
      const index = this.form.imageUrls.indexOf(file.url)
      if (index > -1) {
        this.form.imageUrls.splice(index, 1)
      }
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('只能上传图片文件！')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB！')
        return false
      }
      return true
    },
    async handleSubmit() {
      if (!this.form.rating) {
        this.$message.warning('请完成所有评分项')
        return
      }

      this.submitting = true
      try {
        const reviewData = {
          transactionId: this.transactionId,
          toUserId: this.toUserId,
          rating: this.form.rating,
          comment: this.form.comment,
          imageUrls: this.form.imageUrls
        }
        
        await createReview(reviewData)
        this.$message.success('评价提交成功')
        this.handleClose()
        this.$emit('success')
      } catch (error) {
        console.error('提交评价失败:', error)
        this.$message.error('提交评价失败')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.rating-content {
  padding: 20px 0;
}

.rating-section,
.comment-section,
.upload-section {
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style> 
import request from '@/utils/request'

export function createReview(data) {
  return request({
    url: '/reviews',
    method: 'post',
    data: {
      transactionId: data.transactionId,
      toUserId: data.toUserId,
      rating: data.rating,
      comment: data.comment,
      imageUrls: data.imageUrls
    }
  })
}

export function getUserReviews(userId) {
  return request({
    url: `/reviews/user/${userId}`,
    method: 'get'
  })
}

export function getOrderReviews(transactionId) {
  return request({
    url: `/reviews/transaction/${transactionId}`,
    method: 'get'
  })
} 
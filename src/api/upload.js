import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/api/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 
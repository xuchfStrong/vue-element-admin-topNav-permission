import request from '@/utils/request'

export function loginByUsername(actAccount, actPassword) {
  const data = {
    actAccount,
    actPassword
  }
  return request({
    url: '/account/login',
    // url: 'https://www.easy-mock.com/mock/5cb4248ad43f930787399771/xinyong/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    // url: 'https://www.easy-mock.com/mock/5cb4248ad43f930787399771/xinyong/login/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    // url: 'https://www.easy-mock.com/mock/5cb4248ad43f930787399771/xinyong/user/info',
    method: 'get',
    params: { 'access-token': token }
  })
}


import request from '@/utils/request'

// 服务管理
export function getServiceGrid(params) {
  return request({
    url: '/service/grid',
    method: 'get',
    params
  })
}

export function getServiceList(params) {
  return request({
    url: '/service/list',
    method: 'get',
    params
  })
}

export function changeServiceStatus(data) {
  return request({
    url: '/service/active',
    method: 'post',
    data
  })
}

// 角色管理
export function getMenuList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function getResourceList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params
  })
}

export function changeRoleStatus(data) {
  return request({
    url: '/role/active',
    method: 'post',
    data
  })
}

export function getRoleGrid(params) {
  return request({
    url: '/role/grid',
    method: 'get',
    params
  })
}

export function getRoleList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/role/editRole',
    method: 'post',
    data
  })
}

// 账户管理
export function getAccountGrid(params) {
  return request({
    url: '/account/grid',
    method: 'get',
    params
  })
}

export function changeAccountStatus(data) {
  return request({
    url: '/account/active',
    method: 'post',
    data
  })
}

export function resetPwd(data) {
  return request({
    url: '/account/resetAccountPassword',
    method: 'post',
    data
  })
}

export function addAccount(data) {
  return request({
    url: '/account/addAccount',
    method: 'post',
    data
  })
}

export function editAccount(data) {
  return request({
    url: '/account/editAccount',
    method: 'post',
    data
  })
}

export function deleteAccount(data) {
  return request({
    url: '/account/delete',
    method: 'post',
    data
  })
}


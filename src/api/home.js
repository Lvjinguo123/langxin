import request from '@/utils/request'
import { microService1, microService2 } from '@/utils/index'
// 根据业务模块命名，和 /views/* 一一对应

export function fakeUser(params) {
  // 创建用户
  return request({
    url: `${microService1}/api/user?${params}`, // 通过 /config/index.js 中 proxyTable 代理转发请求
    method: 'POST',
    data: params
  })
}
export function queryUser(params) {
  // 查询用户
  return request({
    url: `/api/user?${params}`,
    method: 'get'
  })
}
export function modifyUser(params) {
  // 修改用户
  return request({
    url: `/api/user?${params}`,
    method: 'patch'
  })
}
export function removeUser(params) {
  // 删除用户
  return request({
    url: `/api/user?${params}`,
    method: 'delete'
  })
}

export function getRole (params) {
  // 获取角色
  return request({
    url: `/apk/pmd?${params}`,
    method: 'get'
  })
}

export function switchedRoles (params) {
  // 查询用户
  return request({
    url: `/apk/pmdone?${params}`,
    method: 'get'
  })
}

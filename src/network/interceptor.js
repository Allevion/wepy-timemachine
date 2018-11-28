/**
 * request 拦截器
 * 可以全局拦截请求参数
 */
import objectUtils from '../utils/objectUtils'

export function request(params) {
  return params
}

/**
 * response 拦截器
 * 可以全局拦截请求返回结果
 */
export function response(res) {
  if (res.statusCode === 200) {
    res = res.data
    if (!objectUtils.isEmpty(res.code)) { // 最好不要用code,容易跟其他第三方接口冲突
      if (res.code === '00000000') {
        return res.result
      } else {
        return Promise.reject(res)
      }
    } else {
      return res
    }
  } else {
    return Promise.reject(res)
  }
}

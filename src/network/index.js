import wepy from 'wepy'
const VERSION = '6.0.0'
// MD5加盐
const MD5_SALT = 'keymmmoneyIOSDevelop20150616'
const md5 = require('md5')
const Base64 = require('js-base64').Base64

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
class Request {
  _header = {
    token: null
  }
  _baseUrl = null

  interceptors = {
    request: null,
    response: null
  }

  constructor() {
    const token = wx.getStorageSync('token')
    if (token) {
      this._header.token = token
    }
  }

  request(data) {
    const { url, method, header, params } = this.interceptors.request ? this.interceptors.request(data) : data
    console.debug(method + url)
    console.debug(params)

    const url2 = (this._baseUrl || '') + url
    // 参数处理
    let service = ''
    if (url.indexOf('/my/') !== -1) {
      service = url.replace('.htm', '').substring(url.indexOf('/my/'))
    }
    if (url2.indexOf('/') !== -1) {
      const pos = url2.lastIndexOf('/')
      if (url2.indexOf('.htm') === (url2.length - 4)) {
        service = url2.replace('.htm', '').substring(pos + 1)
      } else if (url2.indexOf('.htm') === (url2.length - 5)) {
        service = url2.replace('.html', '').substring(pos + 1)
      }
    }
    const paramsFinal = {
      ...{
        signType: 'MD5',
        service: service
      },
      ...params
    }
    // if (typeof (params.unionid) !== 'undefined') {
    //   console.log('params.unionid需要RSA加密')
    //   var encryptRes = await cloud.callFunction({
    //     name: "encrypt",
    //     data: {
    //       password: params.unionid
    //     }
    //   })
    //   var unionidE = encryptRes.result
    //   console.log("unionidE: " + unionidE);
    //   params['unionid'] = unionidE
    // }
    // if (typeof (params) !== 'undefined') {
    //   for (const key of Object.keys(params).sort()) {
    //     paramsFinal[key] = encodeURI(params[key])
    //   }
    // }
    let signStr = ''
    for (const key of Object.keys(paramsFinal).sort()) {
      // console.log(key, paramsFinal[key])
      // paramsFinal[key] = paramsFinal[key].replace(/\+/g, '-').replace(/=/g, '-').replace(/\//g, '_')
      signStr = signStr + key
      signStr = signStr + paramsFinal[key]
    }
    // console.log('signStr: ' + signStr)
    // step2:字符串加盐并获取MD5值
    signStr = signStr + MD5_SALT
    const sign = md5(signStr)
    // console.log('sign: ' + sign)
    // step3:加上sign并给所有参数的值base64处理
    paramsFinal['sign'] = sign
    for (const key of Object.keys(paramsFinal)) {
      // console.log('key: ' + key)
      // console.log('paramsFinal[key]: ' + paramsFinal[key])
      paramsFinal[key] = encodeURIComponent(paramsFinal[key])
      paramsFinal[key] = Base64.encode((paramsFinal[key]))

      // console.log('paramsFinal[key]: ' + paramsFinal[key])
    }
    console.log(paramsFinal)
    return wepy.request({
      url: url2,
      method: method || METHOD.GET,
      data: paramsFinal,
      header: {
        ...{
          'content-type': 'application/x-www-form-urlencoded',
          'x-client-version': VERSION,
          'x-client-bundle-id': 'com.mmmoney.app',
        },
        ...this._header,
        ...header
      }
    }).then(res => this.interceptors.response ? this.interceptors.response(res) : res)
      .then(res => this.checkBase64(res))
      .then(res => {
        wx.hideLoading()
        return this.checkJsonResult(res)
      })
      .catch(e => {
        wx.hideLoading()
        return Promise.reject(e)
      })
  }

  get(url, params, header) {
    return this.request({ url, method: METHOD.GET, header, params })
  }
  post(url, params, header) {
    return this.request({ url, method: METHOD.POST, header, params })
  }
  put(url, params, header) {
    return this.request({ url, method: METHOD.PUT, header, params })
  }
  delete(url, params, header) {
    return this.request({ url, method: METHOD.DELETE, header, params })
  }

  checkStatus(response) {
    if (response && response.status === 200) {
      return response
    } else {
      return Promise.reject({code: '99999999', msg: '网络异常'})
    }
  }

  checkBase64(response) {
    // console.log(response)
    return Base64.decode(response.responseParameter)
  }

  checkJsonResult(response) {
    try {
      console.log(response)
      const data = JSON.parse(response)
      if (data.code === '00000000') {
        return data.result
      } else if (data.code === '1010') {
        return Promise.reject({code: '1010', msg: '未登录'})
      } else {
        return Promise.reject({code: data.code, msg: data.message})
      }
    } catch (e) {
      return Promise.reject({code: '99999999', msg: '网络异常'})
    }
  }

  token(token) {
    this._header.token = token
    return this
  }
  header(header) {
    this._header = header
    return this
  }
  baseUrl(baseUrl) {
    this._baseUrl = baseUrl
    return this
  }
  interceptor(request, response) {
    if (typeof request === 'function') {
      this.interceptors.request = request
    }
    if (typeof request === 'function') {
      this.interceptors.response = response
    }
    return this
  }
}
export default new Request()

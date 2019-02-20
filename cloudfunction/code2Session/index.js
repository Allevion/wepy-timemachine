// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init({
  env: 'release-b11253'
})
const db = cloud.database()
const SECRET = '4ff72be2edbfe1900efcd35d661696c9'
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  const wxContext = cloud.getWXContext()
  const res = await rp('https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=' + wxContext.APPID + '&secret=' + SECRET + '&js_code=' + event.code)
  console.log(res)
  const data = JSON.parse(res)
  await db.collection('user').where({
    'openid': wxContext.OPENID
  }).remove()
  await db.collection('user').add({
    data: {
      'unionid': data.unionid,
      'openid': data.openid,
      'session_key': data.session_key,
      'create_time': new Date()
    }
  })
  const res2 = await cloud.callFunction({
    name: 'encrypt',
    data: {
      data: data.unionid,
    }
  })
  return {
    'unionid': res2.result,
    'openid': data.openid
  }
}

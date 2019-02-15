// 公钥
const RSA_PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQXfNnQb4b/DOKIu272yiBfoD2R7ri7EsPiYglbT/lpojmd1Stob2tTm5ygykv3200jLQo8ueC76zoxn3N8UZDa0g0ynocDp4n9qffgh5pgg7Q1NGjlZuiAedp4QfuDKefUUBgVYpYOyz8mZaizwzKZMfeV2Q/8tvnf60CvcxgVQIDAQAB'
// 云函数入口文件
const cloud = require('wx-server-sdk')
// RSA
const NodeRSA = require('node-rsa')
cloud.init({
  env: 'release-b11253'
})

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('开始加密,event.password: ' + event.data)
  try {
    const clientKey = new NodeRSA(RSA_PUBLIC_KEY, 'public')
    clientKey.setOptions({
      encryptionScheme: 'pkcs1'
    })
    const passwordE = clientKey.encrypt(event.data, 'hex')

    console.log('加密成功,passwordE: ' + passwordE)
    return passwordE
  } catch (e) {
    console.log('加密失败: ' + e)
    return ''
  }
}

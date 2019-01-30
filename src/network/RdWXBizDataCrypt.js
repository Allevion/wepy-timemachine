/**
 * Created by rd on 2017/5/4.
 */
// 引入CryptoJS
const Crypto = require('./cryptojs.js').Crypto

function RdWXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

RdWXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  const encryptedData2 = Crypto.util.base64ToBytes(encryptedData)
  const key = Crypto.util.base64ToBytes(this.sessionKey)
  const iv2 = Crypto.util.base64ToBytes(iv)

  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  const mode = new Crypto.mode.CBC(Crypto.pad.pkcs7)
  let decryptResult = ''
  try {
    // 解密
    const bytes = Crypto.AES.decrypt(encryptedData2, key, {
      asBpytes: true,
      iv: iv2,
      mode: mode
    })
    console.log(bytes)
    decryptResult = JSON.parse(bytes)
  } catch (err) {
    console.log(err)
  }
  if (!decryptResult && !decryptResult.watermark && decryptResult.watermark.appid !== this.appId) {
    console.log('')
  }

  return decryptResult
}

module.exports = RdWXBizDataCrypt

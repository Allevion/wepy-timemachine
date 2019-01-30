
const RSA = require('./wx_rsa.js')
const RSA_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQXfNnQb4b/DOKIu272yiBfoD2\n' +
  'R7ri7EsPiYglbT/lpojmd1Stob2tTm5ygykv3200jLQo8ueC76zoxn3N8UZDa0g0\n' +
  'ynocDp4n9qffgh5pgg7Q1NGjlZuiAedp4QfuDKefUUBgVYpYOyz8mZaizwzKZMfe\n' +
  'V2Q/8tvnf60CvcxgVQIDAQAB\n' +
  '-----END PUBLIC KEY-----'
let encryptRSA = new RSA.RSAKey()
encryptRSA = RSA.KEYUTIL.getKey(RSA_PUBLIC_KEY)

const RSAUtil = {
  encrypt(s) {
    return encryptRSA.encrypt(s)
  }

}
exports.default = RSAUtil

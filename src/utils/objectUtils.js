
export default {
  name: 'utils',
  isString (o) { // 是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  },
  isNumber (o) { // 是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  },
  isObj (o) { // 是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  },
  isArray (o) { // 是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  },
  isDate (o) { // 是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  },
  isBoolean (o) { // 是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  },
  isFunction (o) { // 是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  },
  isNull (o) { // 是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  },
  isUndefined (o) { // 是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  },
  isFalse (o) {
    if (o === '' || o === undefined || o === null || o === 'null' || o === 'undefined' || o === 0 || o === false || isNaN(o)) return true
    return false
  },
  isTrue (o) {
    return !this.isFalse(o)
  },
  isEmpty(data) {
    if (data === '' || data === undefined || data === null) {
      return true
    } else {
      try {
        return JSON.stringify(data) === '{}'
      } catch (e) {
        console.log(e)
        return false
      }
    }
  },
}

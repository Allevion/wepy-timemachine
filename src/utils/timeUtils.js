
export default {
  name: 'utils',
  padLeftZero(str) {
    return ('00' + str).substr(str.length)
  },
  formatDate(date, fmt) {
    // const date = new Date(datetime)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  stringToDate(dateStr, separator) {
    if (!separator) {
      separator = '-'
    }
    const dateArr = dateStr.split(separator)
    const year = parseInt(dateArr[0])
    let month
    // 处理月份为04这样的情况
    if (dateArr[1].indexOf('0') === 0) {
      month = parseInt(dateArr[1].substring(1))
    } else {
      month = parseInt(dateArr[1])
    }
    let day
    if (dateArr.length > 2) {
      day = parseInt(dateArr[2])
    } else {
      day = 1
    }
    const date = new Date(year, month - 1, day)
    return date
  },
}

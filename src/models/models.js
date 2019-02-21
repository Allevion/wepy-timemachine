import objectUtils from '../utils/objectUtils'

export class BaseBean {
  constructor(data) {
    this.init()
    this.paresData(data)
  }

  init() {

  }

  paresData(data) {
    if (!objectUtils.isEmpty(data)) {
      Object.assign(this, data)
    }
  }
}

/*
* 1.不定义变量，变量会在构造构造后初始化，会覆盖
* 2.由于组件数据需要绑定变量，所以不用函数封装返回数据
* */
export class PageListBean {
  init() {
    this.pager = {isEnd: false, pageIndex: Number(0)}
    this.listData = []
  }

  getNextIndex() {
    this.pager.pageIndex = Number(this.pager.pageIndex) + 1
    return Number(this.pager.pageIndex)
  }
}

export class UserBean extends BaseBean {
  id;
  name;
  headimg;
}

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
export class PageListBean extends BaseBean {
  init() {
    this.page = {finished: false, index: -1}
    this.listData = []
  }

  getNextIndex() {
    return Number(this.page.index) + 1
  }

  appendData(pageListBean) {
    this.listData = this.listData.concat(pageListBean.listData)
    this.page.finished = !pageListBean.page.hasMore
    this.page.index = pageListBean.page.index
  }
}

export class TimeLineListBean extends PageListBean {

}

export class UserBean extends BaseBean {
  id;
  name;
  headimg;
}

export class CommentBean extends BaseBean {
  id = '';
  user = new UserBean();
  content = '';
  createTime = '';
  like = 0;
}


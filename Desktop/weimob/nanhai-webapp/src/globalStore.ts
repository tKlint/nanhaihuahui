import Taro from '@tarojs/taro'
import { observable } from 'mobx';
import { routeNames } from './routes';

export const observableValue = {
  user: { userName: 'userName', userId: 'xxxxxx' },

  counter: 0,
  list: [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }],
  listUpdate: 0,

  counterStore() {
    this.counter++;
  },
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  },
  async toLogin(toRecord?: boolean) {
    Taro.removeStorage({ key: 'loginToRedirect' })
    const pages = Taro.getCurrentPages() // 获取加载的页面
    const currentPage = pages[pages.length - 1]
    const pageUrl = process.env.TARO_ENV === 'weapp' ? '/' + currentPage!.route : currentPage!.props.location.path
    if (toRecord) {
      const url = pageUrl// 当前页面url
      Taro.setStorage({ key: 'loginToRedirect', data: url })
    }
    if (process.env.TARO_ENV === 'weapp') {
      Taro.navigateTo({ url: routeNames.loginAccredit })
    }
  }
};

const counterStore = observable(observableValue);
export default counterStore;

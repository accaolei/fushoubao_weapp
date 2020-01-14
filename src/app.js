import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await';
import Index from './pages/index/index'
import { Provider } from '@tarojs/redux';
import dva from './utils/dav';
import models from './models';
import 'taro-ui/dist/style/index.scss';

import './app.less'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
})

const onError = (e) => {
  console.error(e.message)
}

dvaApp._plugin.hooks.onError.push(onError)

const store = dvaApp.getStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  config = {
    pages: [
      'pages/kind/index',
      'pages/cart/index',
      'pages/my/index',
      'pages/index/index',
      'pages/order/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '附售宝',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#477ee6',
      color: '#444444',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './images/home.png',
        selectedIconPath: './images/home-2.png',
      }, {
        pagePath: 'pages/kind/index',
        text: '分类',
        iconPath: './images/kind.png',
        selectedIconPath: './images/kind-2.png'
      }, {
        pagePath: 'pages/order/index',
        text: '订单',
        iconPath: './images/order.png',
        selectedIconPath: './images/order-2.png'
      }, {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './images/my.png',
        selectedIconPath: './images/my-2.png'
      }]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

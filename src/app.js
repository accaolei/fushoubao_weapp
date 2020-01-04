import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import { Provider } from '@tarojs/redux';
import dva from './utils/dav';
import models from './models';

import './app.less'

const davApp = dva.createApp({
  initialState: {},
  models: models,
})

const onError = (e) => {
  console.error(e.message)
}

davApp._plugin.hooks.onError.push(onError)

const store = dvaApp.getStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '附售宝',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/index.js',
        text: '首页',
        iconPath: './images/homepage.png',
        selectedIconPath: './images/homepage_fill.png'
      }, {
        pagePath: 'pages/kind/index.js',
        text: '分类',
        iconPath: './images/homepage.png',
        selectedIconPath: './images/homepage_fill.png'
      }, {
        pagePath: 'pages/cart/index.js',
        text: '购物车',
        iconPath: './images/homepage.png',
        selectedIconPath: './images/homepage_fill.png'
      }, {
        pagePath: 'pages/my/index.js',
        text: '我的',
        iconPath: './images/homepage.png',
        selectedIconPath: './images/homepage_fill.png'
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

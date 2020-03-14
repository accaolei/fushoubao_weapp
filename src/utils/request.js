import { baseUrl, noConsole } from '../config'
import Taro from '@tarojs/taro'

const request_data = {

}

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()} [ M=${options.url}] P=${JSON.stringify(
        options.data
      )}`
    )
  }
  const token = Taro.getStorageSync('token')
  const unionid = Taro.getStorageSync('unionid')

  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'unionid': `${unionid}`
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        `${new Date().toLocaleString()} [ M=${options.url}] [接口响应]`,
          res.data
      }
      return data;
    } else {
      console.log('错误')
      // throw new Error(`网络请求错误，状态码${statusCode}`)
      if (statusCode == 401) {
        Taro.removeStorageSync('token');
      }
      return null
    }
  }).catch((res) => {
    console.log(JSON.stringify(res))
    Taro.showToast({ title: `${JSON.stringify(res)}`, icon: 'none' })
    // Taro.showToast({ title: '网络连接失败,请稍后再试', icon: 'none' })
  })
}

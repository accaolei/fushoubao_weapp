import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"

import './index.less'
export default class My extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  state = {}

  componentWillMount() { }
  componentDidMount() { }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }
  render() {
    return (
      <View>
        <View className='container user_info'>
          <View className='user_name'>136****4075</View>
          <View className="yu">在忙，也要记得吃饭~</View>
        </View>
        <View className="my_items">
          <AtList hasBorder={false}>
            <AtListItem title='我的订单' arrow='right'></AtListItem>
            <AtListItem title='投诉建议' arrow='right'></AtListItem>
          </AtList>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui";
import loginStatus from '../../components/LoginStatus/index';
import { connect } from '@tarojs/redux';

import './index.less'

@connect(({ user }) => ({
  user
}))
@loginStatus()
export default class My extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  state = {}

  componentWillMount() { }
  componentDidMount() {
    console.log(this.props)
    this.props.dispatch({
      type: 'user/getUserInfo',
      payload: {
      }
    })
    let extConfig = Taro.getExtConfigSync()
    console.log(extConfig)
  }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }

  onLogin() {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  render() {
    const { user } = this.props;
    return (
      <View>
        {user.isLogin ?
          <View className='container user_info'>
            <View className='user_name'>{user.user.phone}</View>
            <View className="yu">再忙，也要记得吃饭~</View>
          </View>
          :
          <View className='container user_info'>
            <View className="login" onClick={this.onLogin.bind(this)}>立即登录</View>
          </View>
        }


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

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

  state = {
    mainSwitch: false
  }

  componentWillMount() { }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getUserInfo',
      payload: {
      }
    })
  }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() {
    // this.getSttingInfo()
  }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }



  setSubscribeHander() {
    let extConfig = Taro.getExtConfigSync()
    Taro.requestSubscribeMessage({
      tmplIds: extConfig.msgIds
    }).then(function (res) { console.log(res) }).catch(
      (err) => { console.log(err) }
    )
  }

  onLogin() {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  onComplaints() {
    const { user } = this.props;
    if (user.isLogin) {
      Taro.navigateTo({
        url: '/pages/my/complaints/index'
      })
    } else {
      this.loginAltert()
    }
  }

  loginAltert() {
    Taro.showModal({
      title: '提示',
      content: '你还未登录,进入登录页面登录？',
      confirmText: '去登录',
      success: function (res) {
        if (res.confirm) {
          Taro.navigateTo({
            'url': '/pages/login/index?back=true'
          })
        } else {
          console.log('取消')
        }
      }
    })
  }

  render() {
    const { user } = this.props;
    const { mainSwitch } = this.state;
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
            {/* <AtListItem
              title='订阅消息通知' note='订单状态变更通知'
              onClick={this.setSubscribeHander.bind(this)}
              extraText={mainSwitch ? '已订阅' : ''} arrow='right'>
            </AtListItem> */}
            <AtListItem title='投诉建议' onClick={this.onComplaints.bind(this)} note='功能和服务的建议和投诉' arrow='right'></AtListItem>
          </AtList>
        </View>
      </View>
    );
  }
}

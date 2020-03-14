import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtInput, AtForm, AtButton } from 'taro-ui';
import { wxV, wxVAll } from './utils'
import { connect } from '@tarojs/redux';

import './index.less'

@connect(({ user, loading }) => ({
    user,
    submitting: loading.effects['user/login']
}))
export default class Index extends Component {

    config = {
        navigationBarTitleText: '登录'
    }

    state = {
        phone: '',
        code: '',

    }

    componentWillMount() { }
    componentDidMount() {
        const { back } = this.$router.params
        this.setState({
            back: back
        })
        console.log(this.state)
        console.log(back)
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }


    onPhoneChange(value) {
        this.setState({
            phone: value
        })
    }
    onCodeChange(value) {
        this.setState({
            code: value
        })

    }

    onSendSMS() {
        const data = {
            phone: this.state.phone
        }
        if (!wxV.checkForm(data)) {
            Taro.showModal({
                content: wxV.errorList[0].msg,
                showCancel: false,
            })
            return false
        }
        const client_id = Taro.getStorageSync('session_key')
        this.props.dispatch({
            type: 'user/sendCode',
            payload: {
                ...data,
                client_id
            }
        })
    }
    onGetUserInfo(e) {
        const data = {
            phone: this.state.phone,
            code: this.state.code
        }
        if (!wxVAll.checkForm(data)) {
            Taro.showModal({
                content: wxVAll.errorList[0].msg,
                showCancel: false,
            })
            return false
        }
        console.log(e.detail)
        const { errMsg, encryptedData, iv, signature } = e.detail;
        if (errMsg == 'getUserInfo:ok') {
            const { dispatch } = this.props;
            console.log(this)
            const session_key = Taro.getStorageSync('session_key')

            let extConfig = Taro.getExtConfigSync()
            console.log(extConfig)
            let post_data = {
                ...data,
                js_code: Taro.getStorageSync('js_code'),
                sid: extConfig.id
            }
            console.log(post_data)
            dispatch({
                type: 'user/login',
                payload: {
                    ...post_data,
                    back: this.state.back
                }
            })
        } else if (errMsg == 'getUserInfo:fail auth deny') {
            Taro.showToast({
                title: '微信信息获取失败',
                icon: 'none'
            })
        }
    }
    render() {
        const { user } = this.props
        console.log(this.state)
        return (
            <View>
                <View className="title">手机号登录</View>

                <View className="form">
                    <AtInput placeholder="手机号" onChange={this.onPhoneChange.bind(this)}></AtInput>
                    <AtInput placeholder="验证码" onChange={this.onCodeChange.bind(this)}>
                        {
                            !this.props.user.sending ? <Text className="vsms" onClick={this.onSendSMS.bind(this)}>发送验证码</Text>
                                : <Text className="vsms" >{this.props.user.sms_message}</Text>
                        }
                    </AtInput>
                </View>
                <View className="submit">
                    <AtButton type="primary" openType="getUserInfo" onGetUserInfo={this.onGetUserInfo.bind(this)}> 登录</AtButton>
                </View>
            </View >
        );
    }
}

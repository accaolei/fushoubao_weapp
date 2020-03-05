import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { addressValidate } from './utils'
import { connect } from '@tarojs/redux';


import './index.less'

@connect(({ user }) => ({
    user
}))
export default class Index extends Component {

    config = {
        navigationBarTitleText: '新增地址'
    }

    state = {
        username: '',
        address: '',
        phone: ''
    }

    componentWillMount() { }
    componentDidMount() { }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
    onSave() {
        const data = {
            name: this.state.username,
            address: this.state.address,
            phone: this.state.phone
        }
        if (!addressValidate.checkForm(data)) {
            Taro.showModal({
                content: addressValidate.errorList[0].msg,
                showCancel: false,
            })
            return false
        }
        // todo: 保存服务器端
        console.log('保存地址')
        this.props.dispatch({
            type: 'user/createAddress',
            payload: {
                ...data
            }
        })
    }
    userNameHandler(value) {
        this.setState({
            username: value
        })
    }
    addressHandler(value) {
        this.setState({
            address: value
        })
    }
    phoneHandler(value) {
        this.setState({
            phone: value
        })
    }
    render() {
        return (
            <View>
                <View className="form">
                    <AtInput
                        name="username"
                        title='收件人'
                        type='text'
                        placeholder='收货人姓名'
                        onChange={this.userNameHandler.bind(this)}
                    />
                    <AtInput
                        name="phone"
                        title='手机号码'
                        type='phone'
                        placeholder='配送人员联系您的电话'
                        onChange={this.phoneHandler.bind(this)}
                    />
                    <AtInput
                        name="address"
                        title='收货人地址'
                        type='text'
                        placeholder='收货人姓名'
                        onChange={this.addressHandler.bind(this)}
                    />
                </View>
                <View className="add">
                    <AtButton circle type="primary" onClick={this.onSave.bind(this)}>保存</AtButton>
                </View>
            </View>
        );
    }
}

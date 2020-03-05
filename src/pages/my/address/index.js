import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtDivider, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';

import './index.less'

@connect(({ user }) => ({
    user
}))
export default class Index extends Component {

    config = {
        navigationBarTitleText: '确认订单'
    }

    state = {}

    componentWillMount() { }
    componentDidMount() {
        this.props.dispatch({
            type: 'user/getAddress',
            payload: {}
        })
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }

    toCreate() {
        Taro.navigateTo({
            url: '/pages/my/address/create'
        })
    }
    onSelect(addr) {
        let { address } = this.props.user;
        address.map((item) => {
            if (item.id == addr.id) {
                item.selected = true
            }
            return item
        })

        this.props.dispatch({
            type: 'user/save',
            payload: {
                'address': this.props.user.address,
                'addressSelected': addr
            }
        })
        console.log(this.props.user)
        Taro.navigateBack()
    }

    deleteAddress(id) {
        this.props.dispatch({
            type: 'user/deleteAddress',
            payload: {
                'id': id
            }
        })
    }
    render() {
        const { address } = this.props.user;
        return (
            <View>
                <View className="address_list">
                    {address.map((item) => <View className="item" >
                        <View className="content" onClick={() => { this.onSelect(item) }}>
                            <View className="phone">{item.name} {item.phone}</View>
                            <View className="body">{item.address}</View>
                        </View>
                        <View className="extend">
                            <View className="i">
                                <View className='at-icon at-icon-edit'></View>
                                <Text className="label">编辑</Text>
                            </View>
                            {!item.selected ? < View className="i" onClick={() => { this.deleteAddress(item.id) }}>
                                <View className='at-icon at-icon-trash'></View>
                                <Text className="label">删除</Text>
                            </View> : ''}
                        </View>
                        <AtDivider height="40" lineColor="#e9e9e9"></AtDivider>
                    </View>)}

                </View>
                <View className="add">
                    <AtButton circle type="primary" onClick={this.toCreate.bind(this)}>新增地址</AtButton>
                </View>
            </View>
        );
    }
}

import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';


import './index.less'
import { AtIcon, AtDivider } from 'taro-ui';

export default class Index extends Component {

    config = {
        navigationBarTitleText: '确认订单'
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
                <View className="address">
                    <View className="icon">
                        <AtIcon value="map-pin" size="25" />
                    </View>
                    <View className="content">
                        <View className="user_info">
                            <View className="name">曹磊</View>
                            <View className="phone">136****4075</View>
                        </View>
                        <View className="addr">
                            北京市通州区北京市通州区北京市通州区北京市通州区北京市通州区北京市通州区
                        </View>
                    </View>
                    <View>
                        <AtIcon value="chevron-right" size="18" color="#919191" />
                    </View>
                </View>
                <AtDivider height="50" />
                <View>
                    商品列表
                </View>
                <View>
                    费用明细
                </View>
                <View className='bar_bottom'>
                    <View className="content">
                        <View className="total_info">
                            <View className='label'>{`实付款:`}</View>
                            <View>￥12.00</View>
                        </View>
                        <View className="paying" onClick={this.goCheckOut.bind(this)}>提交订单</View>
                    </View>
                </View>
            </View>
        );
    }
}


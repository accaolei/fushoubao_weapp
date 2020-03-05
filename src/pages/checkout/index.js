import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './index.less'
import { AtIcon, AtDivider, AtList, AtListItem } from 'taro-ui';


@connect(({ shop, user }) => ({
    shop, user
}))
export default class Index extends Component {

    config = {
        navigationBarTitleText: '确认订单'
    }

    state = {
        total: 0
    }

    componentWillMount() { }
    componentDidMount() {
        const { shop } = this.props;
        let total = 0;
        shop.cartItems.map((item) => {
            total += item.quantity * item.price
        })
        this.setState({
            total: total
        })
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
    goCheckOut() {
        const { shop } = this.props;
        const { cartItems } = shop;

    }
    chioseAddress() {
        Taro.navigateTo({
            url: '/pages/my/address/index'
        })
    }
    render() {

        const { shop } = this.props;
        const { addressSelected } = this.props.user;
        return (
            <View>
                {addressSelected ?
                    <View className="address">
                        <View className="icon">
                            <AtIcon value="map-pin" size="25" />
                        </View>
                        <View className="content" onClick={this.chioseAddress.bind(this)}>
                            <View className="user_info">
                                <View className="name">{addressSelected.name}</View>
                                <View className="phone">{addressSelected.phone}</View>
                            </View>
                            <View className="addr">
                                {addressSelected.address}
                            </View>
                        </View>
                        <View>
                            <AtIcon value="chevron-right" size="18" color="#919191" />
                        </View>
                    </View>
                    :
                    <View className="address">
                        <View className="icon">
                            <AtIcon value="map-pin" size="25" />
                        </View>
                        <View className="content" onClick={this.chioseAddress.bind(this)}>
                            请选择地址
                        </View>
                        <View>
                            <AtIcon value="chevron-right" size="18" color="#919191" />
                        </View>
                    </View>
                }
                <AtDivider height="50" />
                <View className="products">
                    <View className="items">
                        {shop.cartItems.slice(0, 3).map((item) =>
                            <View>
                                <Image
                                    className='img'
                                    src={item.imgs[0]}
                                />
                            </View>
                        )}
                    </View>
                    <View className="total">共{shop.cartCount}种</View>

                </View>
                {/* <AtDivider></AtDivider> */}
                <View>
                    <AtList hasBorder={false}>
                        <AtListItem title='商品总额' extraText="￥85.0" hasBorder={false}></AtListItem>
                        <AtListItem title='运费' extraText="￥0" hasBorder={false}></AtListItem>
                    </AtList>
                </View>
                <View className='bar_bottom'>
                    <View className="content">
                        <View className="total_info">
                            <View className='label'>{`实付款:`}</View>
                            <View>￥{this.state.total}</View>
                        </View>
                        <View className="paying" onClick={this.goCheckOut.bind(this)}>提交订单</View>
                    </View>
                </View>
            </View>
        );
    }
}


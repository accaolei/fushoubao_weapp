import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less'
import { AtIcon, AtButton } from 'taro-ui';

@connect(({ shop }) => ({
    shop
}))
export default class OrderDetail extends Component {

    config = {
        navigationBarTitleText: '订单详情'
    }

    state = {}

    componentWillMount() { }
    componentDidMount() {
        const { id, clear } = this.$router.params;
        this.props.dispatch({
            type: 'shop/orderDetail',
            payload: { id: id }
        })
        if (clear) {
            this.props.dispatch({
                type: 'shop/clearCart',
                payload: {}
            })
        }
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() {
        console.log('退出')
        Taro.switchTab({
            url: '/pages/order/index'
        })
    }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
    render() {
        const { orderDetail } = this.props.shop
        console.log(orderDetail)
        return (
            <View >
                <View className="order_status">
                    <View className="content">
                        <View className="header">
                            <AtIcon value="check-circle" color='#404040'></AtIcon>
                            <View className="status">
                                {`订单${orderDetail.status}`}
                            </View>
                        </View>
                        <View className="detail">
                            {orderDetail.status == '待支付' ? `请尽快支付，10分钟后将自动取消。` : ''}
                            {orderDetail.status == '待发货' ? `备货中...` : ''}
                            {orderDetail.status == '待收货' ? `物流配送中，请您保持电话畅通。` : ''}
                        </View>
                    </View>
                    <View className="active">
                        <AtIcon value="chevron-right" color='#404040'></AtIcon>
                    </View>
                </View>
                <View className="address">
                    <View className="icon">
                        <AtIcon value="map-pin" size="20" />
                    </View>
                    <View className="content" >
                        <View className="user_info">
                            <View className="name">{orderDetail.receiver}</View>
                            <View className="phone">{orderDetail.phone}</View>
                        </View>
                        <View className="addr">
                            {orderDetail.address}
                        </View>
                    </View>
                </View>
                <View className="container products">
                    {orderDetail.products.map((item) =>
                        <View className="product">
                            <Image
                                className='img'
                                src={item.cover_img}
                            />
                            <View className="content">

                                <View className="body">
                                    <View className="name">{item.name}</View>
                                </View>
                                <View className="price_unit">
                                    <View className="price">{`￥${item.price}`}</View>
                                    <View className="unit">/{item.unit}</View>
                                </View>
                            </View>
                            <View className="quantity">x{item.quantity}</View>
                        </View>)
                    }

                </View>
                <View className="container order_pay_info">
                    <View className="item">
                        <View className="label">订单编号</View>
                        <View className="value">{orderDetail.order_num}</View>
                    </View>
                    <View className="item">
                        <View className="label">下单时间</View>
                        <View className="value">{orderDetail.create_at}</View>
                    </View>
                    <View className="item">
                        <View className="label">支付方式</View>
                        <View className="value">微信支付</View>
                    </View>
                </View>
                <View className="container">
                    <View className="order_total">
                        <View className="label">商品总额</View>
                        <View className="value">{`￥ ${orderDetail.total}`}</View>
                    </View>
                </View>
                <View className="container">
                    <View className="pay_total">
                        <View className="label">实付款:</View>
                        <View className="total">
                            <View className="unit">￥</View>
                            <View className="value">{orderDetail.total}</View>
                        </View>
                    </View>
                </View>

                <View className="actions">
                    {/* <View className="item">
                        <AtButton circle size="small">再次购买</AtButton>
                    </View> */}

                    <View className="item">
                        <AtButton circle size="small">删除订单</AtButton>
                    </View>
                </View>
            </View>
        );
    }
}

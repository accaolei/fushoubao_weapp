import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtTabs, AtTabsPane, AtIcon, AtAvatar, AtDivider } from 'taro-ui';
import { connect } from '@tarojs/redux';
import loginStatus from '../../components/LoginStatus/index';
import './index.less'


@connect(({ user }) => ({
    user
}))
@loginStatus()
export default class Cart extends Component {

    config = {
        navigationBarTitleText: '订单'
    }

    state = {
        current: 0,
    }

    componentWillMount() { }
    componentDidMount() {
        let params = this.$router.params;
        let status = params.type ? params.type : this.state.current
        if (status === 0) { status = '1,2,3,4,5,6,7,15' }
        if (status === 2) { status = '2,3' }
        let data = {
            status
        }
        this.getOrder(data)
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() {
        console.log('adfasd')
        let status = this.state.current
        if (status === 0) { status = '1,2,3,4,5,6,7,15' }
        if (status === 2) { status = '2,3' }
        let data = {
            status
        }
        this.getOrder(data)
    }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
    handlerClick(value) {
        this.setState({
            current: value
        })
        let status = value;
        if (value === 0) { status = '1,2,3,4,5,6,7,15' }
        if (status === 2) { status = '2,3' }
        this.getOrder({ 'status': status });
    }
    getOrder(data) {
        this.props.dispatch({
            type: 'user/getOrderList',
            payload: {
                ...data
            }
        })
    }

    payOrder(item) {
        console.log(item)
        this.props.dispatch({
            type: 'shop/payOrder',
            payload: {
                id: item.id
            }
        })
    }

    deleteHandler(id) {
        let status = this.state.current
        if (status === 0) { status = '1,2,3,4,5,6,7,15' }
        if (status === 2) { status = '2,3' }
        let data = {
            id,
            status
        }
        this.props.dispatch({
            type: 'user/deleteOrder',
            payload: {
                ...data
            }
        })
    }

    goDetail(id) {
        Taro.navigateTo({
            url: `/pages/order/detail/index?id=${id}`,
        })
    }
    setSubscribeHander() {
        let extConfig = Taro.getExtConfigSync()
        Taro.requestSubscribeMessage({
            tmplIds: extConfig.msgIds
        }).then(function (res) { console.log(res) }).catch(
            (err) => { console.log(err) }
        )
    }

    render() {
        const tabList = [{ title: '全部' }, { title: '待支付' }, { title: '待发货' }, { title: '待收货' }]
        let { orders, isLogin } = this.props.user
        if (isLogin === false) {
            return (
                <View className="unlogin">
                    <View className="active">
                        <View className="desc">你还未登录，请先登录</View>
                        <AtButton onClick={() => {
                            Taro.navigateTo({
                                'url': '/pages/login/index?back=true'
                            })
                        }} type="primary" >去登录</AtButton>
                    </View>

                </View>
            )
        }
        return (
            <View>
                <AtTabs current={this.state.current} tabList={tabList}
                    onClick={this.handlerClick.bind(this)}
                >
                    <AtTabsPane current={this.state.current} index={0}>
                        {orders.length > 0 ?
                            <View className='orders'>
                                {orders.map((item) =>
                                    <View className='order_item' key={item.id}>
                                        <View className="header">
                                            <View className="order_num">
                                                订单号:{`${item.order_num}`}
                                            </View>
                                            <View className="status">
                                                <View>{item.status}</View>
                                            </View>
                                            <View className="line">|</View>
                                            <View className="delete" onClick={this.deleteHandler.bind(this, item.id)}>
                                                <AtIcon value='trash' size="14"></AtIcon>
                                            </View>
                                        </View>
                                        <View className="content">

                                            <View onClick={this.goDetail.bind(this, item.id)}>
                                                <View className="body">
                                                    <scroll-view scroll-x="true" style="height: 120rpx; width: 540rpx;white-space: nowrap;" class="products">
                                                        {item.products.map((i) => <Image className="p" src={`${i.cover_img}`} lazy-load={true}>

                                                        </Image>)}
                                                    </scroll-view>
                                                    <View className="count">
                                                        {item.products.length}个物品
                                                </View>
                                                </View>
                                                <View className='total'>
                                                    <View className="label">实付款: </View>
                                                    <View className="total_with_unit">
                                                        <View className="unit">￥</View>
                                                        <View className="t">{item.total}</View>
                                                    </View>
                                                </View>
                                            </View>
                                            <AtDivider height="10" lineColor="#f7f7f7"></AtDivider>
                                            <View className="actives">
                                                {/* <View className="item">
                                                    <AtButton circle size="small" onClick={this.setSubscribeHander.bind(this)}>接收此订单通知消息</AtButton>
                                                </View> */}
                                                {item.status == '待支付' ?
                                                    <View className="item">
                                                        <AtButton size="small" type="secondary" circle onClick={this.payOrder.bind(this, item)}>立即支付</AtButton>
                                                    </View> :
                                                    <AtButton size="small" type="secondary" circle onClick={this.goDetail.bind(this, item.id)}>查看详情</AtButton>
                                                }
                                            </View>


                                        </View>
                                    </View>)
                                }
                            </View>
                            :
                            ''
                        }

                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                        {orders.length > 0 ?
                            <View className='orders'>
                                {orders.map((item) =>
                                    <View className='order_item' key={item.id}>
                                        <View className="header">
                                            <View className="order_num">
                                                订单号:{`${item.order_num}`}
                                            </View>
                                            <View className="status">
                                                <View>{item.status}</View>
                                            </View>
                                            <View className="line">|</View>
                                            <View className="delete" onClick={this.deleteHandler.bind(this, item.id)}>
                                                <AtIcon value='trash' size="14"></AtIcon>
                                            </View>
                                        </View>
                                        <View className="content">

                                            <View onClick={this.goDetail.bind(this, item.id)}>
                                                <View className="body">
                                                    <scroll-view scroll-x="true" style="height: 120rpx; width: 540rpx;white-space: nowrap;" class="products">
                                                        {item.products.map((i) => <Image className="p" src={`${i.cover_img}`} lazy-load={true}>

                                                        </Image>)}
                                                    </scroll-view>
                                                    <View className="count">
                                                        {item.products.length}个物品
                                                </View>
                                                </View>
                                                <View className='total'>
                                                    <View className="label">实付款: </View>
                                                    <View className="total_with_unit">
                                                        <View className="unit">￥</View>
                                                        <View className="t">{item.total}</View>
                                                    </View>
                                                </View>
                                            </View>
                                            <AtDivider height="10" lineColor="#f7f7f7"></AtDivider>
                                            <View className="actives">
                                                {item.status == '待支付' ?
                                                    <AtButton size="small" type="secondary" circle onClick={this.payOrder.bind(this, item)}>立即支付</AtButton>
                                                    :
                                                    <AtButton size="small" type="secondary" circle onClick={this.goDetail.bind(this, item.id)}>查看详情</AtButton>
                                                }
                                            </View>


                                        </View>
                                    </View>)
                                }
                            </View>
                            :
                            ''
                        }
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        {orders.length > 0 ?
                            <View className='orders'>
                                {orders.map((item) =>
                                    <View className='order_item' key={item.id}>
                                        <View className="header">
                                            <View className="order_num">
                                                订单号:{`${item.order_num}`}
                                            </View>
                                            <View className="status">
                                                <View>{item.status}</View>
                                            </View>
                                            <View className="line">|</View>
                                            <View className="delete" onClick={this.deleteHandler.bind(this, item.id)}>
                                                <AtIcon value='trash' size="14"></AtIcon>
                                            </View>
                                        </View>
                                        <View className="content">

                                            <View onClick={this.goDetail.bind(this, item.id)}>
                                                <View className="body">
                                                    <scroll-view scroll-x="true" style="height: 120rpx; width: 540rpx;white-space: nowrap;" class="products">
                                                        {item.products.map((i) => <Image className="p" src={`${i.cover_img}`} lazy-load={true}>

                                                        </Image>)}
                                                    </scroll-view>
                                                    <View className="count">
                                                        {item.products.length}个物品
                                                </View>
                                                </View>
                                                <View className='total'>
                                                    <View className="label">实付款: </View>
                                                    <View className="total_with_unit">
                                                        <View className="unit">￥</View>
                                                        <View className="t">{item.total}</View>
                                                    </View>
                                                </View>
                                            </View>
                                            <AtDivider height="10" lineColor="#f7f7f7"></AtDivider>
                                            <View className="actives">
                                                {/* <View className="item">
                                                    <AtButton circle size="small" onClick={this.setSubscribeHander.bind(this)}>接收此订单通知消息</AtButton>
                                                </View> */}
                                                <AtButton size="small" type="secondary" circle onClick={this.goDetail.bind(this, item.id)}>查看详情</AtButton>
                                            </View>


                                        </View>
                                    </View>)
                                }
                            </View>
                            :
                            ''
                        }
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        {orders.length > 0 ?
                            <View className='orders'>
                                {orders.map((item) =>
                                    <View className='order_item' key={item.id}>
                                        <View className="header">
                                            <View className="order_num">
                                                订单号:{`${item.order_num}`}
                                            </View>
                                            <View className="status">
                                                <View>{item.status}</View>
                                            </View>
                                            <View className="line">|</View>
                                            <View className="delete" onClick={this.deleteHandler.bind(this, item.id)}>
                                                <AtIcon value='trash' size="14"></AtIcon>
                                            </View>
                                        </View>
                                        <View className="content">

                                            <View onClick={this.goDetail.bind(this, item.id)}>
                                                <View className="body">
                                                    <scroll-view scroll-x="true" style="height: 120rpx; width: 540rpx;white-space: nowrap;" class="products">
                                                        {item.products.map((i) => <Image className="p" src={`${i.cover_img}`} lazy-load={true}>

                                                        </Image>)}
                                                    </scroll-view>
                                                    <View className="count">
                                                        {item.products.length}个物品
                                                </View>
                                                </View>
                                                <View className='total'>
                                                    <View className="label">实付款: </View>
                                                    <View className="total_with_unit">
                                                        <View className="unit">￥</View>
                                                        <View className="t">{item.total}</View>
                                                    </View>
                                                </View>
                                            </View>
                                            <AtDivider height="10" lineColor="#f7f7f7"></AtDivider>
                                            <View className="actives">
                                                {/* <View className="item">
                                                    <AtButton circle size="small" onClick={this.setSubscribeHander.bind(this)}>接收此订单通知消息</AtButton>
                                                </View> */}
                                                <AtButton size="small" type="secondary" circle onClick={this.goDetail.bind(this, item.id)}>查看详情</AtButton>
                                            </View>


                                        </View>
                                    </View>)
                                }
                            </View>
                            :
                            ''
                        }
                    </AtTabsPane>
                </AtTabs>

            </View>
        );
    }
}

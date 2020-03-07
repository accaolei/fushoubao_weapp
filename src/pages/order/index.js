import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtTabs, AtTabsPane, AtIcon, AtAvatar, AtDivider } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './index.less'


@connect(({ user }) => ({
    user
}))
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
        if (status === 0) { status = '1, 2, 3, 4' }
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
        if (status === 0) { status = '1, 2, 3, 4' }
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
        if (value === 0) { status = '1, 2, 3, 4' }
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

    deleteHandler(id) {
        let status = this.state.current
        if (status === 0) { status = '1, 2, 3, 4' }
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
    render() {
        const tabList = [{ title: '全部' }, { title: '待支付' }, { title: '待配送' }, { title: '待收货' }]
        let { orders } = this.props.user
        console.log(orders)
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

                                            <View className="body">
                                                <scroll-view scroll-x="true" style="height: 120rpx; width: 540rpx;white-space: nowrap;" class="products">
                                                    {item.products.map((i) => <Image className="p" src={`${i.cover_img}`}>

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
                                            <AtDivider height="10" lineColor="#f7f7f7"></AtDivider>
                                            <View className="actives">
                                                {item.status == '待支付' ?
                                                    <AtButton size="small" type="secondary" circle >立即支付</AtButton>
                                                    :
                                                    <AtButton size="small" type="secondary" circle >再次购买</AtButton>
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
                        <View className="no_product">
                            <Image src="https://fushoubao.oss-cn-beijing.aliyuncs.com/icons/icon-%E8%B4%AD%E7%89%A9%E8%BD%A6.png" className='cart_icon'></Image>
                            <View className="desc">你还未选购商品</View>
                            <View className="go">
                                <AtButton type="primary" size="small">去购物</AtButton>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        <View className="no_product">
                            <Image src="https://fushoubao.oss-cn-beijing.aliyuncs.com/icons/icon-%E8%B4%AD%E7%89%A9%E8%BD%A6.png" className='cart_icon'></Image>
                            <View className="desc">你还未选购商品</View>
                            <View className="go">
                                <AtButton type="primary" size="small">去购物</AtButton>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <View className="no_product">
                            <Image src="https://fushoubao.oss-cn-beijing.aliyuncs.com/icons/icon-%E8%B4%AD%E7%89%A9%E8%BD%A6.png" className='cart_icon'></Image>
                            <View className="desc">你还未选购商品</View>
                            <View className="go">
                                <AtButton type="primary" size="small">去购物</AtButton>
                            </View>
                        </View>
                    </AtTabsPane>
                </AtTabs>

            </View>
        );
    }
}

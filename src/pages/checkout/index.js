import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import loginStatus from '../../components/LoginStatus/index';
import './index.less'
import { AtIcon, AtDivider, AtList, AtListItem, AtButton } from 'taro-ui';


@connect(({ shop, user, loading }) => ({
    shop, user, loading
}))
@loginStatus()
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
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() {

    }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }
    goCheckOut() {
        const { shop, user } = this.props;
        const { cartItems } = shop;
        if (user.isLogin === false) {
            this.loginAltert()
            return;
        }
        console.log(shop, cartItems)
        let extConfig = Taro.getExtConfigSync()
        let { addressSelected } = user;
        console.info(addressSelected)
        if (addressSelected === undefined) {
            Taro.showToast({
                title: '请先选择地址',
                icon: 'none'
            })
            return;
        }

        let products = cartItems.map((item) => {
            return {
                product_id: item.id,
                name: item.name,
                unit: item.unit,
                price: item.price,
                cover_img: item.cover,
                quantity: item.quantity
            }
        })
        let data = {
            total: this.state.total,
            shop_id: extConfig.id,
            products: products,
            receiver: addressSelected.name,
            phone: addressSelected.phone,
            address: addressSelected.address,
        }
        this.props.dispatch({
            type: 'shop/creatOrder',
            payload: {
                ...data,
                clear: true
            }
        })

    }

    chioseAddress() {
        const { user } = this.props;
        if (user.isLogin) {
            Taro.navigateTo({
                url: '/pages/my/address/index'
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
        console.log(this.props.loading)
        const loading = this.props.loading.effects['shop/creatOrder']
        const inPayment = this.props.loading.effects['shop/payOrder']
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
                        <AtListItem title='商品总额' extraText={`￥${this.state.total}`} hasBorder={false}></AtListItem>
                        <AtListItem title='运费' extraText="￥0" hasBorder={false}></AtListItem>
                    </AtList>
                </View>
                <View className='bar_bottom'>
                    <View className="content">
                        <View className="total_info">
                            <View className='label'>{`实付款:`}</View>
                            <View>￥{this.state.total}</View>
                        </View>
                        {
                            loading || inPayment ?
                                <View className="paying" onClick={() => { console.log('提交中') }}>提交订单</View>
                                :
                                <View className="paying" onClick={this.goCheckOut.bind(this)} >提交订单</View>

                        }

                    </View>
                </View>
            </View>
        );
    }
}


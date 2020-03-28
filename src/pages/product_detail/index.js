import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less'
import { AtIcon, AtBadge } from 'taro-ui';

@connect(({ shop, loading }) => ({
    shop, loading
}))
export default class ProductDetailView extends Component {

    config = {
        navigationBarTitleText: '详情'
    }

    state = {}

    componentWillMount() { }
    componentDidMount() {
        const { id } = this.$router.params;
        this.props.dispatch({
            type: 'shop/fetchProductDetail',
            payload: {
                id: id
            }
        })
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }

    addQuantity(item) {
        this.props.dispatch({
            type: 'shop/addQuantity',
            payload: {
                ...item
            }
        })
        Taro.navigateTo
    }
    onGoCart() {
        Taro.navigateTo({
            url: '/pages/cart/index'
        })
    }
    render() {
        let { productDetail, cartItems } = this.props.shop
        const loading = this.props.loading.effects['shop/fetchProductDetail']
        let cartCount = 0
        for (var key in cartItems) {
            cartCount += cartItems[key].quantity
        }
        return (
            <View>
                <Image className="cover" src={productDetail.cover}></Image>
                <View className="product">
                    <View className="title">{productDetail.name}</View>
                    <View className="detail">{productDetail.detail}</View>
                    <View className className="price_unit">
                        <View className="label">￥</View>
                        <View className="price">{productDetail.price} </View>
                        <View className="unit"> / {productDetail.unit}</View>
                    </View>
                </View>
                <View className="actions">
                    <View className="cart" onClick={this.onGoCart.bind(this)}>
                        {cartCount == 0 ?
                            <AtIcon value="shopping-cart"></AtIcon> :
                            <AtBadge value={cartCount} maxValue={99}>
                                <AtIcon value="shopping-cart"></AtIcon>
                            </AtBadge>}
                    </View>
                    <View className="add" onClick={this.addQuantity.bind(this, productDetail)}>加入购物车</View>
                </View>
            </View>
        );
    }
}

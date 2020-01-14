import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.less'
export default class Cart extends Component {

    config = {
        navigationBarTitleText: '订单'
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

                <View className="no_product">
                    <Image src="https://fushoubao.oss-cn-beijing.aliyuncs.com/icons/icon-%E8%B4%AD%E7%89%A9%E8%BD%A6.png" className='cart_icon'></Image>
                    <View className="desc">你还未选购商品</View>
                    <View className="go">
                        <AtButton type="primary" size="small">去购物</AtButton>
                    </View>
                </View>
            </View>
        );
    }
}

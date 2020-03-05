import Taro, { Component } from '@tarojs/taro';
import { View, Image, CheckboxGroup, Checkbox } from '@tarojs/components';
import { AtButton, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';

import './index.less'


@connect(({ shop }) => ({
  shop
}))
export default class Cart extends Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    total: 0
  }

  componentWillMount() { }
  componentDidMount() {
    this.totalHandler()
  }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }

  onGoKind() {
    Taro.navigateBack()
  }

  addQuantity(item) {
    this.props.dispatch({
      type: 'shop/addQuantity',
      payload: {
        ...item
      }
    })
    this.totalHandler()
  }
  subtractQuantity(item) {
    this.props.dispatch({
      type: 'shop/subtractQuantity',
      payload: {
        ...item
      }
    })
    this.totalHandler()
  }

  goCheckOut() {
    Taro.navigateTo({
      url: '/pages/checkout/index'
    })
  }

  totalHandler() {
    const { shop } = this.props;
    let total = 0;
    shop.cartItems.map((item) => {
      total += item.quantity * item.price
    })
    this.setState({
      total: total
    })
  }


  render() {
    const shop = this.props.shop;
    return (
      <View>

        <View className='products'>
          <CheckboxGroup>
            {shop.cartItems.map((item) =>
              <View className="item" key={item.id}>
                <Image
                  className='img'
                  src={item.imgs[0]}
                />
                <View className="content">
                  <View className="body">
                    <View className="title">
                      {item.name}
                    </View>
                    <View className="desc">
                      {item.detail}
                    </View>
                  </View>
                  <View className="other">
                    <View className="price">
                      <Text className="unit">￥</Text>{`${item.price} /${item.unit}`}
                    </View>
                    {item.quantity === undefined || item.quantity === 0 ? <View className="quantity-no">
                      <AtIcon className='at-icon at-icon-add-circle' size='20' color='#477ee6' onClick={this.addQuantity.bind(this, item)}>
                      </AtIcon>
                    </View> :
                      <View className="quantity">
                        <AtIcon className='at-icon at-icon-subtract-circle' size='20' color='#477ee6' onClick={this.subtractQuantity.bind(this, item)}></AtIcon>
                        <Text className="num">{item.quantity}</Text>
                        <AtIcon className='at-icon at-icon-add-circle' size='20' color='#477ee6' onClick={this.addQuantity.bind(this, item)}>
                        </AtIcon>
                      </View>

                    }
                  </View>
                </View>
              </View>)
            }
          </CheckboxGroup>

        </View>




        {shop.cartItems.length === 0 ? <View className="no_product">
          <Image src="https://fushoubao.oss-cn-beijing.aliyuncs.com/icons/icon-%E8%B4%AD%E7%89%A9%E8%BD%A6.png" className='cart_icon'></Image>
          <View className="desc">你还未选购商品</View>
          <View className="go">
            <AtButton type="primary" size="small" onClick={this.onGoKind.bind(this)}>去购物</AtButton>
          </View>
        </View> :
          <View className='bar_bottom'>
            <View className="content">
              <View className="total_info">
                <View className='label'>{`合计:`}</View>
                <View>￥{this.state.total}</View>
              </View>
              <View className="paying" onClick={this.goCheckOut.bind(this)}>去结算</View>
            </View>
          </View>
        }
      </View>
    );
  }
}

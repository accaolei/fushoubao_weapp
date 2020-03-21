import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtIcon, AtFab, AtBadge } from 'taro-ui';
import { connect } from '@tarojs/redux';

import './index.less'


@connect(({ shop }) => ({
  shop
}))
export default class Kind extends Component {

  config = {
    navigationBarTitleText: '分类'
  }

  state = {
    current: 0
  }

  componentWillMount() { }
  componentDidMount() {
    this.fetchProductType()
  }

  fetchProductType() {
    let extConfig = Taro.getExtConfigSync()
    this.props.dispatch({
      type: 'shop/featchType',
      payload: {
        id: extConfig.id
      }
    })
  }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() {
    this.fetchProductType()
  }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }

  handlerTabClick(value, event) {
    this.setState({
      current: value
    })
    const { type } = this.props.shop
    console.log(value, event)
    const item = type[value]
    console.log(item)

    let extConfig = Taro.getExtConfigSync()
    this.props.dispatch({
      type: 'shop/featchProduct',
      payload: {
        id: extConfig.id,
        tid: `${item.id}`
      }
    })
  }

  addQuantity(item) {
    this.props.dispatch({
      type: 'shop/addQuantity',
      payload: {
        ...item
      }
    })
  }
  subtractQuantity(item) {
    this.props.dispatch({
      type: 'shop/subtractQuantity',
      payload: {
        ...item
      }
    })
  }
  onGoCart() {
    Taro.navigateTo({
      url: '/pages/cart/index'
    })
  }
  render() {
    const shop = this.props.shop;
    const tabList = shop.type;
    const products = shop.products;
    return (
      <View>
        <AtTabs
          current={this.state.current}
          scroll
          height='100vh'
          tabDirection='vertical'
          tabList={tabList}
          onClick={this.handlerTabClick.bind(this)}>
          {tabList.map((item, index) =>
            <AtTabsPane tabDirection='vertical' key={item.id} current={this.state.current} index={index}>
              <View className='products'>
                {products.map((p) => <View key={p.id} className='item'>
                  <Image
                    className='img'
                    src={p.imgs[0]}
                    lazy-load={true}
                  />
                  <View className="content">
                    <View className="body">
                      <View className="title">
                        {p.name}
                      </View>
                      <View className="desc">
                        {p.detail}
                      </View>
                    </View>
                    <View className="other">
                      <View className="price">
                        <Text className="unit">￥</Text>{`${p.price} /${p.unit}`}
                      </View>
                      {p.quantity === undefined || p.quantity === 0 ? <View className="quantity-no">
                        <AtIcon className='at-icon at-icon-add-circle' size='20' color='#477ee6' onClick={this.addQuantity.bind(this, p)}>
                        </AtIcon>
                      </View> :
                        <View className="quantity">
                          <AtIcon className='at-icon at-icon-subtract-circle' size='20' color='#477ee6' onClick={this.subtractQuantity.bind(this, p)}></AtIcon>
                          <Text className="num">{p.quantity}</Text>
                          <AtIcon className='at-icon at-icon-add-circle' size='20' color='#477ee6' onClick={this.addQuantity.bind(this, p)}>
                          </AtIcon>
                        </View>

                      }
                    </View>
                  </View>
                </View>)}
              </View>
            </AtTabsPane>)}

        </AtTabs>
        <View className="cart">
          {shop.cartCount == 0 ?
            <AtFab onClick={this.onGoCart.bind(this)} >
              <Text className='at-fab__icon at-icon at-icon-shopping-cart'>
              </Text>
            </AtFab>
            :
            <AtBadge value={this.props.shop.cartCount} maxValue={99}>
              <AtFab onClick={this.onGoCart.bind(this)} >
                <Text className='at-fab__icon at-icon at-icon-shopping-cart'>
                </Text>
              </AtFab>
            </AtBadge>
          }

        </View>
      </View >
    );
  }
}

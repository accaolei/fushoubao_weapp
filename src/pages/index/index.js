import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';

import './index.less'
import { AtIcon, AtFab, AtBadge } from 'taro-ui';


@connect(({ shop, user }) => ({
  shop, user
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() {
    let extConfig = Taro.getExtConfigSync()
    console.log(`aasdfd: ${extConfig}`)
    this.props.dispatch({
      type: 'shop/shopRecommendProuct',
      payload: {
        sid: extConfig.id
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onGoCart() {
    Taro.navigateTo({
      url: '/pages/cart/index'
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

  render() {
    const { shop } = this.props;
    const { recommend } = this.props.shop;
    console.log(shop);
    return (
      <View className='index'>
        <View className="label_container">
          <View className="title">推荐</View>
          <View className="desc">精选推荐</View>
        </View>
        <View className="recommend">
          {recommend.map((item) =>
            <View className="item">
              <Image mode="aspectFill" lazy-load={true} className="img" src={`${item.imgs[0]}`}></Image>
              <View className="content">
                <View className="body">
                  <View className="name">{item.name}</View>
                  <View className="desc">{item.detail}</View>
                  <View className="price">
                    <View className="label">￥</View>
                    <View className="value">{item.price}</View>
                    <View className="unit">{`/ ${item.unit}`}</View>
                  </View>
                </View>
                <View className="add" onClick={this.addQuantity.bind(this, item)}>
                  <AtIcon value="add-circle" color="#477ee6"></AtIcon>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* <Text>热销</Text>
        <Text>当前订单</Text> */}
        <View className="cart">
          {shop.cartCount == 0 ?
            <AtFab onClick={this.onGoCart.bind(this)} >
              <Text className='at-fab__icon at-icon at-icon-shopping-cart'>
              </Text>
            </AtFab>
            :
            <AtBadge value={shop.cartCount} maxValue={99}>
              <AtFab onClick={this.onGoCart.bind(this)}>
                <Text className='at-fab__icon at-icon at-icon-shopping-cart'>
                </Text>
              </AtFab>
            </AtBadge>
          }

        </View>
      </View>
    )
  }
}

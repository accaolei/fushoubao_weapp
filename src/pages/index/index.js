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

    this.fetchRecommendProduct();

  }

  componentWillUnmount() { }

  componentDidShow() {
    this.fetchRecommendProduct();
    this.fetchUnfinishedOrder();
  }

  componentDidHide() { }

  fetchRecommendProduct() {
    // 获取推荐
    let extConfig = Taro.getExtConfigSync()
    this.props.dispatch({
      type: 'shop/shopRecommendProuct',
      payload: {
        sid: extConfig.id
      }
    })
  }
  fetchUnfinishedOrder() {
    this.props.dispatch({
      type: 'user/fetchUnfinishedOrder',
      payload: {}
    })
  }

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
    Taro.navigateTo
  }

  navigateToOrderDetail(id) {
    Taro.navigateTo({
      url: `/pages/order/detail/index?id=${id}`
    })
  }



  render() {
    const { shop, user } = this.props;
    const { recommend } = this.props.shop;
    const { unfinishedOrder } = user;

    return (
      <View className='index'>
        {unfinishedOrder && <View className="new_orders">
          <View className="order_item" onClick={this.navigateToOrderDetail.bind(this, unfinishedOrder.id)}>
            <Image className="cover_img" src={unfinishedOrder.coverImg}></Image>
            <View className="content">
              <View className="header">
                <View className="products">{unfinishedOrder.productStr}</View>
                <View className="order_num">{`订单号: ${unfinishedOrder.order_num}`}</View>
              </View>
              <View className="body">
                {`最新状态: ${unfinishedOrder.status}`}
              </View>
            </View>
          </View>
        </View>}
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

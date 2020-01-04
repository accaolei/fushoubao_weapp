import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';

export default class Cart extends Component {

  config = {
    navigationBarTitleText: '购物车'
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
        <Text>cart</Text>
      </View>
    );
  }
}
export default Cart;

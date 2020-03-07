import Taro, { startGyroscope } from '@tarojs/taro'
import * as shop from '../services/api';

export default {

  namespace: 'shop',
  state: {
    type: [],
    products: [],
    cartCount: 0,
    cartItems: [],
    cartIds: new Map()
  },
  effects: {
    *featchType({ payload }, { call, put }) {
      const response = yield call(shop.ProductType, payload);
      console.log(response)
      if (response && response.error_code === 0) {
        const data = response.data
        yield put({
          type: 'save',
          payload: {
            type: data
          }
        })
        if (data.length > 0) {
          yield put({
            type: 'featchProduct',
            payload: {
              id: payload.id,
              tid: data[0].id
            }
          })
        }

      }
    },
    *featchProduct({ payload }, { call, put }) {
      const response = yield call(shop.ProudctList, payload);
      if (response && response.error_code === 0) {
        yield put({
          type: 'saveProduct',
          payload: {
            products: response.data
          }
        })
      }
    },
    *creatOrder({ payload }, { call, put }) {
      const response = yield call(shop.createOrder, payload);
      console.log(response)
    }

  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    saveProduct(state, { payload }) {
      payload.products.map((item) => {
        if (state.cartIds.has(item.id)) {
          item.quantity = state.cartIds.get(item.id)
        }
      })
      return {
        ...state,
        ...payload
      }
    },
    addQuantity(state, { payload }) {

      // 计算购物车商品商量
      let having = false;
      const id = payload.id
      state.cartItems.map((item) => {
        if (item.id === id) {
          item.quantity += 1
          having = true
        }
      })
      if (having == false) {
        payload.quantity = 1;
        state.cartItems.push(payload);
      }

      // 为了方便计算，添加商品和数量对应map
      if (state.cartIds.has(id)) {
        const item = state.cartIds.get(id)
        state.cartIds.set(id, item + 1)
      } else {
        state.cartIds.set(id, 1)
      }
      console.log(state.cartIds)
      // 设置商品数量
      state.products.map((item) => {
        if (item.id === payload.id) {
          console.log(isNaN(item.quantity))
          if (isNaN(item.quantity)) {
            item.quantity = 1
          } else {
            item.quantity += 1
          }
        }
        return item
      })
      // 计算商品总数量
      state.cartCount += 1;

      return {
        ...state
      }
    },
    subtractQuantity(state, { payload }) {
      const id = payload.id
      state.products.map((item) => {
        if (item.id === id) {
          item.quantity -= 1
          state.cartCount -= 1;
        }
        return item
      })
      state.cartItems.map((item, index) => {
        if (item.id === id) {
          item.quantity -= 1
          if (item.quantity === 0) {
            state.cartItems.splice(index, 1)
          }
        }
      })
      const item = state.cartIds.get(id)
      if (item > 0) {
        state.cartIds.set(id, item - 1)
      } else {
        state.cartIds.delete(id)
      }

      return {
        ...state
      }
    }
  }
}

import Taro, { startGyroscope } from '@tarojs/taro'
import * as shop from '../services/api';

export default {

  namespace: 'shop',
  state: {
    type: [],
    products: [],
    cartCount: 0,
    cartItems: []
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
          type: 'save',
          payload: {
            products: response.data
          }
        })
      }
    },

  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    addQuantity(state, { payload }) {
      let having = false;
      state.cartItems.map((item) => {
        if (item.id === payload.id) {
          item.quantity += 1
          having = true
        }
      })
      if (having == false) {
        payload.quantity = 1;
        state.cartItems.push(payload);
      }
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
      state.cartCount += 1;
      return {
        ...state
      }
    },
    subtractQuantity(state, { payload }) {
      state.products.map((item) => {
        if (item.id === payload.id) {
          item.quantity -= 1
          state.cartCount -= 1;
        }
        return item
      })
      state.cartItems.map((item, index) => {
        if (item.id === payload.id) {
          item.quantity -= 1
          if (item.quantity === 0) {
            state.cartItems.splice(index, 1)
          }
        }
      })

      return {
        ...state
      }
    }
  }
}

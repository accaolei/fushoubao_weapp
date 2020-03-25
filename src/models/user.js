import Taro from '@tarojs/taro'
import * as user from '../services/api';

const delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

export default {
    namespace: 'user',
    state: {
        isLogin: false,
        token: '',
        address: [],
        orders: [],
        complaints: []
    },
    effects: {
        *getUserInfo({ payload }, { call, put }) {
            const response = yield call(user.userProfile)
            if (response.error_code === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        user: response.data,
                        isLogin: true,
                    }
                })
            }
        },
        *login({ payload }, { call, put }) {
            console.log(payload)
            const back = payload.back
            delete payload.back
            console.log(payload)
            var response = yield call(user.Login, payload)
            console.log(response)
            if (response.error_code === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        isLogin: true,
                        token: response.data.token,
                    }
                })
                Taro.setStorageSync('loginDate', new Date())
                Taro.setStorageSync('token', response.data.token)
                Taro.setStorageSync('expires_in', response.data.expires_in)
                yield put({
                    type: 'getUserInfo',
                    payload: {}
                })
                if (back === 'true') {
                    Taro.navigateBack()
                } else {
                    Taro.reLaunch({ url: '/pages/index/index' })
                }


            } else {
                Taro.showToast({ title: `${response.msg}`, icon: 'none' })
            }
        },
        *jscode2Session({ payload }, { call, put }) {
            const response = yield call(user.jsCode2Session, payload)
            Taro.setStorageSync('session_key', response.data.session_key)
            if (response.error_code === 0) {
                console.log('adfasdf')

                Taro.setStorageSync('token', response.data.token)
                Taro.setStorageSync('expires_in', response.data.expires_in)
                Taro.setStorageSync('unionid', response.data.unionid)
                Taro.setStorageSync('openid', response.data.openid)
                yield put({ type: 'getUserInfo' })
            } else {
                console.log(response)
                yield put({
                    type: 'save',
                    payload: {
                        isLogin: false
                    }
                })
            }
        },
        *sendCode({ payload }, { call, put }) {
            const response = yield call(user.phoneCode, payload)
            if (response.error_code === 0) {
                Taro.showToast({
                    title: '验证码发送成功',
                    icon: 'none'
                })
                let time = 59;
                yield put({
                    type: 'save',
                    payload: {
                        sending: true,
                        sms_message: `${time}(s)`
                    }
                })
                while (time > 0) {
                    time = time - 1;
                    yield call(delay, 1000);
                    yield put({
                        type: 'save',
                        payload: {
                            sms_message: `${time}(s)`
                        }
                    })
                }
                if (time == 0) {
                    yield put({
                        type: 'save',
                        payload: {
                            sending: false
                        }
                    })
                }
            }
        },
        *createAddress({ payload }, { call, put }) {
            const response = yield call(user.createAddress, payload)
            if (response && response.error_code === 0) {
                yield put({
                    type: 'saveAddress',
                    payload: {
                        address: response.data
                    }
                })
                Taro.navigateBack()
                Taro.showToast({
                    title: '添加成功',
                    icon: 'none'
                })
            } else {
                console.log('创建失败')
            }
        },
        *getAddress({ payload }, { call, put }) {
            const response = yield call(user.getAddress, payload)
            if (response && response.error_code === 0) {
                console.log(response.data)
                yield put({
                    type: 'save',
                    payload: {
                        address: response.data
                    }
                })

            }
        },

        *deleteAddress({ payload }, { call, put }) {
            const response = yield call(user.deleteAddress, payload)
            console.log(response)
            if (response && response.error_code === 0) {
                yield put({
                    type: 'getAddress',
                    payload: {}
                })
            }
        },

        *getOrderList({ payload }, { call, put }) {
            const response = yield call(user.getOrderList, payload)
            if (response && response.error_code === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        orders: response.data
                    }
                })
            }
        },
        *deleteOrder({ payload }, { call, put }) {
            const response = yield call(user.deleteOrder, payload)
            if (response && response.error_code === 0) {
                Taro.showToast({
                    title: '删除成功',
                })
                if (payload.status) {
                    yield put({
                        type: 'getOrderList',
                        payload: {
                            status: payload.status
                        }
                    })
                }
            }
        },
        *fetchUnfinishedOrder({ payload }, { call, put }) {
            const response = yield call(user.unfinishedOrder, payload)
            if (response && response.error_code === 0) {
                if (response.have) {
                    var _data = response.data
                    var productStr = _data.products[0].name;
                    const pCount = _data.products.length;
                    if (pCount > 1) {
                        productStr += `等${pCount}件商品`
                    }

                    var data = {
                        id: _data.id,
                        productStr: productStr,
                        coverImg: _data.products[0].cover_img,
                        createAt: _data.current_state.create_at,
                        operationName: _data.current_state.operation_name,
                        description: _data.current_state.description,
                        order_num: _data.order_num,
                        status: _data.status
                    }
                    yield put({
                        type: 'save',
                        payload: {
                            unfinishedOrder: data
                        }
                    })
                }
            }
        },
        *fetchComplaints({ payload }, { call, put }) {
            const response = yield call(user.complaints, payload)
            console.log(response);
            if (response && response.error_code === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        complaints: response.data
                    }
                })
            }
        }




    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        saveAddress(state, { payload }) {
            let address = [
                payload.address,
                ...state.address
            ]
            return {
                ...state,
                address: address
            }
        }
    }
}

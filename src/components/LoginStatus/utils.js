import Taro from '@tarojs/taro';

export const wxLogin = (that) => {

    Taro.login({
        success(res) {
            console.log(res)
            if (res.code) {
                that.props.dispatch({
                    type: 'user/jscode2Session',
                    payload: {
                        code: res.code
                    }
                })
            }
        }
    })
}

export const getLocalToken = () => {
    /*
    判断本地是否有有效token
    */
    const token = wx.getStorageSync('token')
    if (token) {
        const loginDate = wx.getStorageSync('loginDate')
        const expires_in = wx.getStorageSync('expires_in')
        const currentDate = new Date();
        const _date = new Date(loginDate)
        console.log(_date.getTime())
        console.log(currentDate.getTime() - _date.getTime())
        const d = parseInt(expires_in) - (currentDate.getTime() - _date.getTime()) / 1000
        if (d > 10 * 60) {
            return token
        } else {
            return false
        }
    } else {
        return false
    }
}

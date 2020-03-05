import Taro from '@tarojs/taro';
import { wxLogin, getLocalToken } from './utils';
function loginStatus(opts = {}) {

    return function demoComponent(Component) {
        class LoginStatus extends Component {
            constructor(props) {
                super(props);
            }

            async componentWillMount() {
                const that = this;
                // console.log(this)
                const token = getLocalToken()
                // console.log('token', !token)
                // const session_key = Taro.getStorageSync('session_key')
                if (!token) {
                    const res = await wxLogin(that)
                    console.log('loginStatus', res)
                } else {
                    that.props.dispatch({
                        type: 'user/save',
                        payload: {
                            isLogin: true,
                            token: token
                        }
                    })
                }



            }
            render() {
                return super.render()
            }
        }
        return LoginStatus;
    }
}

export default loginStatus

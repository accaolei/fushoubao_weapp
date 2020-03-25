import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import './index.less'
import loginStatus from '@/components/LoginStatus/index';
import { connect } from '@tarojs/redux';

@connect(({ user }) => ({
    user
}))
@loginStatus()
export default class ComplaintsViews extends Component {

    config = {
        navigationBarTitleText: '投诉与建议'
    }

    state = {}

    componentWillMount() { }
    componentDidMount() {
        console.log('asdfasdfa')
        this.props.dispatch({
            type: 'user/fetchComplaints',
            payload: {}
        })
    }
    componentWillReceiveProps(nextProps, nextContext) { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    componentDidCatchError() { }
    componentDidNotFound() { }

    onCreate() {
        Taro.navigateTo({
            url: `/pages/my/complaints/create`
        })
    }
    render() {
        const { complaints } = this.props.user;
        return (
            <View>
                {complaints.length === 0
                    ?
                    <View className="nothing">暂无此内容</View>
                    :
                    <View>有</View>
                }
                <View className="add_btn">
                    <AtFab onClick={this.onCreate.bind(this)} >
                        <Text className='at-fab__icon at-icon at-icon-add'></Text>
                    </AtFab>
                </View>
            </View>
        );
    }
}

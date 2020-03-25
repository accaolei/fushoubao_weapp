import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtTextarea } from 'taro-ui';

import './index.less'

export default class ComplaintsCreate extends Component {

    config = {
        navigationBarTitleText: '投诉与建议'
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
    onSubmit() { }
    onReset() { }
    handleChange() { }
    render() {
        return (
            <View className="container">
                <View className="content">
                    <AtTextarea
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        maxLength={200}
                        placeholder='写下你的投诉或建议...'
                    />
                </View>
                <View className="actions">
                    <AtButton size="small" type="primary" formType='submit'>提交</AtButton>
                </View>
            </View>
        );
    }
}

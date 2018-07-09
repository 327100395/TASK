/**
 * Created by 媲美爱 on 2018-05-25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
//第三方插件
import { Actions } from 'react-native-router-flux';
import AIButton from "../components/AIButton";
export default class HomeTabScreen extends Component {
    constructor(props){
        super(props);
    }

    _showLoading() {
        global.showLoading();
        setTimeout(()=>{
            global.closeLoading();
        },1500)
    }

    render() {
        return (
            <View style={[global.styles.screen]}>
                <Text style={[global.styles.text]}>
                    this is HomeTabScreen.
                </Text>
                <View style={[{marginTop: 10}]}>
                    <AIButton color="#0398ff" onPress={Actions.signInOrUp} title="免注册登录" />
                </View>
                <View style={[{marginTop: 10}]}>
                    <AIButton onPress={() => this._showLoading()} title="Loading" />
                </View>
                <View style={[{marginTop: 10}]}>
                    <AIButton onPress={() => global.toast('这是消息提示')} title="Toast" />
                </View>
                <View style={[{marginTop: 10}]}>
                    <AIButton onPress={Actions.topShow} title="内容页" />
                </View>
            </View>
        )
    }
}

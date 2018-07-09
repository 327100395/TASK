/**
 * Created by 媲美爱 on 2018-05-29.
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native';
//第三方插件
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
//自定义组件
import Common from './common';
import Icon from 'react-native-vector-icons/Ionicons'

let statusBar = Platform.select({
  ios: Common.isIphoneX ? 44 : 20,
  android: 20,
});
let navHeight = statusBar + 44;
export default class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let titleAlignStatus = this.props.showBack?null:'space-between';
        console.log(Platform.os);
        let backButton =  this.props.showBack?(Platform.OS === 'ios'?
            <TouchableOpacity onPress={Actions.pop} underlayColor="transparent" style={[styles.return]}>
                <View style={[styles.returnBox]}>
                    <Icon name="ios-arrow-back" size={Common.autoScaleSize(36)} color="#fff" />
                </View>
            </TouchableOpacity>:
            <TouchableNativeFeedback onPress={Actions.pop} underlayColor="transparent" >
                <View style={[styles.return]}>
                  <View style={[styles.returnBox]}>
                    <Icon name="ios-arrow-back" size={Common.autoScaleSize(36)} color="#fff" />
                  </View>
                </View>
            </TouchableNativeFeedback>):null;
        return (
            <View style={[styles.header, {justifyContent: titleAlignStatus,margin: 0, paddingTop: statusBar, height: navHeight}]}>
                <View></View>
                {backButton}
                <Text style={[styles.title]}>
                    {this.props.title}
                </Text>
                <View></View>
            </View>
        )
    }
}
Header.props={
  showBack:false
};
Header.propTypes={
    showBack: PropTypes.bool,
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0398ff',
        width: Common.autoScaleSize(750),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: Common.autoScaleSize(1),
        borderBottomColor: '#0398ff',
        elevation: 2,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 1
    },
    title: {
        color: '#fff',
        height: Common.autoScaleSize(44),
        lineHeight: Common.autoScaleSize(44),
        fontSize: Common.autoFontSize(36),
    },
    return: {
        width: Common.autoScaleSize(84),
        height: navHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius:20,
    },
    returnBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    doneBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

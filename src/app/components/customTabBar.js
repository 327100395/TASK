/**
 * Created by 媲美爱 on 2018-05-25.
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    Text,
} from 'react-native';
//第三方插件
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'
//自定义组件
import Common from './common'; //公共类

export default class CustomTabBar extends Component {
    constructor(props) {
        super(props);
    }

    static setAnimationValue({value}) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(CustomTabBar.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab === i ? "#3496f0" : "#666"; // 判断i是否是当前选中的tab，设置不同的颜色
        let tabName = this.props.tabNames[i][0];
        let tabIcon = this.props.tabNames[i][1];
        let view =
            <View style={[styles.tabBox]}>
              <Icon name={tabIcon} size={Common.autoScaleSize(48)} color={color} />
              <Text style={[styles.tabBoxName, {color: color}]}>
                {tabName}
              </Text>
            </View>;
        if(Platform.OS === 'android'){
          return (
                <TouchableNativeFeedback onPress={()=>this.props.goToPage(i)}  key={'tab' + i}>
                  <View style={[styles.tab]}>
                    {view}
                  </View>
                </TouchableNativeFeedback>
          );
        }else{
            return (
              <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={[styles.tab]} key={'tab' + i}>
                {view}
              </TouchableOpacity>
            );
        }
    }

    renderTabs() {
        if (true !== this.props.placeMiddle || 0 !== this.props.tabs.length%2) {
            return this.props.tabs.map((tab, i) => this.renderTabOption(tab, i));
        } else  {
            let tabs = [];
            for (let i = 0; i < this.props.tabs.length; i++) {
                let tab = this.props.tabs[i];
                if (i === parseInt(this.props.tabs.length/2)) {
                    let middle = (
                        <View key={'tabMiddle'} style={[styles.tab]}>
                            <View style={[styles.tabMiddleBox]}/>
                        </View>
                    );
                    tabs.push(middle);
                }
                tabs.push(this.renderTabOption(tab, i));
            }
            return tabs;
        }
    }

    render() {
        let tabBarHeight = Platform.select({
            ios: Common.isIphoneX ? 68 : 49,
            android: 49,
        });
        return (
            <View key={'custom'} style={[styles.tabs, {height: tabBarHeight}]}>
                {this.renderTabs()}
            </View>
        );
    }
}

CustomTabBar.propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
};

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderTopWidth: 0.5,
        borderTopColor: '#ffffff',
        elevation: 2,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 1
    },
    tab: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
    },
    tabMiddleBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
    },
    tabBoxIcon: {
        width: 22,
        height: 22,
    },
    tabBoxName: {
        fontSize: Common.autoFontSize(22),
        padding: Common.autoScaleSize(1)
    },
});

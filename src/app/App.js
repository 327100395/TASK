/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @媲美爱
 * @辣条要甜点
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    BackHandler,
    View,
    StatusBar,
    UIManager,
} from 'react-native';
//第三方插件
import { Router, Scene } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
//自定义组件
import CustomTabBar from './components/customTabBar'; //自定义选项卡
import Loading from './components/loading';
//选项卡Tab页
import HomeTabScreen from './views/home'; //首页
import TaskTabScreen from './views/task'; //任务
import GoodsTabScreen from './views/goods'; //已购
import MineTabScreen from './views/mine'; //我的
//页面
import SignInOrUpScreen from './views/signIns/signInOrUp'; //免注册登录
import SignInScreen from './views/signIns/signIn'; //登录
import TopShowScreen from './views/home/topShow';
export class Tabs extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {return true});
    }

    render() {
        let tabNames = [
          ["首页", "logo-google"],
          ["任务", "ios-list-box-outline"],
          ["兑吧", "ios-compass-outline"],
          ["我的", "ios-contact-outline"]
        ];
        return (
            <ScrollableTabView
                locked={false}
                scrollWithoutAnimation={true}
                initialPage={0} //初始tab索引
                renderTabBar={() =>
                    <CustomTabBar
                        tabNames={tabNames} //tab名称
                        placeMiddle={false} //中间是否占位，即中间是否需要用特殊按钮样式等
                    />
                }
                tabBarPosition='bottom'
            >
                <HomeTabScreen key='homeTab' tabLabel='home' />

                <TaskTabScreen key='taskTab' tabLabel='task' />

                <GoodsTabScreen key='goodsTab' tabLabel='goods' />

                <MineTabScreen key='mineTab' tabLabel='mine' />
            </ScrollableTabView>
        );
    }
}
global.statusBarH = 0;
export class Root extends Component {
    constructor(props) {
        super(props);
    };


    componentDidMount(){
      console.log('abc');
    }

    render() {
        return Platform.OS == "ios"?(
            <View style={{flex: 1}} >

              <StatusBar
                  ref="statusBarRef"
              />

              <Tabs/>

            </View>

      ):(
          <View style={{flex: 1}}>
            <StatusBar
                ref = "statusBarRef"
                translucent={true}
                backgroundColor={"rgba(0, 0, 0,0)"}
            />

            <Tabs/>

          </View>
      )
    };

}

let self; //将App组件中的this赋给全局的self
global.showLoading = false; //所有子页面均可直接调用global.showLoading()来展示Loading
global.closeLoading = false; //所有子页面均可直接调用global.closeLoading()来关闭Loading
global.toast = false; //所有子页面均可直接调用global.toast("")来吐司提示消息
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        self = this;
        global.showLoading = function() {
            self.Loading.show();
        };
        global.closeLoading = function() {
            self.Loading.close();
        };
        global.toast = function(message) {
            self.refs.toast.show(message);
        };
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                <Router sceneStyle={[styles.router]}>
                    <Scene
                        navigationBarStyle={[styles.root]}
                        titleStyle={[styles.title]}
                        headerMode="screen"
                        component={Tabs}
                    >
                    {/*首页(tab)*/}
                    <Scene
                        key="root"
                        component={Root}
                        title="root"
                        initial={false}
                        hideNavBar={true} //此处以及其他页都隐藏了导航，我打算自定义组件作为头部导航栏。
                    />
                    {/*定义页面路由*/}
                    {/*登录*/}
                    <Scene key="signInOrUp" component={SignInOrUpScreen} title="免注册登录1" hideNavBar={true}  />
                    <Scene key="signIn" component={SignInScreen} title="登录" hideNavBar={true} />
                    {/*内容页*/}
                    <Scene key="topShow" component={TopShowScreen} title="内容页" hideNavBar={true} />
                    </Scene>
                </Router>
                <Toast ref="toast" opacity={0.8}/>
                <Loading ref={r=>{this.Loading = r}} hide = {true} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    router: {
        backgroundColor: '#e6e6e6',
    },
    root: {
        backgroundColor: '#e6e6e6',
    },
    title: {
        color: '#ffffff',
    },
});

global.styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
    },
    container: {
        backgroundColor: '#e6e6e6',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 20,
        textAlign: 'center',
        margin: 0,
    },
});

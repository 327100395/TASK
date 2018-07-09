/**
 * Created by 媲美爱 on 2018-05-25.
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native';
import LocalImg from '../images'
import Item from '../components/Item'
import px2dp from '../util/index'

import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')
let topH = 45;
export default class MineTabScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isRefreshing: false
    }
    this.config = [
      {icon:"ios-flame", name:"每日签到",clone:"#0398ff"},
      {icon:"logo-usd", name:"积分提现", subName:"", color:"#fc7b53"},
      {icon:"ios-medal", name:"邀请有奖", subName:"", color:"#ffc636"},
      {icon:"ios-cart", name:"兑换记录", subName:"", color:"#94d94a"},
      {icon:"ios-rose", name:"积分记录", color:"#ffc636"},
      {icon:"ios-leaf", name:"邀请记录", color:"#fc7b53"},
      {icon:"md-contacts", name:"联系客服"},
      {icon:"logo-snapchat", name:"关于我们"},
      {icon:"ios-outlet", name:"检查更新"},
    ]
  }
  componentDidMount(){
    this._onRefresh()
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500)
  }
  _renderListItem(){
    return this.config.map((item, i) => {
      if(i%3==0){
        item.first = true
      }
      return (<Item key={i} {...item}/>)
    })
  }
  render(){
    return (
        <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
          <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    tintColor="#fff"
                    colors={['#ddd', '#0398ff']}
                    progressBackgroundColor="#ffffff"
                />
              }
          >
            <View style={{flex:1,backgroundColor: "#f3f3f3", paddingBottom:10}}>
              <TouchableWithoutFeedback >
                <View style={styles.userHead}>
                  <View style={{flex: 1,flexDirection: "row"}}>
                    <Image source={LocalImg.avatar} style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                      <Text style={{color: "#fff", fontSize: px2dp(18)}}>辣条要甜点</Text>
                      <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                        <Icon name="ios-chatbubbles-outline" size={px2dp(14)} color="#fff" />
                        <Text style={{color: "#fff", fontSize: 12, paddingLeft: 5}}>a52002005</Text>
                      </View>
                    </View>
                  </View>
                  <Icon name="ios-notifications-outline" size={px2dp(22)} color="#fff" />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.numbers}>
                <TouchableWithoutFeedback>
                  <View style={styles.numItem}>
                    <Text style={{color: "#f90", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999.0元"}</Text>
                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"我的余额"}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View style={[styles.numItem,{borderLeftWidth: 1, borderLeftColor: "#f5f5f5",borderRightWidth: 1, borderRightColor: "#f5f5f5"}]}>
                    <Text style={{color: "#ff5f3e", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"1940个"}</Text>
                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"我的徒弟"}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View style={styles.numItem}>
                    <Text style={{color: "#6ac20b", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999个"}</Text>
                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"我参加的任务"}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                {this._renderListItem()}
                <Item.Button name="退出登录" first={true}/>
              </View>
            </View>
          </ScrollView>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#0398ff"
  },
  userHead: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop:topH,
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: "#0398ff"
  },
  numbers: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 74
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: "center",
    alignItems: "center"
  }
})
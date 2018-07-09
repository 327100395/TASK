/**
 * Created by 媲美爱 on 2018-05-25.
 */

import React, { Component } from 'react';
import {
    // Platform,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Header from "../components/header";

export default class GoodsTabScreen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={[global.styles.screen]}>
                <Header title="兑吧" showBack={false} />
                <Text style={[global.styles.text]}>
                    this is BoughtTabScreen.
                </Text>
            </View>
        )
    }
}
/**
 * 
 */
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import welcomePage from './src/welcomePage';//登陆主页
import main from './src/main'//第一个Tab


export default App = createStackNavigator({
  welcome: {
    screen: welcomePage, 
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  // login: {screen: ImageDemo,},
  // regiter: {screen: ImageDemo,},
  main: {screen: main,},
},
  {
    // initialRouteName: 'Profile', // 默认显示界面
    // navigationOptions: {
    //     header: {
    // backTitle: 'Back',
    // style:styles.header,
    // right: <Button title="Info" />,
    // left:<Button title="left" />,
    // titleStyle:styles.title,
    // visible:true,
    // title: 'ProfileScreen',
    // tintColor:'yellow',
    // gesturesEnabled:true,
    // },
    // },
    // headerMode:'screen',
  }
);
/**
 * 
 */
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import welcomePage from './src/welcomePage'; //登陆主页
import main from './src/main' //第一个Tab
import Login from './src/component/loginScreen/login';
import myTeam from './src/component/userScreen/myTeam';
import Register from './src/component/loginScreen/register';

export default App = createStackNavigator({
  welcome: {
    screen: welcomePage,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  register: {screen: Register},
  main: {
    screen: main,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  myTeam: {
    screen: myTeam,
    navigationOptions: ({navigation}) => ({
      title: '我的团队',
      headerTitleStyle: {
        color: '#FFFFFF',
},
      headerStyle: {
        backgroundColor: '#551670',
      },
      headerTintColor: '#FFFFFF',
    }),
  },
},
  {
    initialRouteName: 'welcome', // 默认显示界面
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
);


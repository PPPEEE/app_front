import React, { Component } from 'react';
import {PixelRatio, Platform, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class Login extends Component {
	render() {
		return(
			<View style={styles.container}>
        <View style={styles.logon}>
          <Text>{'主页图标'}</Text>
        </View>
        <View style={styles.formElement}>
          <Icon name="user"  color="#3A9AF5" />
          <TextInput placeholder="请填写用户名/手机号码/UID" style={styles.input}/>
        </View>
        <View style={styles.formElement}>
          <Icon name="lock"  color="#3A9AF5" style={styles.icon}/>
          <TextInput placeholder="请填写登录密码" style={styles.input}/>
        </View>
        <Button title="登陆" onPress="" style={styles.formElement}/>
      </View>
		);
	}
}
	
const styles = StyleSheet.create({
  container:{
  	flex: 1, 
  	alignItems: 'center',
  	width: 1080
  },
  logon:{
  	height: 810,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  formElement:{
    width: 810, 
    height: 110,
    flexDirection: 'row',
    margin: 30
  },
  icon: {
  	margin: 32,
  	color: '#3A9AF5',
  	fontSize: 60
  },
  input:{
  	width: 720, 
  	flexDirection: 'row',
  	fontSize: 40
  }
  
})

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Resolutions from '../resolutions';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.login = () => {
      fetch('https://www.baidu.com/', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstParam: this.state.username,
          secondParam: this.state.password
        })
      }).then((res) => {
      	console.log(res);
        Alert.alert('','登录成功');
      });
    }
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <View style={ styles.container }>
          <View style={ styles.logon }>
            <Text style={ { fontSize: 44, color: 'white' } }>
              { '登录页图标' }
            </Text>
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
            <Text style={ styles.iconWrapper }>
              <Icon
                    name="user"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       placeholder="请填写用户名/手机号码/UID"
                       style={ styles.input }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       value={ this.state.username } />
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
            <Text style={ styles.iconWrapper }>
              <Icon
                    name="lock"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       placeholder="请填写登录密码"
                       style={ styles.input }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       secureTextEntry={ true } />
          </View>
          <View style={ [styles.formElement, { marginTop: 100, backgroundColor: 'transparent' }] }>
            <TouchableOpacity
                              style={ styles.loginButton }
                              onPress={ this.login }>
              <Text style={ { fontSize: 40, color: '#0C2956' } }>
                登录
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ [styles.formElement, { margin: 25, backgroundColor: 'transparent', justifyContent: 'space-between' }] }>
            <Text style={ { color: '#969696', fontSize: 40 } }>
              免费注册
            </Text>
            <Text style={ { color: '#969696', fontSize: 40 } }>
              忘记密码
            </Text>
          </View>
        </View>
      </Resolutions.FixFullView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 1080,
    backgroundColor: '#000733'
  },
  logon: {
    height: 810,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formElement: {
    width: 810,
    height: 110,
    flexDirection: 'row',
    backgroundColor: 'black',
    margin: 40
  },
  iconWrapper: {
    width: 110,
    padding: 15,
    margin: 15
  },
  icon: {
    color: '#3A9AF5',
    fontSize: 60
  },
  input: {
    width: 720,
    flexDirection: 'row',
    fontSize: 40,
    color: 'white'
  },
  loginButton: {
    width: 810,
    height: 110,
    backgroundColor: '#3A9AF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55
  }

})
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Resolutions from '../../utils/resolutions';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      password: ''
    };

    this.login = () => {
      if (!this.state.mobile) {
        this.refs.mobile.focus();
        return;
      }
      if (!this.state.password) {
        this.refs.password.focus();
        return;
      }
      fetch('http://120.78.205.55:8081/user/login', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile: this.state.mobile || '15013669204',
          password: this.state.password || '123456'
        })
      }).then((res) => {
        return res.json();
      }).then((jsonData) => {
        if (jsonData.code === 200) {
          AsyncStorage.setItem('token', jsonData.data);
          this.props.navigation.replace('main');
        }else{
          Alert.alert('提示', jsonData.message);
        }
      }).catch(()=>{

      });
    }
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <View style={ styles.container }>
          <View style={ styles.logon }>
            <Image
                   style={ { width: 650, height: 150 } }
                   source={ require('../../images/logoWhite.png') }
                   resizeMode='contain' />
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
            <Text style={ styles.iconWrapper }>
              <Icon
                    name="user"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       ref="mobile"
                       placeholder="请填写用户名/手机号码/UID"
                       style={ styles.input }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       onChangeText={ (text) => this.setState({
                                        mobile: text
                                      }) }
                       value={ this.state.mobile } />
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
            <Text style={ styles.iconWrapper }>
              <Icon
                    name="lock"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       ref="password"
                       placeholder="请填写登录密码"
                       style={ styles.input }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       secureTextEntry={ true }
                       onChangeText={ (text) => this.setState({
                                        password: text
                                      }) } />
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
            <Text
                  style={ { color: '#969696', fontSize: 40 } }
                  onPress={ () => {
                              this.props.navigation.push('register')
                            } }>
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
    height: 130,
    flexDirection: 'row',
    margin: 30
  },
  iconWrapper: {
    width: 90,
    padding: 5,
    marginLeft: 30,
    marginTop: 25
  },
  icon: {
    color: '#3A9AF5',
    fontSize: 70
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
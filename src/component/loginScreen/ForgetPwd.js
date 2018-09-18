import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Picker, KeyboardAvoidingView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Resolutions from '../../utils/resolutions';

export default class ForgetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      areaCode: '86',
      seconds: 60,
      type: '2'
    };
    
    this.resetPwd = this.resetPwd.bind(this);
    this.sendVerifiCode = this.sendVerifiCode.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkVerifiCode = this.checkVerifiCode.bind(this);
  }
  sendVerifiCode() {
    fetch('http://120.78.205.55:8081/user/sendCode', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'areaCode': this.state.areaCode,
        'mobile': this.state.mobile,
        'type': this.state.type
      })
    }).then((res) => {
      return res.json();
    }).catch(error => {

    });
    this.setState({
      isSendCode: true
    });
    let timer = setInterval(() => {
      if (this.state.seconds < 1) {
        clearInterval(timer);
        this.setState({
          seconds: 60,
          isSendCode: false
        })
      }
      this.setState({
        seconds: this.state.seconds - 1
      })
    }, 1000)
  }
  resetPwd() {
    let nameInvalid = this.checkUserName();
    let pwdInvalid = this.checkPassword();
    if (nameInvalid || pwdInvalid) {
      let tips = '';
      tips += !nameInvalid ? '' : '用户名应为8-32位非空字符。';
      tips += !pwdInvalid ? '' : '密码应为8-32位非空字符。';
      ToastAndroid.show(tips, ToastAndroid.SHORT);
      return;
    }
    fetch('http://120.78.205.55:8081/user/getPwdUser', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: this.state.verificode,
        userName: this.state.userName,
        pwd: this.state.password,
        telephone: this.state.mobile
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      console.log(jsonData);
      if (jsonData.code === 200) {
        ToastAndroid.show('修改成功', ToastAndroid.SHORT);
        this.props.navigation.replace('login');
      } else {
        ToastAndroid.show(jsonData.message, ToastAndroid.SHORT);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  checkUserName() {
    let invalid = !/^[\S]{8,32}$/.test(this.state.userName);
    this.setState({
      invalidUsername: invalid
    });
    return invalid;
  // fetch('http://120.78.205.55:8081/user/userNameExists', {
  //   method: "POST",
  //   headers: {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     'userName ': this.state.userName
  //   })
  // }).then((res) => {
  //   return res.json();
  // }).then((jsonData) => {
  //   this.setState({
  //     invalidUsername: jsonData.code === '0'
  //   });
  //   if (jsonData.code === '0') {
  //     this.setState({
  //       nameTips: jsonData.message
  //     });
  //   }
  //   console.log(jsonData);
  // }).catch((error) => {
  // })
  }

  checkPassword() {
    let invalid = !/^[\S]{8,32}$/.test(this.state.password);
    this.setState({
      invalidUserPwd: invalid
    });
    return invalid;
  }

  checkVerifiCode() {
    fetch(`${global.Config.FetchURL}/user/checkCode`, {
      method: "Post",
      hearders: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'mobile': this.state.mobile,
        'code': this.state.verificode
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      this.setState({
        invalidCode: jsonData.code === '0'
      })
    })
  }

  render() {
    var checkIcon = this.state.checked ? "check" : null;
    return (
      <Resolutions.FixFullView>
        <StatusBar
                   translucent={ true }
                   backgroundColor='rgba(0,0,0,0)' />
        <View style={ styles.container }>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86', marginTop: 100 }] }>
            <Text style={ styles.iconWrapper }>
              <Icon
                    name="user"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       placeholder="请填写用户名"
                       style={ styles.input }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       maxLength={ 32 }
                       onChangeText={ (text) => {
                                        this.setState({
                                          userName: text
                                        })
                                      } } />
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
                       secureTextEntry={ true }
                       onChangeText={ (text) => this.setState({
                                        password: text
                                      }) } />
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
            <Text style={ [styles.iconWrapper, { paddingLeft: 10, paddingBottom: 10, paddingTop: 5 }] }>
              <Icon
                    name="mobile"
                    style={ [styles.icon, { fontSize: 80 }] } />
            </Text>
            <Text style={ { fontSize: 40, width: 135, height: 110, color: 'white', paddingTop: 35, marginRight: -25 } }>
              { '+' + this.state.areaCode }
              <Icon
                    name="caret-down"
                    style={ { fontSize: 40, color: 'white' } } />
            </Text>
            <TextInput
                       placeholder="请输入您的手机号码"
                       style={ [styles.input, { width: 585 }] }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       keyboardType="numeric"
                       maxLength={ 11 }
                       onChangeText={ (text) => this.setState({
                                        mobile: text
                                      }) } />
          </View>
          <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: this.state.invalidCode ? 'red' : '#203E86' }] }>
            <Text style={ [styles.iconWrapper, { marginLeft: 20, marginRight: 10 }] }>
              <Icon
                    name="commenting-o"
                    style={ styles.icon } />
            </Text>
            <TextInput
                       placeholder="请填写验证码"
                       style={ [styles.input, { width: 400 }] }
                       placeholderTextColor="#969696"
                       underlineColorAndroid="transparent"
                       keyboardType="numeric"
                       maxLength={ 6 }
                       onBlur={ this.checkVerifiCode }
                       onChangeText={ (text) => this.setState({
                                        verificode: text
                                      }) } />
            <TouchableOpacity
                              style={ { width: 250, height: 80, marginTop: 25, marginLeft: 40, backgroundColor: '#3A9AF5', justifyContent: 'center', alignItems: 'center', borderRadius: 10 } }
                              onPress={ this.sendVerifiCode }
                              disabled={ this.state.isSendCode }>
              <Text style={ { fontSize: 40, color: '#0C2956' } }>
                { this.state.isSendCode ? ('重新发送(' + this.state.seconds + ')') : '获取验证码' }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ [styles.formElement, { marginTop: 60, backgroundColor: 'transparent' }] }>
            <TouchableOpacity
                              style={ styles.loginButton }
                              onPress={ this.resetPwd }
                              disabled={ this.state.invalidCode ||
                                         !this.state.password || !this.state.verificode }>
              <Text style={ { fontSize: 40, color: '#0C2956' } }>
                确定修改
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Resolutions.FixFullView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1080,
    backgroundColor: '#000733',
    alignItems: 'center',
    justifyContent: 'center'
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
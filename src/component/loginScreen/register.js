import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Picker, KeyboardAvoidingView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Resolutions from '../../utils/resolutions';
var token;
export default class Register extends Component {
  constructor(props) {
    super(props);
    storage.load({
      key: 'loginState'
    }).then(ret => {
      token = ret.token;
    })
    this.state = {
      checked: true,
      areaCode: '86',
      seconds: 60,
      type: '1'
    };

    this.register = this.register.bind(this);
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
  register() {
    let nameInvalid = this.checkUserName();
    let pwdInvalid = this.checkPassword();
    if(nameInvalid || pwdInvalid || this.state.password !== this.state.passwordConfirm){
      let tips = '';
      tips += !nameInvalid ? '' : '用户名应为8-32位非空字符。';
      tips += !pwdInvalid ? '' : '密码应为8-32位非空字符。';
      tips += this.state.password === this.state.passwordConfirm ? '' : '两次密码输入需一致。';
      console.log(nameInvalid,pwdInvalid,this.state.password !== this.state.passwordConfirm);
      ToastAndroid.show(tips, ToastAndroid.SHORT);
      return;
    }
    fetch('http://120.78.205.55:8081/user/register', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: this.state.verificode,
        user: {
          userName: this.state.userName,
          pwd: this.state.password,
          telephone: this.state.mobile,
          refereeId: this.state.refereeId,
        }
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      if (jsonData.code === 200) {
        ToastAndroid.show('注册成功', ToastAndroid.SHORT);
        this.props.navigation.replace('login');
      } else {
        ToastAndroid.show(jsonData.message, ToastAndroid.SHORT);
      }
    }).catch(error => {

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

  checkPassword(){
    let invalid = !/^[\S]{8,32}$/.test(this.state.password);
    this.setState({
      invalidUserPwd: invalid
    });
    return invalid;
  }

  checkVerifiCode() {
    fetch(`${global.Config.FetchURL}/user/checkCode`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "mobile": this.state.mobile+'',
        "code": this.state.verificode+''
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      this.setState({
        invalidCode: jsonData.code === '0'
      })
      console.log(jsonData);
      console.log(JSON.stringify({
        "mobile": this.state.mobile+'',
        "code": this.state.verificode+''
      }))
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
          <KeyboardAvoidingView behavior="padding">
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
              <Text style={ styles.iconWrapper }>
                <Icon
                      name="lock"
                      style={ styles.icon } />
              </Text>
              <TextInput
                         placeholder="请再次填写登录密码"
                         style={ styles.input }
                         placeholderTextColor="#969696"
                         underlineColorAndroid="transparent"
                         secureTextEntry={ true }
                         onChangeText={ (text) => {
                                          this.setState({
                                            passwordConfirm: text,
                                          });
                                        } } />
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
            <View style={ [styles.formElement, { borderBottomWidth: 4, borderColor: '#203E86' }] }>
              <Text style={ [styles.iconWrapper, { marginLeft: 25, marginRight: 5 }] }>
                <Icon
                      name="user-plus"
                      style={ { color: '#3A9AF5', fontSize: 60 } } />
              </Text>
              <TextInput
                         placeholder="请填写推荐人的UID"
                         style={ styles.input }
                         placeholderTextColor="#969696"
                         underlineColorAndroid="transparent"
                         onChangeText={ (text) => this.setState({
                                          refereeId: text
                                        }) } />
            </View>
            <View style={ [styles.formElement, { marginTop: 60, backgroundColor: 'transparent' }] }>
              <TouchableOpacity
                                style={ styles.loginButton }
                                onPress={ this.register }
                                disabled={ this.state.invalidCode || !this.state.passwordConfirm ||
                                           !this.state.password || !this.state.verificode ||
                                           !this.state.refereeId }>
                <Text style={ { fontSize: 40, color: '#0C2956' } }>
                  注册
                </Text>
              </TouchableOpacity>
            </View>
            <View style={ [styles.formElement, { margin: 25, backgroundColor: 'transparent', flexDirection: 'row' }] }>
              <Text
                    style={ { borderWidth: 3, borderColor: 'white', height: 60, width: 60, marginLeft: 20, padding: 5 } }
                    onPress={ () => {
                                this.setState({
                                  checked: !this.state.checked
                                });
                              } }>
                <Icon
                      name={ checkIcon }
                      style={ { color: '#3A9AF5', fontSize: 50 } } />
              </Text>
              <Text style={ { color: 'white', fontSize: 40, marginLeft: 10 } }>
                我已阅读并同意
              </Text>
              <Text style={ { color: '#7C7C7C', fontSize: 40 } }>
                《用户注册使用协议》
              </Text>
            </View>
          </KeyboardAvoidingView>
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
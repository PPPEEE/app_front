/**
 * 修改昵称
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';

export default class modifyNick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      nickName: '',
      realName: '',
      gender: '保密',
      birthday: '',
      addr: '',
      mobile: '',
      showImg: false
    };
  }

  fetchUserInfo() {
    storage.load({
      key: 'loginState'
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/findUserInfo';
      const opts = {
        method: 'POST',
        headers: {
          'Accept': global.Config.Accept,
          'Content-Type': global.Config.ContentType,
          'token': ret.token
        },
      }
      fetch(url, opts)
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          this.setState( resJson.data );
        })
    })
  }
  _saveUserInfo = () => {
    if(this.state.nickName.length <= 0){
      ToastAndroid.show("请填写昵称", ToastAndroid.SHORT);
      return;
    }
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/updateUserInfo';
      const opt = {
        method: 'post',
        headers: {
          'Content-Type': global.Config.ContentType,
          'Accept': global.Config.Accept,
          'token': ret.token
        },
        body: JSON.stringify(this.state)
      }
      this._saveUserInfoReq(url, opt);
    });
  }
  _saveUserInfoReq(url, opt){
    fetch(url, opt)
    .then((response) => response.json())
    .then(responseData => {
      if (responseData.code == 200) {
        this.props.navigation.popToTop()
      } else {
        alert(responseData.message);
      }
    });
  }
  componentDidMount() {
    this.fetchUserInfo();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>昵称</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(nickName) => this.setState({nickName})}
                value={this.state.nickName}
                placeholderTextColor="#969696"
                underlineColorAndroid="transparent"
                placeholder="请填写您的新昵称"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={this._saveUserInfo}
                style={{ fontSize: 20, color: '#FFFFFF' }}>
                确定提交
              </Button>
            </ImageBackground>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    padding: 10
  },
  listLeft:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  txt: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    width: '35%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '65%',
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
  
});
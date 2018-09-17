/**
 * 转入
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Clipboard,
  Image,
} from 'react-native';
import Sicon from 'react-native-vector-icons/SimpleLineIcons';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

export default class trunIn extends Component {
  constructor() {
    super();
    this.state = {
      imageData: null,
      address: ''
    };
  }
  componentWillMount() {
    storage.load({
      key: 'userBasicInfo'
    }).then(ret => {
      this.setState({
        address: ret.address,
      })
    })
    this._fetchImageData()
  }
  _fetchImageData = () => {
    fetch(`${global.Config.FetchURL}/transfer/qrcode`, {
      method: 'get',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
    }).then((res) => {
      console.log(res);
      return res.blob();
    }).then((jsonData) => {
      const reader = new FileReader();
      reader.readAsDataURL(jsonData);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.setState({
          imageData: base64data
        });
      };
    });
  }
  _setClipboard = () => {
    Clipboard.setString(this.state.address);
    ToastAndroid.show("复制成功", ToastAndroid.SHORT);
  }

  render() {
    return (
      <ImageBackground source={require('../../images/user_bg.jpg')} style={{ flex: 1 }} >
        <View style={styles.container}>
          <Text style={styles.txt1}>扫描此二维码向我转账</Text>
          <View style={{backgroundColor: '#ffffff',padding:10,width: 300, height: 300}}>
            <Image
              style={{width: 280, height: 280}}
              source={{uri: this.state.imageData}}
            />
          </View>
          <Text style={styles.txt1}>钱包地址: {this.state.address}</Text>
          <ImageBackground source={require('../../images/Button_bg.jpg')} style={styles.buttonstyle} >
            <Button
              containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
              disabledContainerStyle={{ backgroundColor: '#441272' }}
              onPress={() => this._setClipboard()}
              style={{ fontSize: 20, color: '#FFFFFF' }}>
              复制钱包地址
            </Button>
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}



//样式
const styles = StyleSheet.create({
  txt1: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    margin: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10
  },
  buttonstyle: {
    height: 45, width: '90%', margin: '5%'
  }
});

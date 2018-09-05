/**
 * 微信支付绑定
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';


export default class ReceiptCode1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payType: 2,
      accountName: '',
      qrCode: '',
      accountId: '',
      showImg: false
    };
  }

  //选择图片
  _uploadPic(photo) {
    const data = new FormData();
    data.append('file', {
      uri: photo.path,
      type: photo.mime, // or photo.type
      name: photo.path.slice(photo.path.lastIndexOf('/') + 1)
    });
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/file/upload';
      const opt = {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': ret.token
        },
        body: data
      }
      this._uploadPicFetch(url, opt);
    });
  }

  //回显图片
  _uploadPicFetch(url, opt) {
    fetch(url, opt)
      .then((response) => response.json())
      .then(responseData => {
        this.setState({
          accountId: global.Config.FetchURL + '/upload/' + responseData.data,
          showImg: true
        })
      });
  }

  //点击上传图片
  _handleButtonPress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this._uploadPic(image)
    });
  };

  //保存用户信息
  _savePayInfo = () => {
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/saveUserPayInfo';
      const opt = {
        method: 'post',
        headers: {
          'Content-Type': global.Config.ContentType,
          'Accept': global.Config.Accept,
          'token': ret.token
        },
        body: JSON.stringify(this.state)
      }
      this._savePayInfoReq(url, opt);
    });
  }
  //保存用户信息请求fetch
  _savePayInfoReq(url, opt) {
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
    storage.load({
      key: 'userPayInfo',
    }).then(ret => {
      if (ret.alipay && ret.alipay.accountId) {
        ret.alipay.showImg = true;
      }
      this.setState(ret.alipay);
    });
  }


  render() {
    let hidderImg = this.state.showImg ?
      <TouchableOpacity style={styles.topInfo}
        onPress={this._handleButtonPress}>
        <Image source={{ uri: this.state.accountId }} style={styles.img} />
      </TouchableOpacity> :
      <Ionicons name="file-plus" size={120} color="white" onPress={this._handleButtonPress} />;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>支付宝收款姓名</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(accountName) => this.setState({ accountName })}
                value={this.state.accountName}
                underlineColorAndroid="transparent"
                placeholder="请填写您支付宝绑定的账户姓名"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>支付宝收款账号</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(qrCode) => this.setState({ qrCode })}
                value={this.state.qrCode}
                underlineColorAndroid="transparent"
                placeholder="请填写需要绑定的支付宝账号"
              />
            </View>
          </View>
          <View style={[styles.listOne, { height: 200 }]}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>支付宝收款二维码</Text>
              {hidderImg}
            </View>
          </View>

          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={this._savePayInfo}
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
  listLeft: {
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
  },
  img: {
    width: 160,
    height: 160
  }

});
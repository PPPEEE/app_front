/**
 * 个人资料
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-crop-picker';

export default class modifyUserInfo extends Component {  
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
        console.log(responseData);
        this.setState({
          avatar: responseData.data,
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
          if(resJson.data && resJson.data.avatar){
            resJson.data.showImg = true;
          }
          this.setState( resJson.data );
        })
    })
  }
  _saveUserInfo = () => {
    console.log(1,this.state);
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
  render(){
    let hidderImg = this.state.showImg ?
        <Image source={{ uri: global.Config.FetchURL + '/upload/' + this.state.avatar }} style={styles.img} />:
        <Image
          style={styles.img}
          source={require('../../../images/nohead.jpg')}
        />
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <TouchableOpacity style={[styles.listOne,{height: 90}]}
          onPress={this._handleButtonPress}>
            <Text style={styles.txt}>会员头像</Text>
            {hidderImg}
            </TouchableOpacity>
          <View style={styles.listOne}>
            <Text style={styles.txt}>会员昵称</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(nickName) => this.setState({nickName})}
              value={this.state.nickName}
              underlineColorAndroid="transparent"
              placeholderTextColor="#969696"
              placeholder="请填写您的新昵称"
            />
          </View>
          <View style={styles.listOne}>
            <Text style={styles.txt}>真实姓名</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(realName) => this.setState({realName})}
              value={this.state.realName}
              underlineColorAndroid="transparent"
              placeholderTextColor="#969696"
              placeholder="请填写您的姓名"
            />
          </View>
          <View style={styles.listOne}>
            <Text style={styles.txt}>性别</Text>
            <ModalDropdown options={[
                '男','女','保密',
              ]}
                style={{width: '100%'}}
                textStyle={{fontSize: 16, color: 'white'}}
                defaultValue={this.state.gender}
                dropdownTextStyle={{fontSize: 20,flex: 1}}
                onSelect={(index,value)=>this.setState({gender: value})}
              />
          </View>
          <View style={styles.listOne}>
            <Text style={styles.txt}>生日</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(birthday) => this.setState({birthday})}
              value={this.state.birthday}
              underlineColorAndroid="transparent"
              placeholderTextColor="#969696"
              placeholder="请填写您的生日"
            />
          </View>
          <View style={styles.listOne}>
            <Text style={styles.txt}>所在地区</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(addr) => this.setState({addr})}
              value={this.state.addr}
              underlineColorAndroid="transparent"
              placeholderTextColor="#969696"
              placeholder="请选择你所在地区"
            />
          </View>
          <View style={styles.listOne}>
            <Text style={styles.txt}>手机号码</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(mobile) => this.setState({mobile})}
              value={this.state.mobile}
              underlineColorAndroid="transparent"
              placeholder="请填写您的手机"
            />
          </View>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={this._saveUserInfo}
                style={{ fontSize: 20, color: '#FFFFFF' }}>
                确定提交
              </Button>
            </ImageBackground>
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
    height: 60,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  txt: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    width: '30%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '70%',
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonstyle: {
    height: 50, width: '90%', margin: '5%'
  },
  img: { width: 60, height: 60, borderRadius: 30, margin: '15%' }
});


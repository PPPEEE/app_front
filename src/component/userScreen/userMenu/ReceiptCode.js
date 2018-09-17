/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/SimpleLineIcons';
import Button from 'react-native-button';
import { SafeAreaView, createStackNavigator } from 'react-navigation';


export default class ReceiptCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weixin: '',
      alipay: '',
      card: '',
    };
  }

  //页面渲染完成后会主动回调该方法
  componentDidMount() {
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/findUserPayInfo';
      const opt = {
        method: 'post',
        headers:{
          'Content-Type': global.Config.ContentType,
          'Accept': global.Config.Accept,
          'token': ret.token
        },
      }
      fetch(url, opt)
        .then((response) => response.json())
        .then(responseData => {
          console.log(responseData.data);
          let weixin = null;
          let alipay = null;
          let card = null;
          for(var i=0; i< responseData.data.length;i++){
            if(responseData.data[i].payType == 1){
              weixin = responseData.data[i]
            }
            if(responseData.data[i].payType == 2){
              alipay = responseData.data[i]
            }
            if(responseData.data[i].payType == 3){
              card = responseData.data[i]
            }
          }
          this.addPayInfo(weixin, alipay, card)
          this.setState({weixin, alipay, card});
        });
    });
  }
  addPayInfo = (weixin, alipay, card) => {
    storage.save({
      key: 'userPayInfo',  // 注意:请不要在key中使用_下划线符号!
      data: {
        weixin: weixin,
        alipay: alipay,
        card: card,
      },
    });
  }

  onPress = (where) => {
    this.props.navigation.push(where);
  }
  render() {
    var isBindW = this.state.weixin == null ? <Text style={styles.txt}>未绑定</Text> : null ;
    var isBindA = this.state.alipay == null ? <Text style={styles.txt}>未绑定</Text> : null ;
    var isBindC = this.state.card == null ? <Text style={styles.txt}>未绑定</Text> : null ;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Image source={require('../../../images/WeChat.png')}/>
              <Text style={styles.txt}>微信支付</Text>
            </View>
            <TouchableOpacity style={styles.listLeft}
              onPress={() => this.onPress('ReceiptCode1')}>
              {isBindW}
              <Ionicons name="arrow-right" size={24} color="white"/>
            </TouchableOpacity>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Image source={require('../../../images/Alipay.png')}/>
              <Text style={styles.txt}>支付宝</Text>
            </View>
            <TouchableOpacity style={styles.listLeft}
              onPress={() => this.onPress('ReceiptCode2')}>
              {isBindA}
              <Ionicons name="arrow-right" size={24} color="white"/>
            </TouchableOpacity>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Image source={require('../../../images/BankCard.png')}/>
              <Text style={styles.txt}>银行卡</Text>
            </View>
            <TouchableOpacity style={styles.listLeft}
              onPress={() => this.onPress('ReceiptCode3')}>
              {isBindC}
              <Ionicons name="arrow-right" size={24} color="white"/>
            </TouchableOpacity>
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
    backgroundColor: '#441272',
    padding: 10
  },
  listLeft:{flexDirection: 'row',alignItems: 'center',},
  txt: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  }
  
});
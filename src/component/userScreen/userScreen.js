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
import Ionicons from 'react-native-vector-icons/Feather';
import EIcons from 'react-native-vector-icons/Entypo';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcons from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import { SafeAreaView, createStackNavigator } from 'react-navigation';


export default class userScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UID: null,
      level: null
    };
  }
  logout() {
    // storage.clearMapForKey('loginState');
    storage.remove({
      key: 'loginState'
    });
    storage.remove({
      key: 'userBasicInfo'
    });
    this.props.navigation.replace('login');
  }
  getUserInfo() {
    storage.load({
      key: 'userBasicInfo'
    }).then(ret => {
      let tempLevel;
      if(ret.level === 0){
        tempLevel = '临时会员';
      }else if(ret.level === 1){
        tempLevel = '普通会有';
      }else if(ret.level === 2){
        tempLevel = 'VIP会员';
      }
      this.setState({
        UID: ret.UID,
        level: tempLevel
      })
    })
  }

  //页面渲染完成后会主动回调该方法
  componentDidMount() {
    this.getUserInfo();
  }
  onPress = (where) => {
    this.props.navigation.push(where);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.top}>
            <TouchableOpacity style={styles.topInfo}
            onPress={() => this.onPress('modifyUserInfo')}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 30, margin: '15%' }}
                source={require('../../images/nohead.jpg')}
              />
            </TouchableOpacity>
            <View style={styles.topInfo}>
              <Text style={styles.font}>{'UID: ' + this.state.UID}</Text>
              <Text style={styles.font}>{'会员等级: ' + this.state.level}</Text>
            </View>
            <TouchableOpacity style={styles.topInfo}
              onPress={() => this.logout()}>
              <Ionicons name={'log-out'} style={styles.font}>退出登录</Ionicons>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.middle}>
            <View style={styles.listone}>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('modifyNick')}>
                <View style={{ flex: 1 }}>
                  <Ionicons name={'user'} style={styles.fontIcon}></Ionicons>
                  <Text style={styles.font}>昵称</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.one}>
                <FIcons name={'language'} style={styles.fontIcon}></FIcons>
                <Text style={styles.font}>多语言</Text>
              </View>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('myTeam')}>
                <View style={{ flex: 1 }}>
                  <FIcons name={'group'} style={styles.fontIcon}></FIcons>
                  <Text style={styles.font}>我的团队</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.listone}>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('ReceiptCode')}>
                <View style={{ flex: 1 }}>
                <FIcons name={'id-card-o'} style={styles.fontIcon}></FIcons>
                <Text style={styles.font}>我的收款账户</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.one}>
                <FIcons name={'bitcoin'} style={styles.fontIcon}></FIcons>
                <Text style={styles.font}>我的资产</Text>
              </View>
              <View style={styles.one}>
                <Ionicons name={'log-in'} style={styles.fontIcon}></Ionicons>
                <Text style={styles.font}>转入与提现</Text>
              </View>
            </View>
            <View style={styles.listone}>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('modifyPwd')}>
                <View style={{ flex: 1 }}>
                  <Ionicons name={'lock'} style={styles.fontIcon}></Ionicons>
                  <Text style={styles.font}>登录密码</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('modifyTPwd')}>
                <View style={{ flex: 1 }}>
                  <Ionicons name={'dollar-sign'} style={styles.fontIcon}></Ionicons>
                  <Text style={styles.font}>支付密码</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.one}>
                <MIcons name={'security'} style={styles.fontIcon}></MIcons>
                <Text style={styles.font}>安全设置</Text>
              </View>
            </View>
            <View style={styles.listone}>
              <View style={styles.one}>
                <Ionicons name={'rss'} style={styles.fontIcon}></Ionicons>
                <Text style={styles.font}>公告</Text>
              </View>
              <View style={styles.one}>
                <Ionicons name={'bell'} style={styles.fontIcon}></Ionicons>
                <Text style={styles.font}>个人消息</Text>
              </View>
              <View style={styles.one}>
                <EIcons name={'shop'} style={styles.fontIcon}></EIcons>
                <Text style={styles.font}>我的店铺</Text>
              </View>
            </View>
            <View style={styles.listone}>
              <TouchableOpacity style={styles.one}
                onPress={() => this.onPress('tradeScreen')}>
                <View style={{ flex: 1 }}>
                  <MIcons name={'file-document-box-outline'} style={styles.fontIcon}></MIcons>
                  <Text style={styles.font}>我的订单</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.one}>
                <EIcons name={'location'} style={styles.fontIcon}></EIcons>
                <Text style={styles.font}>地址管理</Text>
              </View>
              <View style={styles.one}>
                <EIcons name={'old-phone'} style={styles.fontIcon}></EIcons>
                <Text style={styles.font}>投诉建议</Text>
              </View>
            </View>
            <View style={styles.listone}>
              <View style={styles.one}>
                <EIcons name={'share'} style={styles.fontIcon}></EIcons>
                <Text style={styles.font}>分享</Text>
              </View>
              <View style={styles.one}>
                <FIcons name={'exclamation-circle'} style={styles.fontIcon}></FIcons>
                <Text style={styles.font}>关于</Text>
              </View>
            </View>
            <View style={styles.listone}>
              <ImageBackground source={require('../../images/Button_bg.jpg')} style={styles.buttonstyle} >
                <Button
                  containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                  disabledContainerStyle={{ backgroundColor: '#441272' }}
                  onPress={() => this.logout()}
                  style={{ fontSize: 20, color: '#FFFFFF' }}>
                  退出登录
                </Button>
              </ImageBackground>
            </View>
          </ScrollView>
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
  top: {
    flex: 0.167,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    backgroundColor: '#441272',
  },
  topInfo: {
    justifyContent: 'center',
    width: '33%',
    alignItems: 'stretch',
  },
  middle: {
    // backgroundColor: '#200b4a',
  },
  listone: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#381363',
  },
  one: {
    justifyContent: 'center',
    width: '32%',
    alignItems: 'stretch',
    padding: 24,
  },
  fontIcon: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  font: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
});
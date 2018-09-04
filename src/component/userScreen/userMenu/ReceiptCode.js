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
  
  // getUserInfo() {
    
  // }

  // //页面渲染完成后会主动回调该方法
  // componentDidMount() {
  //   // this.getUserInfo();
  // }
  onPress = (where) => {
    this.props.navigation.push(where);
  }
  render() {
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
              <Text style={styles.txt}>未绑定</Text>
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
              <Text style={styles.txt}>未绑定</Text>
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
              <Text style={styles.txt}>未绑定</Text>
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
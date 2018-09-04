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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import Button from 'react-native-button';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';


export default class ReceiptCode1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      count: '',
      image: null
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>开户银行</Text>
              <ModalDropdown options={[
                '中国工商银行',
                '中国建设银行',
                '中国农业银行',
                '中国民生银行',
                '中国银行',
                '招商银行',
                '平安银行',
                '上海浦发银行',
                '邮政储蓄',
                '交通银行',
              ]}
                style={{width: '100%'}}
                textStyle={{fontSize: 16, color: 'white'}}
                dropdownTextStyle={{fontSize: 16}}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>真实姓名</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(count) => this.setState({count})}
                value={this.state.count}
                underlineColorAndroid="transparent"
                placeholder="请填写开卡真实姓名"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>银行卡号</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(count) => this.setState({count})}
                value={this.state.count}
                underlineColorAndroid="transparent"
                placeholder="请填写需要绑定的银行卡号"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>开户支行</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(count) => this.setState({count})}
                value={this.state.count}
                underlineColorAndroid="transparent"
                placeholder="请填写该银行卡的开户支行"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
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
    width: '30%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '70%',
    fontSize: 16,
    color: '#777777'
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
  
});
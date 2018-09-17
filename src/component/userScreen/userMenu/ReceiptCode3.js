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
  ToastAndroid,
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
      userId:"",
      payType: 3,
      bank:"",
      accountName:"",
      qrCode:"",
      bankBranch:"",
    };
  }

  saveReceipt() {
    if(this.state.bank.length <= 0||this.state.accountName <= 0||this.state.qrCode <= 0||this.state.bankBranch <= 0){
      ToastAndroid.show('请填写完整资料', ToastAndroid.SHORT);
      return;
    }
    storage.load({
      key: 'loginState'
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/saveUserPayInfo';
      const opts = {
        method: 'POST',
        headers: {
          'Accept': global.Config.Accept,
          'Content-Type': global.Config.ContentType,
          'token': ret.token
        },
        body: JSON.stringify(this.state)
      }
      fetch(url, opts)
        .then((res) => res.json())
        .then((resJson) => { 
          if(resJson.code == 200){
            this.props.navigation.popToTop()
          }else{
            alert(resJson.message);
          }
        })
    })
  }

  componentDidMount() {
    storage.load({
      key: 'userPayInfo',
    }).then(ret => {
      this.setState(ret.card);
    });
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
                defaultValue={this.state.bank}
                dropdownTextStyle={{fontSize: 16}}
                onSelect={(index,value)=>this.setState({bank: value})}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>真实姓名</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(accountName) => this.setState({accountName})}
                value={this.state.accountName}
                underlineColorAndroid="transparent"
                placeholderTextColor="#969696"
                placeholder="请填写开卡真实姓名"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>银行卡号</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(qrCode) => this.setState({qrCode})}
                value={this.state.qrCode}
                underlineColorAndroid="transparent"
                placeholderTextColor="#969696"
                placeholder="请填写需要绑定的银行卡号"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>开户支行</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(bankBranch) => this.setState({bankBranch})}
                value={this.state.bankBranch}
                underlineColorAndroid="transparent"
                placeholderTextColor="#969696"
                placeholder="请填写该银行卡的开户支行"
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={()=>{this.saveReceipt()}}
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
    color: '#FFFFFF'
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
  
});
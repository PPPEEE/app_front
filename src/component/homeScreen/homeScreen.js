/**
 * 
 */
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Resolutions from '../../utils/resolutions';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var menus = [, {
  label: '转出',
  route: 'trunOut',
  icon: 'credit-card',
  key: '1'
}, {
  label: '转入',
  route: 'trunIn',
  icon: 'credit-card-plus',
  key: '2'
}, {
  label: '买入',
  route: 'publish',
  icon: 'cart',
  param: {
    whichState: 'buy'
  },
  key: '3'
}, {
  label: '卖出',
  route: 'publish',
  icon: 'cart-outline',
  param: {
    whichState: 'sale'
  },
  key: '4'
}, {
  label: '数字资产',
  route: '',
  icon: 'cash-usd',
  key: '5'
}, {
  label: '分享',
  route: '',
  icon: 'share-variant',
  key: '6'
}, {
  label: '兑换',
  route: '',
  icon: 'arrow-up-down-bold-outline',
  key: '7'
}, {
  label: '游戏',
  route: '',
  icon: 'gamepad-variant',
  key: '8'
}];


export default class homeScreen extends Component {
  constructor(props) {
    super();
    this.goPage = (item) => {
      if(item.route === 'trunOut'){
        this.props.navigation.navigate(item.route, {pe: this.state.pe});
      }else{
        this.props.navigation.navigate(item.route, item.param);
      }
    }
    this.scrollToView = (e) => {
      this.setState({
        opacity: 1 - e.nativeEvent.contentOffset.y / 700
      })

    }
    this.state = {
      initOpacity: 0,
      uid: '***',
      pe: '***',
      pv: '***'
    }

  }
  componentDidMount() {
    this._getPEPV();
  }
  async _getPEPV() {
    let cache = await storage.load({
      key: 'loginState'
    });
    let res = await fetch(`${global.Config.FetchURL}/balance/get`, {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": cache.token
      }
    })
    res = await res.json();
    let obj = {};
    for(var o in res.data){
      if(res.data[o].coinType === 0){
        obj.pe = res.data[o].balance;
      }else{
        obj.pv = res.data[o].balance;
      }
    }
    this.setState(obj)
    let userInfo = await storage.load({
      key: 'userDetailInfo'
    });

    this.setState({
      uid: userInfo.userId
    })

    setTimeout(() => {
      this.setState({
        initOpacity: 1
      })
    }, 1000)
  }

  render() {
    var head = global.userDetail && global.userDetail.avatar ? {
      uri: global.userDetail.avatar
    } : require('../../images/nohead.jpg');
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
        <NavigationEvents
          onDidFocus={payload => this._getPEPV()}
        />
          <StatusBar
                     translucent={ true }
                     backgroundColor='rgba(0,0,0,0)' />
          <ScrollView
                      onScroll={ this.scrollToView }
                      style={ { backgroundColor: 'rgb(51,11,84)' } }>
            <ImageBackground
                             source={ require('../../images/home2_bg.jpg') }
                             style={ { width: 1080, height: 1920, marginTop: 700, opacity: this.state.initOpacity } }>
              <View style={ { flexDirection: 'row', alignItems: 'center', height: 450 } }>
                <Image
                       source={ head }
                       style={ { height: 210, width: 210, borderRadius: 105, marginLeft: 60, borderWidth: 20, borderColor: '#44246D', } }></Image>
                <View style={ { marginLeft: 110 } }>
                  <Text style={ { color: 'white', fontSize: 36, marginLeft: 24 } }>
                    UID:
                    { ' ' + this.state.uid }
                  </Text>
                  <View style={ [styles.pvBar, { backgroundColor: 'rgba(72,13,121,0.3)', borderColor: 'rgb(128,80,161)' }] }>
                    <Icon
                          name={ 'lock' }
                          style={ { color: '#C17408', fontSize: 72, position: 'absolute', left: 15 } } />
                    <Text style={ { color: 'white', fontSize: 42, marginLeft: 24 } }>
                      PV
                      { ' ' + this.state.pv }
                    </Text>
                  </View>
                </View>
              </View>
              <View style={ { marginTop: 85, height: 410, borderRadius: 200, paddingTop: 120 } }>
                <Text style={ { color: 'white', fontSize: 65, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 } }>
                  区块链既服务
                </Text>
                <Text style={ { color: 'white', fontSize: 48, textAlign: 'center' } }>
                  让使用区块链技术像上网一样简单
                </Text>
              </View>
              <View style={ { marginTop: 100 } }>
                <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } }>
                  <Text style={ { borderWidth: 1, height: 2, width: 350, borderColor: 'rgb(111,13,158)' } }></Text>
                  <Text style={ { color: 'white', fontSize: 40, marginLeft: 40, marginRight: 40 } }>
                    便携入口
                  </Text>
                  <Text style={ { borderWidth: 1, height: 2, width: 350, borderColor: 'rgb(111,13,158)' } }></Text>
                </View>
                <View style={ { marginTop: 100, marginLeft: 70, width: 950, flexDirection: 'row', flexWrap: 'wrap' } }>
                  { menus.map((item, index) => {
                      return (<TouchableOpacity
                                                key={ 'homeButton' + index }
                                                style={ styles.homeButton }
                                                onPress={ () => {
                                                            item.route && this.goPage(item)
                                                          } }>
                                <MaterialCommunityIcons
                                                        name={ item.icon }
                                                        style={ styles.icon } />
                                <Text style={ { fontSize: 40, color: 'white', margin: 5 } }>
                                  { item.label }
                                </Text>
                              </TouchableOpacity>
                        );
                    }) }
                </View>
              </View>
            </ImageBackground>
            <ImageBackground
                             source={ require('../../images/home1_bg.jpg') }
                             style={ { width: 1080, height: 1920, position: 'absolute', opacity: this.state.opacity } }>
              <View style={ styles.content }>
                <View style={ { marginTop: 150, borderWidth: 20, borderColor: '#44246D', borderRadius: 125 } }>
                  <Image
                         style={ { width: 230, height: 230, borderRadius: 115 } }
                         source={ head } />
                </View>
                <Text style={ { fontSize: 55, color: 'white', height: 80, marginTop: 40 } }>
                  UID:
                  { ' ' + this.state.uid }
                </Text>
                <TouchableOpacity style={ styles.pvBar }
                  onPress={() => {
                    this.props.navigation.push('PVdetails');
                  }}>
                  <Icon
                        name={ 'lock' }
                        style={ { color: '#C17408', fontSize: 72, position: 'absolute', left: 15 } } />
                  <Text style={ { color: 'white', fontSize: 42, marginLeft: 24 } }>
                    PV
                    { ' ' + this.state.pv }
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ { marginTop: 85, width: 420, height: 410, borderRadius: 200, paddingTop: 100 } }
                  onPress={() => {
                    this.props.navigation.push('PEdetails');
                  }}>
                  <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', fontWeight: 'bold' } }>
                    PE
                  </Text>
                  <Text style={ { color: 'white', fontSize: 48, textAlign: 'center' } }>
                    { this.state.pe.toString().substr(0, 9) }
                  </Text>
                </TouchableOpacity>
                <View style={ { marginTop: 85, height: 410, borderRadius: 200, paddingTop: 100 } }>
                  <Text style={ { color: 'white', fontSize: 65, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 } }>
                    区块链既服务
                  </Text>
                  <Text style={ { color: 'white', fontSize: 48, textAlign: 'center' } }>
                    让使用区块链技术像上网一样简单
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </Resolutions.FixFullView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    fontSize: 80,
    color: 'white',
    margin: 5
  },
  pvBar: {
    borderColor: '#B694C6',
    borderWidth: 2,
    borderRadius: 20,
    width: 500,
    height: 96,
    backgroundColor: 'rgba(182,148,198,0.4)',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  homeButton: {
    height: 200,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 50
  }
});

/**
 * 
 */
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Resolutions from '../../utils/resolutions';
import Icon from 'react-native-vector-icons/EvilIcons'

export default class homeScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      uid: '1234567',
      pv: 13444.24115,
      pe: 55.75885555
    }
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
          <ImageBackground
                           source={ require('../../images/home1_bg.jpg') }
                           style={ { width: '100%', height: '100%' } }>
            <View style={ styles.content }>
              <View style={ { marginTop: 150, borderWidth: 20, borderColor: '#44246D', borderRadius: 125 } }>
                <Image
                       style={ { width: 230, height: 230, borderRadius: 115 } }
                       source={ require('../../images/nohead.jpg') } />
              </View>
              <Text style={ { fontSize: 55, color: 'white', height: 80, marginTop: 40 } }>
                UID:
                { this.state.uid }
              </Text>
              <View style={ styles.pvBar }>
                <Icon
                      name={ 'lock' }
                      style={ { color: '#C17408', fontSize: 72, position: 'absolute', left: 15 } } />
                <Text style={ { color: 'white', fontSize: 42, marginLeft: 24 } }>
                  PV&nbsp;{ this.state.pv }
                </Text>
              </View>
              <View style={ { marginTop: 85, width: 420, height: 410, borderRadius:200, paddingTop: 100} }>
                <Text style={ { color: 'white', fontSize: 60, textAlign: 'center',fontWeight: 'bold'} }>
                  PE
                </Text>
                <Text style={ { color: 'white', fontSize: 48, textAlign: 'center' } }>
                  { this.state.pe.toString().substr(0, 9) }
                </Text>
              </View>
              <View style={ { marginTop: 85, height: 410, borderRadius:200, paddingTop: 100} }>
                <Text  style={ { color: 'white', fontSize: 65, textAlign: 'center',fontWeight: 'bold',marginBottom: 10} }>区块链既服务</Text>
                <Text  style={ { color: 'white', fontSize: 48, textAlign: 'center' } }>让使用区块链技术像上网一样简单</Text>
              </View>
            </View>
          </ImageBackground>
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
  pvBar: {
    borderColor: '#B694C6',
    borderWidth: 2,
    borderRadius: 20,
    width: 540,
    height: 96,
    backgroundColor: 'rgba(182,148,198,0.4)',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';

export default class MainPage extends Component {

  componentDidMount() {
    setTimeout(() => this.props.navigation.replace('main'), 1000);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('./images/backgroundImg.jpg')} style={{width: '100%', height: '100%'}} >
          <View style={styles.content}>
            <Button
              containerStyle={{padding:10, height:45, width:'90%', margin:'5%', overflow:'hidden', borderRadius:4, backgroundColor: '#441272'}}
              disabledContainerStyle={{backgroundColor: '#441272'}}
              style={{fontSize: 20, color: '#FFFFFF'}}>
              onPress={() => this.props.navigation.replace('main')}
              欢迎进入DCCB
          </Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
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
    justifyContent: 'center',
  }
});
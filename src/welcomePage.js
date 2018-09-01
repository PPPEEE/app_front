/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

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
              title="欢迎进入DCCB"
              color="#FFFFFF"
              onPress={() => this.props.navigation.replace('main')}
            />
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
/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class homeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../images/backgroundImg.jpg')} style={{width: '100%', height: '100%'}} >
          <View style={styles.content}>
            <Button
              title="homeScreen"
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

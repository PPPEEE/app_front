/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';

export default class entrust extends Component {

  render() {
    return (
          <View style={ styles.content }>
            <Button
              containerStyle={ { padding: 10, height: 45, width: '90%', margin: '5%', overflow: 'hidden', borderRadius: 4, backgroundColor: '#441272' } }
              disabledContainerStyle={ { backgroundColor: '#441272' } }
              style={{ fontSize: 20, color: '#FFFFFF' }}
              onPress={ () => this.props.navigation.replace('main') } 
              >欢迎进入买单
            </Button>
          </View>
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


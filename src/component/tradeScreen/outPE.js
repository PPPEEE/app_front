/**
 * 转入
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView
} from 'react-native';

export default class scanCode extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={{fontSize: 14}}> 您的PE </Text>
        </View>
        <View style={}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
          >
          <Text style={{fontSize: 14}}> 转账数量 </Text>
          <Text style={{fontSize: 14}}> 收款账户 </Text>
          <Text style={{fontSize: 14}}> 下一步 </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

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
          <Text style={{fontSize: 14}}> 图片 </Text>
        </View>
        <View style={}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
          >
          <Text style={{fontSize: 14}}> 保存二维码 </Text>
          <Text style={{fontSize: 14}}> 复制钱包地址 </Text>
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

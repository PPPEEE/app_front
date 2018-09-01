/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';


export default class allTrade extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Button
              title="homeScreen"
              color="#FFFFFF"
              onPress={() => this.props.navigation.replace('main')}
            />
          </View>
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
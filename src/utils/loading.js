import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet, App } from 'react-native'

export default class Loading extends Component {
  render() {
    if (this.props.animating) {
      return (
        <View style={ styles.container }>
          <ActivityIndicator
                             animating={ this.props.animating || false }
                             style={ this.props.style || {} }
                             size={ this.props.size || 90 }
                             color="rgb(81,22,148)" />
        </View>
      )
    }else{
    	return(null);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(69,21,114,0.3)',
    position: 'absolute',
    height: '100%',
    zIndex: 100
  }
});

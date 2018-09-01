import React, { Component, PropTypes } from 'react';
import { Dimensions, PixelRatio, Platform, StatusBar, View } from 'react-native';

let props = {};
export default class Resolution {
  static get(useFixWidth = true) {
    return useFixWidth ? {
      ...props.fw
    } : {
      ...props.fh
    }
  }

  static setDesignSize(dwidth = 1080, dheight = 1920, dim = "window") {
    let designSize = {
      width: dwidth,
      height: dheight
    };

    let navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;
    let pxRatio = PixelRatio.get(dim);
    let {width, height} = Dimensions.get(dim);
    if (dim != "screen")
      height -= navHeight;
    let w = PixelRatio.getPixelSizeForLayoutSize(width);
    let h = PixelRatio.getPixelSizeForLayoutSize(height);

    let fw_design_scale = designSize.width / w;
    fw_width = designSize.width;
    fw_height = h * fw_design_scale;
    fw_scale = 1 / pxRatio / fw_design_scale;

    let fh_design_scale = designSize.height / h;
    fh_width = w * fh_design_scale;
    fh_height = designSize.height;
    fh_scale = 1 / pxRatio / fh_design_scale;

    let fs_design_scale = Math.sqrt((Math.pow(designSize.width, 2) + Math.pow(designSize.height, 2))) / Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)));
    fs_scale = 1 / pxRatio / fs_design_scale;

    props.fw = {
      width: fw_width,
      height: fw_height,
      scale: fw_scale,
      navHeight
    };
    props.fh = {
      width: fh_width,
      height: fh_height,
      scale: fh_scale,
      navHeight
    };
    
    props.fs = {
      width: designSize.width,
      height: designSize.height,
      scaleX: fw_scale,
      scaleY: fh_scale,
      navHeight
    }
  }

  static FixWidthView = (p) => {
    let {width, height, scale, navHeight} = props.fw;
    return (
      <View
            {...p}
            style={ { marginTop: navHeight, width: width, height: height, backgroundColor: 'transparent', transform: [{ translateX: -width * .5 }, { translateY: -height * .5 }, { scale: scale }, { translateX: width * .5 }, { translateY: height * .5 }] } }>
      </View>
      );
  };

  static FixHeightView = (p) => {
    let {width, height, scale, navHeight} = props.fh;
    return (
      <View
            {...p}
            style={ { marginTop: navHeight, width: width, height: height, backgroundColor: 'transparent', transform: [{ translateX: -width * .5 }, { translateY: -height * .5 }, { scale: scale }, { translateX: width * .5 }, { translateY: height * .5 }] } }>
        { p.children }
      </View>
      );
  };

  static FixFullView = (p) => {
    let {width, height, scaleX, scaleY, navHeight} = props.fs;
    return (
      <View
            {...p}
            style={ {width: width, height: height, backgroundColor: 'transparent', transform: [{ translateX: -width * .5 }, { translateY: -height * .5 }, { scaleX: scaleX }, { scaleY: scaleY }, { translateX: width * .5 }, { translateY: height * .5 }] } }>
        { p.children }
      </View>
      );
  };
}
;
//init
Resolution.setDesignSize();
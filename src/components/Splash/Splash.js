import React from 'react';
import {View, Animated, Easing, Image, Dimensions, Text} from 'react-native';
import {CustomSpacing, Layout, Colors, Fonts} from '@styles';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');

import {loadingIndicator, splashBg, LoadingJson} from '@assets';

const Splash = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[{backgroundColor: Colors.primaryMain}, Layout.heightFull]}>
      <Image style={{width: width, height: height}} source={splashBg} />
      <Animated.Image
        style={{
          transform: [{rotate: spin}],
          position: 'absolute',
          top: '85%',
          left: '43%',
          width: CustomSpacing(60),
          height: CustomSpacing(60),
        }}
        source={loadingIndicator}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: CustomSpacing(32),
          }}>
          <Text
            style={[
              Fonts.textMBold,
            ]}>{`Version ${DeviceInfo.getVersion()}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Splash;

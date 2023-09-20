import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {Spacer} from '@components';

import {loadingGlobal} from '@assets';

import * as Animatable from 'react-native-animatable';

const LoadingOverlay = ({showing, text = 'Loading'}) => {
  const [shouldRender, setShouldRender] = useState(false);
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

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!showing) {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    } else {
      setShouldRender(true);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showing]);

  if (!shouldRender) return null;

  return (
    <Animatable.View
      duration={400}
      easing="ease-out"
      animation={showing ? 'fadeIn' : 'fadeOut'}
      useNativeDriver
      style={[
        StyleSheet.absoluteFillObject,
        Layout.flexCenterMid,
        {
          backgroundColor: Colors.neutral10,
          padding: CustomSpacing(16),
        },
      ]}>
      <Animatable.View
        duration={400}
        easing="ease-out"
        animation={'fadeIn'}
        useNativeDriver
        style={[Layout.flexCenterMid]}>
        <Animated.Image
          style={{
            width: CustomSpacing(300),
            height: CustomSpacing(200),
          }}
          source={loadingGlobal}
        />
        <Spacer height={CustomSpacing(50)} />
        <Text style={[Fonts.headingSBold]}>{text}</Text>
        <Text style={[Fonts.headingMBold]}>Wait for a minutes</Text>
        <Text style={[Fonts.textM, {color: Colors.neutral70}]}>
          This may take a few seconds. Please wait.
        </Text>
        <Spacer height={CustomSpacing(50)} />
        <ActivityIndicator size={'large'} color={Colors.secondaryMain} />
      </Animatable.View>
    </Animatable.View>
  );
};

export default LoadingOverlay;

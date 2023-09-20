import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {HStack, VStack} from '@components';
import {useDispatch} from 'react-redux';

import {
  loadingGlobal,
  AcceptCallIcon,
  DeclineCallIcon,
  MuteCallIcon,
  SpeakerCallIcon,
  ProfilePic,
} from '@assets';
import {dimensions} from '@config/Platform.config';
import {MAIN_CONSTANT} from '../../pages/Main/Main.constant';

import * as Animatable from 'react-native-animatable';
import styles from './CallOverlay.style';

const CallOverlay = ({showing}) => {
  const dispatch = useDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  const spinValue = new Animated.Value(0);
  const componentStyles = styles();
  const [activeCall, setActiveCall] = useState(false);
  const [connected, setConnected] = useState(false);
  const [duration, setDuration] = useState(0);

  const renderNavActiveCall = [
    {
      title: 'Mute',
      img: MuteCallIcon,
      function: () => console.log('Mute Call'),
    },
    {
      title: 'Speaker',
      img: SpeakerCallIcon,
      function: () => console.log('Speaker Call'),
    },
    {
      title: 'End',
      img: DeclineCallIcon,
      function: () => {
        setActiveCall(false);
        setConnected(false);
        dispatch({type: MAIN_CONSTANT.SET_CALL_STATUS, payload: false});
      },
    },
  ];

  const renderNavCall = [
    {
      title: 'Decline',
      img: DeclineCallIcon,
      function: () => {
        dispatch({type: MAIN_CONSTANT.SET_CALL_STATUS, payload: false});
      },
    },
    {
      title: 'Accpet',
      img: AcceptCallIcon,
      function: () => {
        setActiveCall(true);
        setTimeout(() => {
          setConnected(true);
        }, 2000);
      },
    },
  ];

  useEffect(() => {
    if (connected === true) {
      setTimeout(() => setDuration(duration + 1), 1000);
    }
  }, [duration, connected]);

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
      animation={showing ? 'bounceInUp' : 'bounceOutDown'}
      useNativeDriver
      style={[
        StyleSheet.absoluteFillObject,
        Layout.flexCenterMid,
        {
          backgroundColor: Colors.neutral10,
          padding: CustomSpacing(16),
          justifyContent: 'center',
          flexDirection: 'column',
          paddingVertical: CustomSpacing(50),
        },
      ]}>
      <Animatable.View
        duration={400}
        easing="ease-out"
        animation={'fadeIn'}
        useNativeDriver
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <VStack style={Layout.flexCenter}>
          <Animated.Image
            style={{
              width: CustomSpacing(150),
              height: CustomSpacing(150),
              borderRadius: CustomSpacing(100),
              marginBottom: CustomSpacing(10),
            }}
            source={ProfilePic}
          />
          <Text style={{...Fonts.headingMBold, color: Colors.neutral90}}>
            Rebecha
          </Text>
          {!activeCall ? (
            <Text style={componentStyles.textCallStatus}>Ringing...</Text>
          ) : (
            <Text style={componentStyles.textCallStatus}>
              {!connected ? 'Connecting...' : `00:${duration}`}
            </Text>
          )}
        </VStack>
        <HStack
          style={{
            justifyContent: 'space-between',
            width: dimensions.screenWidth,
            paddingHorizontal: CustomSpacing(35),
          }}>
          {activeCall ? (
            <>
              {renderNavActiveCall.map((e, i) => (
                <VStack
                  key={`bottom-active-nav-call-${i}`}
                  style={Layout.flexCenter}>
                  <TouchableOpacity onPress={e.function}>
                    <Image
                      source={e.img}
                      style={{
                        width: CustomSpacing(74),
                        height: CustomSpacing(74),
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{e.title}</Text>
                </VStack>
              ))}
            </>
          ) : (
            <>
              {renderNavCall.map((e, i) => (
                <VStack key={`bottom-nav-call-${i}`} style={Layout.flexCenter}>
                  <TouchableOpacity onPress={e.function}>
                    <Image
                      source={e.img}
                      style={{
                        width: CustomSpacing(74),
                        height: CustomSpacing(74),
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{e.title}</Text>
                </VStack>
              ))}
            </>
          )}
        </HStack>
      </Animatable.View>
    </Animatable.View>
  );
};

export default CallOverlay;

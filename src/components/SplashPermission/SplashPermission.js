import React from 'react';
import {Text, PermissionsAndroid, StyleSheet, Platform} from 'react-native';
import {CustomSpacing, Colors, Fonts} from '@styles';
import * as Animatable from 'react-native-animatable';

import Geolocation from 'react-native-geolocation-service';
import FastImage from 'react-native-fast-image';
import styles from '../Splash/Splash.style';
import {useSelector, useDispatch} from 'react-redux';
import MapboxGL from '@rnmapbox/maps';
import {Spacer, VStack, Button} from '@components';
import {NeedLocationAccess} from '@assets';
import {MAIN_CONSTANT} from '@pages/Main/Main.constant';

const SplashPermission = () => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const {location} = useSelector((state) => state.main);
  const requestLocationPermission = async () => {
    console.log('masik1');
    if (Platform.OS === 'ios') {
      try {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted === 'granted') {
          dispatch({
            type: MAIN_CONSTANT.SET_PERMISSION_LOCATION_STATUS,
            payload: true,
          });

          return true;
        } else {
          dispatch({
            type: MAIN_CONSTANT.SET_PERMISSION_LOCATION_STATUS,
            payload: false,
          });

          return false;
        }
      } catch (err) {
        console.log('Permission error', err);

        return false;
      }
    } else {
      console.log('masik2');
      try {
        const isGranted = await MapboxGL.requestAndroidLocationPermissions();
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('masik3');
        if (granted === 'granted' && isGranted) {
          dispatch({
            type: MAIN_CONSTANT.SET_PERMISSION_LOCATION_STATUS,
            payload: true,
          });
          return true;
        } else {
          dispatch({
            type: MAIN_CONSTANT.SET_PERMISSION_LOCATION_STATUS,
            payload: false,
          });

          return false;
        }
      } catch (err) {
        console.log('Permission error', err);

        return false;
      }
    }
  };

  const getLocation = async () => {
    const result = await requestLocationPermission();
    console.log('resultsss=>>>', result);
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            dispatch({
              type: MAIN_CONSTANT.GET_LOCATION_SUCCESS,
              payload: {
                timestamp: 1673513558946,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
              },
            });
            dispatch({
              type: MAIN_CONSTANT.SET_MOCKED_GPS_DATA,
              payload: position.mocked,
            });
            console.log('UPDATE', position);
          },
          (error) => {
            dispatch({
              type: MAIN_CONSTANT.GET_LOCATION_FAILED,
              payload: error,
            });
            console.log('ERROR UPDATE');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 100000},
        );
      } else {
        console.log('No Permission');
      }
    });
    console.log(location);
  };
  return (
    <Animatable.View
      duration={200}
      easing="ease-out"
      animation={'fadeIn'}
      useNativeDriver
      style={[
        StyleSheet.absoluteFillObject,
        {
          position: 'absolute',
          backgroundColor: Colors.backgroundMain,
        },
      ]}>
      <Animatable.View
        duration={500}
        easing="ease-out"
        animation={'bounceInUp'}
        useNativeDriver
        style={componentStyles.callContainer}>
        <VStack
          style={{
            padding: CustomSpacing(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spacer height={CustomSpacing(2)} />
          <Text style={[Fonts.headingS, {textAlign: 'center'}]}>
            Location access is important
          </Text>
          <Spacer height={CustomSpacing(18)} />

          <Text style={[Fonts.textM, {textAlign: 'justify'}]}>
            Hayuq require your location permission to prevent fraud actions
            while using the app.
          </Text>
          <Spacer height={CustomSpacing(4)} />
          <Text style={[Fonts.textM, {textAlign: 'justify'}]}>
            For better user experience Hayuq request the location access to be
            able to show the restaurants around your area
          </Text>
          <Spacer height={CustomSpacing(2)} />
          <FastImage
            source={NeedLocationAccess}
            style={{
              width: CustomSpacing(256),
              height: CustomSpacing(256),
            }}
          />
          <Spacer height={CustomSpacing(64)} />
          <Button
            style={{
              width: '100%',
            }}
            onPress={() => getLocation()}>
            <Text
              style={{
                ...Fonts.textMBold,
                paddingVertical: CustomSpacing(7),
                paddingHorizontal: CustomSpacing(30),
              }}>
              Request Location Permission
            </Text>
          </Button>
        </VStack>
      </Animatable.View>
    </Animatable.View>
  );
};

export default SplashPermission;

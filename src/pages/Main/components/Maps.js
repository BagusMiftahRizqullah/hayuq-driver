import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import t from '@lang';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-unlock-slider';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import {useStores} from '@store/root.store';
import Numbro from '@utils/numbro';
// import MapView, {
//   Marker,
//   Callout,
//   PROVIDER_GOOGLE,
//   PROVIDER_DEFAULT,
// } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Lottie from 'lottie-react-native';

import {VStack, HStack, Button, Spacer, ModalBottom} from '@components';
// import {dimensions} from '@config/Platform.config';
import {Colors, CustomSpacing, Fonts} from '@styles';
import {MAIN_CONSTANT} from '../Main.constant';

import {
  RecenterIcon,
  ProfilePic,
  Onlineicon,
  Offlineicon,
} from '@assets';
import * as Animatable from 'react-native-animatable';

import styles from './Maps.style';
import {SwipeAnimation} from '../../../../assets';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver`',
  'Warning: Failed prop type:',
]);

Logger.setLogCallback((log) => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

// MapboxGL.setAccessToken(
//   'sk.eyJ1IjoiaGF5dXEiLCJhIjoiY2xjc3E3MjNhMHM1NzNxbXNkamZidHo5cyJ9.cIYZr3Q6oiDJYORSAtHXpA',
// );

const Maps = ({handleModalStatusDriver, isDriverOnline, onMapLoaded}) => {
  const {location, driverDetail} = useSelector(
    (state) => state.main,
  );
  const navigation = useNavigation();
  const [showing, setShowing] = useState(false);
  const componentStyles = styles();
  const dispatch = useDispatch();
  const [recenter, setRecenter] = useState('compass');
  const [ErningDatas, setErningDatas] = useState(null);
  const [updateLocationAlert, setUpdateLocationAlert] = useState(false)
  const {earningStore, mainStore} = useStores();

  useEffect(() => {
    if (earningStore.getEarningData !== null) {
      setErningDatas(earningStore.getEarningData);
    }
  }, [earningStore.getEarningData]);

  const handleShowing = () => {
    setShowing(!showing);
  };

  const handleUpdateLocation = () => {
    const drivers_id = mainStore.driverId;
    console.log('UPDATE LOCATION FROM MAIN');
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION,
          payload: {
            drivers_id: drivers_id,
            lat: String(position.coords.latitude),
            long: String(position.coords.longitude),
          },
        });
      },
      (error) => {
        console.log('ERROR UPDATE', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 100000},
    );
  }

  const goToMyLocation = async () => {
    if (isDriverOnline) {
      if (recenter === 'compass') {
        setRecenter('course');
      } else {
        setRecenter('compass');
      }
      handleUpdateLocation()
    } else {
      setUpdateLocationAlert(true)
    }
  };

  const closeAlertUpdateLocation = () => {
    setUpdateLocationAlert(false)
  }

  const goToEarning = () => {
    handleShowing();
    navigation.navigate('Earning');
  };

  const parseRatingDriver = () => {
    const rating = earningStore.getDriverRatingData?.average?.toString()
    return rating?.substr(0,3) || 0
  }
  const goToRating = () => {
    // pindah ke halaman RATING
    // navigation.navigate('OnGoingOrder');
  };

  useEffect(() => {
    MapboxGL.locationManager.start();

    return (): void => {
      MapboxGL.locationManager.stop();
    };
  }, []);

  const handleCheckFakeGps = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: MAIN_CONSTANT.SET_MOCKED_GPS_DATA,
          payload: position.mocked
        })
        console.log('position', position);
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
  }

  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     (position) => {
  //       dispatch({
  //         type: MAIN_CONSTANT.GET_LOCATION_SUCCESS,
  //         payload: position.coords,
  //       });
  //       console.log('UPDATE', position);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 10,
  //       interval: 120000,
  //       useSignificantChanges: false,
  //     },
  //   );
  //   return () => Geolocation.clearWatch(watchId);
  // }, []);

  return (
    <VStack
      style={{
        flex: 1,
      }}>
      <MapboxGL.MapView
        onDidFinishLoadingMap={() => {
          onMapLoaded();
          setRecenter('course');
        }}
        key="mainmap"
        styleURL={'mapbox://styles/mapbox/navigation-preview-day-v4'}
        style={{
          flex: 1,
        }}
        onRegionDidChange={() => {
          handleCheckFakeGps();
          handleUpdateLocation();
        }}
        logoEnabled={false}
        attributionEnabled={false}
        showUserLocation={true}>
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [location.longitude, location.latitude],
            zoomLevel: 17,
          }}
          followZoomLevel={17}
          followPitch={45}
          animationMode="flyTo"
          animationDuration={400}
          centerCoordinate={[location.longitude, location.latitude]}
          zoomLevel={17}
          followUserLocation
          triggerKey={location.longitude}
          followUserMode={recenter}
          allowUpdates={true}
        />
        <MapboxGL.UserLocation
          visible
          animated
          renderMode={'normal'}
          showsUserHeadingIndicator
          androidRenderMode={'normal'}
          minDisplacement={100}
          onUpdate={(position) => {
            dispatch({
              type: MAIN_CONSTANT.GET_LOCATION_SUCCESS,
              payload: {
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
              },
            });
          }}
        />
      </MapboxGL.MapView>

      <VStack style={componentStyles.driverbtn}>
        <TouchableOpacity activeOpacity={0.9} onPress={goToRating}>
          <Image
            source={{uri: driverDetail?.driverprofile?.path}}
            style={componentStyles.driverImg}
            defaultSource={ProfilePic}
          />
          <VStack style={componentStyles.reviewDriver}>
            <Text style={{color: Colors.dangerMain, ...Fonts.textXsBold}}>
              {parseRatingDriver()}
            </Text>
          </VStack>
        </TouchableOpacity>
      </VStack>

      <VStack style={componentStyles.profitbtn}>
        <VStack
          style={{
            alignItems: 'flex-end',
          }}>
          <Button
            style={{
              width: CustomSpacing(80),
              backgroundColor: Colors.primaryMain,
            }}
            onPress={() => {
              setShowing(true);
            }}>
            <HStack>
              <Text
                style={{
                  ...Fonts.textSBold,
                }}>
                Profit
              </Text>
              <Spacer width={CustomSpacing(5)} />
              <Icon
                name="chevron-right"
                size={CustomSpacing(10)}
                color={Colors.neutral90}
              />
            </HStack>
          </Button>
          <Spacer height={CustomSpacing(10)} />
          <Animatable.View
            duration={400}
            easing="ease-out"
            animation={showing ? 'bounceInRight' : 'bounceOutRight'}
            useNativeDriver>
            <VStack
              style={{
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: CustomSpacing(25),
                  height: CustomSpacing(25),
                  backgroundColor: Colors.primaryMain,
                  borderRadius: CustomSpacing(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleShowing}>
                <Icon
                  name="close"
                  size={CustomSpacing(15)}
                  color={Colors.neutral90}
                />
              </TouchableOpacity>
            </VStack>
            <Spacer height={CustomSpacing(10)} />
            <TouchableOpacity activeOpacity={0.9} onPress={goToEarning}>
              <HStack
                style={{
                  backgroundColor: Colors.neutral10,
                  padding: CustomSpacing(10),
                  borderRadius: CustomSpacing(10),
                }}>
                <VStack>
                  <Text style={[Fonts.textMBold]}>Income</Text>
                  <Text style={[Fonts.textS]}>
                    Rp. {Numbro.formatCurrency(ErningDatas?.total)}
                  </Text>
                  <Spacer height={CustomSpacing(10)} />
                  <Text style={[Fonts.textMBold]}>Balance</Text>
                  <Text style={[Fonts.textS]}>
                    Payyuq: Rp {Numbro.formatCurrency(driverDetail.driverWallets?.amount) ?? 0}
                  </Text>
                </VStack>
                <Spacer width={CustomSpacing(10)} />
                <Icon
                  name="chevron-right"
                  size={CustomSpacing(10)}
                  color={Colors.neutral90}
                />
              </HStack>
            </TouchableOpacity>
          </Animatable.View>
        </VStack>
      </VStack>

      <VStack style={componentStyles.sliderContainer}>
        <HStack>
          <Slider
            useNativeDriver={true}
            isLeftToRight={isDriverOnline ? false : true} // set false to move slider Right to Left
            slideOverStyle={{
              backgroundColor: isDriverOnline
                ? Colors.dangerMain
                : Colors.successMain,
              borderRadius: CustomSpacing(100),
            }}
            onEndReached={handleModalStatusDriver}
            isOpacityChangeOnSlide={true}
            containerStyle={[
              componentStyles.containerSlider,
              {
                backgroundColor: isDriverOnline
                  ? Colors.successMain
                  : Colors.dangerMain,
              },
            ]}
            thumbElement={
              <Image
                style={{
                  width: CustomSpacing(42),
                  height: CustomSpacing(42),
                  borderRadius: CustomSpacing(100),
                }}
                resizeMode="contain"
                source={isDriverOnline ? Onlineicon : Offlineicon}
              />
            }>
            <HStack
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isDriverOnline ? (
                <Lottie
                  source={SwipeAnimation}
                  style={{
                    width: CustomSpacing(75),
                    height: CustomSpacing(75),
                    transform: [
                      {
                        rotate: '-45deg',
                      },
                    ],
                  }}
                  autoPlay
                  loop
                  duration={1500}
                />
              ) : (
                <Spacer width={CustomSpacing(75)} />
              )}

              <Text
                style={[
                  Fonts.headingXsBold,
                  {color: Colors.neutral10, marginTop: CustomSpacing(2)},
                ]}>
                {isDriverOnline ? 'Online' : 'Offline'}
              </Text>
              {isDriverOnline ? (
                <Spacer width={CustomSpacing(75)} />
              ) : (
                <Lottie
                  source={SwipeAnimation}
                  style={{
                    width: CustomSpacing(75),
                    height: CustomSpacing(75),
                    transform: [
                      {
                        rotate: '45deg',
                      },
                    ],
                  }}
                  autoPlay
                  loop
                  duration={1500}
                />
              )}
            </HStack>
          </Slider>
          <Spacer width={CustomSpacing(10)} />
          <TouchableOpacity activeOpacity={0.5} onPress={goToMyLocation}>
            <Image
              source={RecenterIcon}
              style={{
                width: CustomSpacing(52),
                height: CustomSpacing(52),
              }}
            />
          </TouchableOpacity>
        </HStack>
      </VStack>

      <ModalBottom
        isVisible={updateLocationAlert}
        type="bottom">
        <VStack padding={CustomSpacing(14)}>
          <VStack vertical={CustomSpacing(10)}>
            <VStack>
              <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
                Sorry
              </Text>
              <Spacer height={CustomSpacing(10)} />
              <Text
                style={{
                  ...Fonts.textM,
                  color: Colors.neutral70,
                  textAlign: 'center'
                }}
              >
                To use update location you must be online
              </Text>
              <Spacer height={CustomSpacing(30)} />
              <Button onPress={closeAlertUpdateLocation}>
                <Text style={{...Fonts.textMBold}}>Understand</Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </ModalBottom>
    </VStack>
  );
};

export default Maps;


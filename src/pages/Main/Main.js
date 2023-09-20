import React, {useState, useEffect, useRef} from 'react';
import {View, Text, AppState} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Sound from 'react-native-sound';

import {
  VStack,
  HStack,
  HeaderNavigation,
  Button,
  ModalBottom,
  Spacer,
} from '@components';
import {dimensions} from '@config/Platform.config';
import {socketDriver} from '@config';
import {MAIN_CONSTANT} from './Main.constant';
import {AUTH_CONSTANT} from '../Auth/Auth.constant';
import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import Maps from './components/Maps';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import driver_notification from '@assets/driver_notification.mp3';
import CONFIG from '@config';
// import styles from './Main.style';
import BackgroundTimer from 'react-native-background-timer';
import styles from './components/Maps.style';

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

Sound.setCategory('Playback');
var ding = new Sound(driver_notification, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
  );
});

const Main = observer(() => {
  const {mainStore, earningStore, profileStore} = useStores();
  MapboxGL.setAccessToken(
    'sk.eyJ1IjoiaGF5dXEiLCJhIjoiY2xjc3E3MjNhMHM1NzNxbXNkamZidHo5cyJ9.cIYZr3Q6oiDJYORSAtHXpA',
  );
  const componentStyles = styles();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [isFakeGps, setIsFakeGps] = useState(false);
  const [counter, setCounter] = useState(10);
  const [isModalStatusDriver, setModalStatusDriver] = useState(false);
  const {
    driverData,
    getDriverDetailResponse,
    location,
    driverStatus,
    mocked,
    isOrderTookAway,
  } = useSelector((state) => state.main);
  const appState = useRef(AppState.currentState);
  var interval;
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      //clearInterval when your app has come back to the foreground
      BackgroundTimer.clearInterval(interval);
    } else {
      //app goes to background
      console.log('app goes to background');
      //tell the server that your app is still online when your app detect that it goes to background
      interval = BackgroundTimer.setInterval(() => {
        console.log('connection status ', socketDriver.connected);
        const drivers_id = driverData?.id ? driverData?.id : null;
        console.log('driverID', driverData);
        socketDriver.emit('data', {
          drivers_id: drivers_id,
        });
      }, 5000);
      appState.current = nextAppState;
      console.log('AppState', appState.current);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    ding.setVolume(10);
    ding.setNumberOfLoops(-1);
    return () => {
      ding.release();
    };
  }, []);

  useEffect(() => {
    setIsFakeGps(mocked);
  }, [mocked]);


  const logout = () => {
    dispatch({type: AUTH_CONSTANT.LOGOUT});
  }

  const handleSuspendAccount = () => {
    // profileStore.setWebViewParam('help');
    // navigation.navigate('PartnerShipTnC');
    dispatch({
      type: MAIN_CONSTANT.SUSPEND_ACCOUNT,
      payload: driverData?.id,
      meta: {
        success: () => {
          logout();
          dispatch({
            type: MAIN_CONSTANT.SET_MOCKED_GPS_DATA,
            payload: false,
          });
        }
      }
    })
  };

  const handleDriverOnline = () => {
    const drivers_id = driverData?.id;
    handleModalStatusDriver();
    if (driverStatus === 'offline') {
      dispatch({
        type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION,
        payload: {
          drivers_id: drivers_id,
          lat: String(location.latitude),
          long: String(location.longitude),
        },
      });
    } else {
      dispatch({
        type: MAIN_CONSTANT.DRIVER_GOING_OFFLINE,
        payload: drivers_id,
      });
    }
  };

  const handleModalStatusDriver = () => {
    setModalStatusDriver(!isModalStatusDriver);
  };

  const isSuspend = () => {
    if (!driverData.active && driverData.status === 4) {
      return true
    } else {
      return false
    }
  }

  const hideModalOrderTookAway = () => {
    dispatch({
      type: MAIN_CONSTANT.SET_ORDER_TOOK_AWAY,
      payload: false,
    });
  };

  const fetchDriverDetail = () => {
    const drivers_id = driverData?.id ? driverData.drivers?.id : null;
    const data = {
      driverId: drivers_id,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      // start: '2023-03-21',
      // end: '2023-03-21',
    };
    earningStore.getEarning(data);
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_DETAIL,
      payload: drivers_id,
    });
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_STATUS,
      payload: drivers_id,
    });
    mainStore.postSaveFcmToken({
      driverId: drivers_id,
    });
  };

  useEffect(() => {
    if (mainStore.currentOrderData) {
      const drivers_id = driverData?.id ? driverData?.id : null;
      socketDriver.emit('data', {
        drivers_id: drivers_id,
      });
       dispatch({
        type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION,
        payload: {
          drivers_id: drivers_id,
          lat: String(location.latitude),
          long: String(location.longitude),
        },
      });
    }
    if (
      driverStatus === 'online' &&
      mainStore.currentOrderStatus === 'standby' &&
      mainStore.onGoingOrder === false
    ) {
      const drivers_id = driverData?.id ? driverData?.id : null;
      console.log('driverID', driverData);
      socketDriver.emit('data', {
        drivers_id: drivers_id,
      });
      socketDriver.on('data', (data) => {
        console.log('REGISTER DRIVER SOCKET', data);
      });
      socketDriver.on('order-broadcast', (data) => {
        console.log('order-broadcast', data);
        ding.setNumberOfLoops(-1);
        ding.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        mainStore.setCurrentOrderStatus('new');
        mainStore.setOnGoingOrder(true);
        mainStore.setCurentOrderData(data.data);
      });
    }
  }, [driverStatus, mainStore.currentOrderStatus]);

  useEffect(() => {
    if (mainStore.currentOrderStatus !== 'new') {
      ding.stop();
    }
  }, [mainStore.currentOrderStatus]);

  useEffect(() => {
    if (mainStore.currentOrderStatus !== 'standby') {
      const drivers_id = driverData?.id ? driverData?.id : null;
      console.log('driverID', driverData);
      socketDriver.emit('data', {
        drivers_id: drivers_id,
      });
      navigation.navigate('OnGoingOrder');
    }
  }, [mainStore.currentOrderStatus]);

  useEffect(() => {
    const resetResponse = () => {
      dispatch({
        type: MAIN_CONSTANT.RESET_MAIN_DATA,
      });
    };

    return () => {
      if (getDriverDetailResponse) {
        resetResponse();
      }
    };
  }, [getDriverDetailResponse]);

  useEffect(() => {
    const drivers_id = driverData?.id ?? driverData.drivers?.id;
    mainStore.setDriverId(drivers_id);
    mainStore.getCurrentOrder();
    const intervalId = setInterval(() => {
      if (driverStatus === 'online') {
        dispatch({
          type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION,
          payload: {
            drivers_id: drivers_id,
            lat: String(location.latitude),
            long: String(location.longitude),
          },
        });
      }
    }, 1200000);

    return () => clearInterval(intervalId);
  }, [driverData, driverStatus]);

  useEffect(() => {
    if (mainStore.driverId) {
      const data = {
        driverId: mainStore.driverId,
        // start: '2023-03-21',
        // end: '2023-03-21',
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      };
      console.log('GOO Get History Order');
      mainStore.getHistoryOrder(data);
      earningStore.getRatingCount(mainStore.driverId);
    }
  }, []);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <Maps
        handleModalStatusDriver={handleModalStatusDriver}
        isDriverOnline={driverStatus === 'online' ? true : false}
        onMapLoaded={fetchDriverDetail}
      />

      <ModalBottom
        onClose={handleModalStatusDriver}
        isVisible={isModalStatusDriver}
        type="bottom">
        <VStack padding={CustomSpacing(14)}>
          <VStack vertical={CustomSpacing(10)}>
            {driverStatus === 'online' ? (
              <VStack>
                <Text style={{...Fonts.textMBold}}>
                  End your journey today?
                </Text>
                <Spacer height={CustomSpacing(10)} />
                <Text
                  style={{
                    ...Fonts.textM,
                    color: Colors.neutral70,
                  }}>
                  Are you sure want to finish your today trip? we still have
                  alot of order for you next time.
                </Text>
                <Spacer height={CustomSpacing(50)} />
                <HStack style={[Layout.flexFullBetween]}>
                  <Button
                    style={{
                      width: dimensions.screenWidth * 0.45,
                      backgroundColor: Colors.primarySurface,
                    }}
                    onPress={handleDriverOnline}>
                    <Text style={{...Fonts.textMBold}}>Yes, Continue</Text>
                  </Button>
                  <Button
                    style={{
                      width: dimensions.screenWidth * 0.45,
                    }}
                    onPress={handleModalStatusDriver}>
                    <Text style={{...Fonts.textMBold}}>Cancel</Text>
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <VStack>
                <Text style={{...Fonts.textMBold}}>
                  Start your journey today?
                </Text>
                <Spacer height={CustomSpacing(10)} />
                <Text
                  style={{
                    ...Fonts.textM,
                    color: Colors.neutral70,
                  }}>
                  Please prepare all the safety equipment to make sure you and
                  your passenger is all safe in happy use Hayuq.
                </Text>
                <Spacer height={CustomSpacing(50)} />
                <HStack style={[Layout.flexFullBetween]}>
                  <Button
                    style={{
                      width: dimensions.screenWidth * 0.45,
                      backgroundColor: Colors.primarySurface,
                    }}
                    onPress={handleDriverOnline}>
                    <Text style={{...Fonts.textMBold}}>Yes, Continue</Text>
                  </Button>
                  <Button
                    style={{
                      width: dimensions.screenWidth * 0.45,
                    }}
                    onPress={handleModalStatusDriver}>
                    <Text style={{...Fonts.textMBold}}>Cancel</Text>
                  </Button>
                </HStack>
              </VStack>
            )}
          </VStack>
        </VStack>
      </ModalBottom>

      <ModalBottom isVisible={isFakeGps} type="bottom">
        <VStack padding={CustomSpacing(14)}>
          <VStack vertical={CustomSpacing(10)}>
            <VStack>
              <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
                You got suspended !
              </Text>
              <Spacer height={CustomSpacing(10)} />
              <Text
                style={{
                  ...Fonts.textM,
                  color: Colors.neutral70,
                  textAlign: 'center'
                }}
              >
                We’ve got you used an illegal third party GPS used in your phone, Please delete it in 7 days to avoid partnership deactivation.
              </Text>
              <Spacer height={CustomSpacing(30)} />
              <Button onPress={handleSuspendAccount}>
                <Text style={{...Fonts.textMBold}}>Understand</Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </ModalBottom>

      <ModalBottom
        isVisible={isSuspend()}
        type="bottom">
        <VStack padding={CustomSpacing(14)}>
          <VStack vertical={CustomSpacing(10)}>
            <VStack>
              <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
                Your account has been suspended !
              </Text>
              <Spacer height={CustomSpacing(10)} />
              <Text
                style={{
                  ...Fonts.textM,
                  color: Colors.neutral70,
                  textAlign: 'center'
                }}
              >
                We’ve got you used an illegal third party GPS used in your phone
              </Text>
              <Spacer height={CustomSpacing(30)} />
              <Button onPress={logout}>
                <Text style={{...Fonts.textMBold}}>Logout</Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </ModalBottom>

      <ModalBottom isVisible={isOrderTookAway} type="bottom">
        <VStack padding={CustomSpacing(14)}>
          <VStack vertical={CustomSpacing(10)}>
            <VStack>
              <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
                Whoops! Another driver just took this order
              </Text>
              <Spacer height={CustomSpacing(10)} />
              <Text
                style={{
                  ...Fonts.textM,
                  color: Colors.neutral70,
                  textAlign: 'center',
                }}>
                Don’t worry, new order is heading your wayReady to pick up?
              </Text>
              <Spacer height={CustomSpacing(30)} />
              <Button onPress={hideModalOrderTookAway}>
                <Text style={{...Fonts.textMBold}}>Absolutely!</Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </ModalBottom>
    </View>
  );
});

export default Main;

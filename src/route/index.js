import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Text,
  Easing,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import {LoadingOverlay, CallOverlay} from '@components';
import {Colors, Spacing, CustomSpacing, Fonts} from '@styles';
import t from '@lang';
import {
  ChatActive,
  ChatInactive,
  EarningActive,
  EarningInactive,
  HomeActive,
  HomeInactive,
  OrderActive,
  OrderInactive,
  ProfileActive,
  ProfileInactive,
} from '@assets';

import UnderDev from './underDevelopment';
import Splash from '@components/Splash';
import SplashPermission from '@components/SplashPermission';
import {Onboarding} from '@pages/OnBoarding';
import {
  Auth,
  Login,
  Register,
  VerifyOtp,
  RegistrationProcess,
  FormRegistration,
  SuccessRegistration,
  VerifyMissCall,
} from '@pages/Auth';
import {
  Earning,
  OrderHistory,
  EarningDetail,
  Withdraw,
  WithdrawSuccess,
  WithdrawFailed,
  TopUp,
  Transaction,
  Performance,
  DailyIncentive,
  SpecialIncentive,
  TopUpCheckout,
} from '@pages/Earning';
import {
  Profile,
  RatingHistory,
  ChangeLanguage,
  Setting,
  ChangeVehicleInformation,
  ChangeEmail,
  ChangePhoneNumber,
  ChangeBankAccount,
  AddNewAccount,
  PartnerShipTnC,
  VerifyOtpEmail,
  Referral,
  AlertFailed,
  AlertSuccess,
  DeleteAccount,
} from '@pages/Profile';
import {Order, FinishOrder} from '@pages/Order';
import {Chat, ChatDetail} from '@pages/Chat';
import {
  Main,
  OnGoingOrder,
  OrderDetail,
  OtpVerification,
  UploadReceipt,
} from '@pages/Main';
import {MAIN_CONSTANT} from '@pages/Main/Main.constant';
import {AUTH_CONSTANT} from '@pages/Auth/Auth.constant';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

const {screenWidth, screenHeight} = Dimensions.get('window');
const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 250,
    easing: Easing.linear,
  },
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

const SplashStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SplashPermission" component={SplashPermission} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
      }}
      animation="fade">
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyMissCall" component={VerifyMissCall} />
    </Stack.Navigator>
  );
};

const RegistrationProcessStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
      }}
      animation="fade">
      <Stack.Screen
        name="RegistrationProcess"
        component={RegistrationProcess}
      />
      <Stack.Screen name="FormRegistration" component={FormRegistration} />
      <Stack.Screen
        name="SuccessRegistration"
        component={SuccessRegistration}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = observer(() => {
  const dispatch = useDispatch();
  const {mainStore} = useStores();
  const navigationRef = useRef(null)
  const {driverData, driverDetail} = useSelector((state: any) => state.main);
  const {isAuthenticated, dataUser} = useSelector((state: any) => state.auth);
  // const isAuthenticated = true;
  const [splashShow, setSplashShow] = useState(true); // @TODO : GOING TO REDUCER LATER
  const [isOnboarding, setIsOnBoarding] = useState(false);
  const {permissionLocationStatus, location, callStatus} = useSelector(
    (state: any) => state.main,
  );

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      mainStore.setFcmToken(fcmToken);
      console.log('FCM Token', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const requestUserPermission = () => {
    messaging()
      .requestPermission()
      .then((authStatus) => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      });
  };

  const getDriverDetailData = () => {
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_DETAIL,
      payload: driverData?.id,
      meta: {
        success: function(boarding){
          setIsOnBoarding(boarding)
        }
      }
    })
  }

  useEffect(() => {
    if (driverData.boarding) {
      setIsOnBoarding(driverData.boarding);
    }
  }, [driverData]);

  useEffect(() => {
    getDriverDetailData();

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(() => {
      console.log('notif clicked');
    })

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body,
      // );
      // console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const requestLocationPermission = async () => {
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
          console.log('permission reject');
          navigationRef.current.navigate('SplashPermission');
          return false;
        }
      } catch (err) {
        console.log('Permission error', err);
        navigationRef.current.navigate('SplashPermission');
        return false;
      }
    } else {
      try {
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
        if (granted === 'granted') {
          await MapboxGL.requestAndroidLocationPermissions();
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
          console.log('permission reject');
          navigationRef.current.navigate('SplashPermission');
          return false;
        }
      } catch (err) {
        console.log('Permission error', err);
        navigationRef.current.navigate('SplashPermission');
        return false;
      }
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
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
              payload: position.mocked
            })
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
      }
    });
    console.log(location);
  };

  useEffect(() => {
    SplashScreen.hide();
    checkToken();
    requestUserPermission();
    dispatch({
      type: AUTH_CONSTANT.CLEAR_AUTH_RESPONSE,
    });
    getLocation();
  }, []);

  useEffect(() => {
    if (splashShow && location && permissionLocationStatus) {
      setSplashShow(false);
    }
  }, [location, permissionLocationStatus]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
          }}>
          {splashShow ? (
            <Stack.Screen name="SplashStack" component={SplashStack} />
          ) : !isAuthenticated ? (
            <>
              <>
                <Stack.Screen
                  name="OnboardingStack"
                  component={OnboardingStack}
                />
                <Stack.Screen
                  name="RegistrationProcessStack"
                  component={RegistrationProcessStack}
                />
                <Stack.Screen name="AuthStack" component={AuthStack} />
              </>
            </>
          ) : (
            <>
              {isOnboarding ? (
                <Stack.Screen
                  name="RegistrationProcessStack"
                  component={RegistrationProcessStack}
                />
              ) : (
                <>
                  <Stack.Screen
                    name="BottomTabMenu"
                    component={BottomTabMenu}
                  />
                  <Stack.Screen name="OrderHistory" component={OrderHistory} />
                  <Stack.Screen
                    name="EarningDetail"
                    component={EarningDetail}
                    options={{
                      gestureEnabled: false,
                    }}
                  />
                  <Stack.Screen name="TopUp" component={TopUp} />
                  <Stack.Screen name="Withdraw" component={Withdraw} />
                  <Stack.Screen
                    name="WithdrawSuccess"
                    component={WithdrawSuccess}
                  />
                  <Stack.Screen
                    name="WithdrawFailed"
                    component={WithdrawFailed}
                  />
                  <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
                  <Stack.Screen
                    name="RatingHistory"
                    component={RatingHistory}
                  />
                  <Stack.Screen
                    name="ChangeLanguage"
                    component={ChangeLanguage}
                  />
                  <Stack.Screen name="Setting" component={Setting} />
                  <Stack.Screen
                    name="ChangeVehicleInformation"
                    component={ChangeVehicleInformation}
                  />
                  <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
                  <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
                  <Stack.Screen
                    name="ChangePhoneNumber"
                    component={ChangePhoneNumber}
                  />
                  <Stack.Screen name="Transaction" component={Transaction} />
                  <Stack.Screen
                    name="ChangeBankAccount"
                    component={ChangeBankAccount}
                  />
                  <Stack.Screen
                    name="AddNewAccount"
                    component={AddNewAccount}
                  />
                  <Stack.Screen
                    name="PartnerShipTnC"
                    component={PartnerShipTnC}
                  />
                  <Stack.Screen
                    name="TopUpCheckout"
                    component={TopUpCheckout}
                  />
                  <Stack.Screen name="ChatDetail" component={ChatDetail} />
                  <Stack.Screen
                    name="OnGoingOrder"
                    component={OnGoingOrder}
                    options={{
                      gestureEnabled: false,
                    }}
                  />
                  <Stack.Screen name="OrderDetail" component={OrderDetail} />
                  <Stack.Screen
                    name="FinishOrder"
                    component={FinishOrder}
                    options={{
                      gestureEnabled: false,
                    }}
                  />
                  <Stack.Screen
                    name="VerifyOtpEmail"
                    component={VerifyOtpEmail}
                    options={{gestureEnabled: false}}
                  />
                  <Stack.Screen name="Referral" component={Referral} />
                  <Stack.Screen name="Performance" component={Performance} />
                  <Stack.Screen
                    name="DailyIncentive"
                    component={DailyIncentive}
                  />
                  <Stack.Screen
                    name="SpecialIncentive"
                    component={SpecialIncentive}
                  />
                  <Stack.Screen
                    name="OtpVerification"
                    component={OtpVerification}
                  />
                  <Stack.Screen
                    name="UploadReceipt"
                    component={UploadReceipt}
                  />
                  <Stack.Screen
                    name="AlertSuccess"
                    component={AlertSuccess}
                  />
                  <Stack.Screen 
                    name='AlertFailed'
                    component={AlertFailed}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <CallOverlay showing={callStatus} text={'Request OTP'} />
    </>
  );
});

const BottomTabMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => {
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.secondaryMain,
          tabBarInactiveTintColor: Colors.neutral80,
          tabBarItemStyle: {
            paddingVertical: CustomSpacing(15),
          },
          tabBarStyle: [
            {
              display: 'flex',
              height: CustomSpacing(80),
            },
            null,
          ],
          tabBarIcon: ({focused}) => {
            let iconName;
            let routeName;
            if (route.name === 'Home') {
              iconName = focused ? HomeActive : HomeInactive;
              routeName = t('Home');
            } else if (route.name === 'Order') {
              iconName = focused ? OrderActive : OrderInactive;
              routeName = t('Order');
            } else if (route.name === 'Earning') {
              iconName = focused ? EarningActive : EarningInactive;
              routeName = t('Earning');
            } else if (route.name === 'Chat') {
              iconName = focused ? ChatActive : ChatInactive;
              routeName = t('Chat');
            } else if (route.name === 'Profile') {
              iconName = focused ? ProfileActive : ProfileInactive;
              routeName = t('Profile');
            }
            return (
              <>
                <Image
                  source={iconName}
                  style={{
                    width: CustomSpacing(24),
                    height: CustomSpacing(24),
                  }}
                />
                <Text
                  style={
                    focused
                      ? {
                          ...Fonts.textSBold,
                          color: Colors.secondaryMain,
                          marginTop: CustomSpacing(5),
                        }
                      : {
                          ...Fonts.textS,
                          color: Colors.neutral80,
                          marginTop: CustomSpacing(5),
                        }
                  }>
                  {routeName}
                </Text>
              </>
            );
          },
        };
      }}>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Earning" component={Earning} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

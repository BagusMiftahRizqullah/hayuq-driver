import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  BackHandler,
} from 'react-native';
import t from '@lang';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geocoder from 'react-native-geocoding';
import BottomSheet from '@gorhom/bottom-sheet';
import {GOOGLE_API_KEY} from '@config';
import Numbro from '@utils/numbro';
// import BottomSheet from '@gorhom/bottom-sheet';
import {VStack, HStack, Button, Spacer} from '@components';
import {dimensions} from '@config/Platform.config';
import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import {portSocketChat} from '@config';
import {
  MerchantLocationIcon,
  UserLocation,
  StarIcon,
  PickyuqRide,
} from '@assets';
import {socketDriver} from '@config';
import {MAIN_CONSTANT} from '../../Main.constant';
import {CHAT_CONSTANT} from '../../../Chat/Chat.constant';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import MapsOrder from './MapsOrder';
import styles from './OnGoingOrder.style';

Geocoder.init(GOOGLE_API_KEY);

const OnGoingFoodDeliveryModal = observer(() => {
  const {mainStore, profileStore} = useStores();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const componentStyles = styles();
  const {location} = useSelector((state) => state.main);
  const [merchantAddress, setMerchantAddress] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [counter, setCounter] = useState(12);
  const [transactionData, setTransactionData] = useState(null);

  const merchantLocation = useMemo(() => {
    return {
      latitude: Number(
        mainStore.currentOrderData?.transactions?.data?.transactionsaddress
          .merchants?.location.location[0]?.cordinates[0],
      ),
      longitude: Number(
        mainStore.currentOrderData?.transactions?.data?.transactionsaddress
          .merchants?.location?.location[0]?.cordinates[1],
      ),
    };
  }, [mainStore.currentOrderData]);

  const userLocation = useMemo(() => {
    return {
      latitude: Number(
        mainStore.currentOrderData?.transactions?.data?.delivery?.lat,
      ),
      longitude: Number(
        mainStore.currentOrderData?.transactions?.data?.delivery?.long,
      ),
    };
  }, [mainStore.currentOrderData]);

  const transactionId = useMemo(() => {
    return mainStore.currentOrderData?.transactions?.data?.transactions?.id;
  }, [mainStore.currentOrderData]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '70%', '100%'], []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const goBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      const handleBack = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBack);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }, []),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      mainStore.currentOrderStatus === 'new' &&
        counter > 0 &&
        setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      mainStore.setCurrentOrderStatus('standby');
      mainStore.setOnGoingOrder(false);
      dispatch({
        type: MAIN_CONSTANT.SET_ORDER_TOOK_AWAY,
        payload: true,
      });
      goBack();
    }
    return () => clearInterval(interval);
  }, [counter]);

  const goToChatDetail = async () => {
    const TRX =
      mainStore.currentOrderData?.transactions?.data?.transactions.code;
    const DriverID = mainStore.currentOrderData?.drivers_id;
    const OrderDatas = mainStore.currentOrderData;

    await portSocketChat.emit('find-rooms', {
      code: TRX,
      drivers_id: DriverID,
    });

    navigation.navigate('ChatDetail', {TRX, DriverID, OrderDatas});
  };

  const goToOrderDetail = () => {
    navigation.navigate('OrderDetail');
  };

  const goToOtpVerification = () => {
    navigation.navigate('OtpVerification');
  };

  const handleAcceptOrder = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 4,
      },
    };
    mainStore.postChangeStatus(data);
  };

  const handleStartDelivery = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 5,
      },
    };
    mainStore.postChangeStatus(data);
  };

  const handleFinishDelivery = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 6,
      },
    };
    mainStore.postChangeStatus(data);
    mainStore.setOnGoingOrder(false);
    dispatch({
      type: CHAT_CONSTANT.RESET_LIST_CHAT,
    });
  };

  const getLocConvertAddress = async (lat, long, type) => {
    Geocoder.from(lat, long)
      .then((json) => {
        const res = json.results[0]?.formatted_address;
        if (type === 'merchant') {
          setMerchantAddress(res);
        } else {
          setUserAddress(res);
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (mainStore.currentOrderData) {
      getLocConvertAddress(
        merchantLocation.latitude,
        merchantLocation.longitude,
        'merchant',
      );
      getLocConvertAddress(
        userLocation.latitude,
        userLocation.longitude,
        'users',
      );
      setTransactionData(mainStore.currentOrderData.transactions.data);
    }
  }, [mainStore.currentOrderData]);

  const handleOpenMapDirection = () => {
    if (mainStore.currentOrderStatus === 'accepted') {
      Linking.openURL(
        googleMapOpenUrl({
          latitude: merchantLocation.latitude,
          longitude: merchantLocation.longitude,
        }),
      );
    } else {
      Linking.openURL(
        googleMapOpenUrl({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      );
    }
  };

  const googleMapOpenUrl = ({latitude, longitude}) => {
    const latLng = `${latitude},${longitude}`;
    return `google.navigation:q=${latLng}`;
  };

  const getInitialName = (name) => {
    const nameSplit = name?.split(' ');
    const firstInital = nameSplit[0]?.charAt(0)?.toUpperCase() ?? '';
    const scndInitial = nameSplit[1]?.charAt(0)?.toUpperCase() ?? '';
    return firstInital + scndInitial;
  };

  const cameraHandler = useCallback((response) => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    if (response && response.didCancel === undefined && response.assets) {
      const newImage = {
        id: randomId,
        uri: response.assets[0].uri,
        url: response.assets[0].uri,
        type: 'image/jpeg',
        name: `image-${randomId}-${new Date().getTime()}.jpg`,
        value: response.assets[0],
        base64: response.assets[0].base64,
      };
      mainStore.setReceiptImage(
        response.assets[0].uri,
        `data:image/jpeg;base64,${response.assets[0].base64}`,
      );
    } else if (response.didCancel) {
      console.log('CANCEL TAKE PHOTO');
    }
  }, []);

  const handleUploadByCamera = () => {
    mainStore.clearPostUploadReceipt();
    launchCamera(
      {
        mediaType: 'photo',
        quality: Platform.OS === 'ios' ? 0.2 : 0.5,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: true,
      },
      cameraHandler,
    );
  };

  const paymentTypeTransaction = () => {
    if (transactionData?.payments?.type === 1) {
      return 'Wallet';
    } else if (transactionData?.payments?.type === 2) {
      return 'Cash';
    }
  };

  useEffect(() => {
    if (
      mainStore.currentOrderStatus === 'receipt' &&
      mainStore.receiptImage !== null &&
      mainStore.receiptBase64 !== null
    ) {
      navigation.navigate('UploadReceipt');
    }
  }, [
    mainStore.currentOrderStatus,
    mainStore.receiptBase64,
    mainStore.receiptImage,
  ]);

  useEffect(() => {
    if (mainStore.currentOrderStatus === 'completed') {
      navigation.navigate('FinishOrder');
    }
  }, [mainStore.currentOrderStatus]);

  useEffect(() => {
    if (mainStore.currentOrderStatus === 'delivery') {
      socketDriver.emit('drivers-order-location', {
        users_id: '123',
        long: location.longitude,
        lat: location.latitude,
      });
      socketDriver.on('drivers-order-location', (data) => {
        console.log('UPDATE DRIVER LOCATION', data);
      });
    }
  }, [mainStore.currentOrderStatus, location]);

  if (mainStore.currentOrderData === null || transactionData === null)
    return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={2}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Button
        style={{
          marginHorizontal: CustomSpacing(16),
          backgroundColor: Colors.successMain,
        }}
        onPress={handleOpenMapDirection}
      >
        <HStack>
          <Text
            style={{
              ...Fonts.textSBold,
              color: Colors.neutral10,
            }}
          >
            Navigation
          </Text>
          <Spacer width={CustomSpacing(10)} />
          <Icon name="location-arrow" size={15} color={Colors.neutral10} />
        </HStack>
      </Button>
      <Spacer height={CustomSpacing(16)} />
      <ScrollView>
        <VStack
          style={{
            flex: 1,
            paddingHorizontal: CustomSpacing(16),
          }}
        >
          <HStack style={componentStyles.priceCard}>
            <VStack>
              <HStack>
                <Text style={{...Fonts.textM}}>Income : </Text>
                <Text
                  style={{...Fonts.headingXsBold, color: Colors.successMain}}
                >
                  Rp{' '}
                  {transactionData &&
                    Numbro.formatCurrency(
                      transactionData?.transactionsdrivers?.prices,
                    )}
                </Text>
              </HStack>
              <HStack>
                <Text style={{...Fonts.textM}}>Payment Type : </Text>
                <Text style={{...Fonts.textMBold}}>
                  {paymentTypeTransaction()}
                </Text>
              </HStack>
              <Spacer height={CustomSpacing(8)} />
              <HStack>
                <Text style={{...Fonts.textM}}>Total Order : </Text>
                <Text style={{...Fonts.textMBold}}>
                  Rp{' '}
                  {Numbro.formatCurrency(
                    transactionData?.price.totalmerchantstotal,
                  )}
                </Text>
              </HStack>
            </VStack>
            {mainStore.currentOrderStatus === 'new' && (
              <VStack style={componentStyles.counterOrder}>
                <Text style={{...Fonts.textMBold, color: Colors.dangerMain}}>
                  {counter}
                </Text>
              </VStack>
            )}
          </HStack>
          <VStack style={componentStyles.priceCard}>
            <HStack
              style={{
                justifyContent: 'space-between',
              }}
            >
              <HStack>
                <VStack
                  style={{
                    width: CustomSpacing(50),
                    height: CustomSpacing(50),
                    borderRadius: CustomSpacing(40),
                    backgroundColor: Colors.secondaryMain,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[Fonts.textS, {color: Colors.neutral10}]}>
                    {getInitialName(
                      transactionData?.transactionsaddress.users.users.name,
                    )}
                  </Text>
                </VStack>
                <Spacer width={CustomSpacing(10)} />
                <VStack>
                  <Text style={{...Fonts.textM}}>
                    {transactionData?.transactionsaddress.users.users.name}
                  </Text>
                  <Spacer height={CustomSpacing(5)} />
                  <HStack>
                    <Image
                      source={StarIcon}
                      style={{
                        width: CustomSpacing(10),
                        height: CustomSpacing(10),
                      }}
                    />
                    <Spacer width={CustomSpacing(5)} />
                    <Text
                      style={{
                        ...Fonts.textM,
                      }}
                    >{`${
                      Math.round(
                        transactionData?.transactionsaddress.users.usersratings
                          .ratings,
                      ) ?? '-'
                    } (${
                      transactionData?.transactionsaddress.users.usersratings
                        .total
                    })`}</Text>
                  </HStack>
                </VStack>
              </HStack>
              {mainStore.currentOrderStatus !== 'new' && (
                <HStack>
                  <TouchableOpacity
                    style={componentStyles.communicationIcon}
                    onPress={goToChatDetail}
                  >
                    <Icon
                      name="commenting"
                      size={CustomSpacing(15)}
                      color={Colors.neutral90}
                    />
                  </TouchableOpacity>
                  <Spacer width={CustomSpacing(10)} />
                  {/* <TouchableOpacity style={componentStyles.communicationIcon}>
                      <Icon
                        name="phone"
                        size={CustomSpacing(15)}
                        color={Colors.neutral90}
                      />
                    </TouchableOpacity> */}
                </HStack>
              )}
            </HStack>
            <HStack top={CustomSpacing(20)}>
              <VStack alignSelf="flex-start">
                <Image
                  source={MerchantLocationIcon}
                  style={{
                    width: CustomSpacing(20),
                    height: CustomSpacing(20),
                    backgroundColor: Colors.primaryMain,
                    borderRadius: CustomSpacing(10),
                    padding: CustomSpacing(5),
                  }}
                />
              </VStack>
              <Spacer width={CustomSpacing(10)} />
              <VStack>
                <Text style={{...Fonts.textXs}}>Restaurant</Text>

                <Text style={{...Fonts.textMBold}}>
                  {transactionData?.transactionsaddress.merchants.name}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{...Fonts.textM, maxWidth: CustomSpacing(250)}}
                >
                  {merchantAddress}
                </Text>
                {mainStore.currentOrderStatus !== 'receipt' &&
                  mainStore.currentOrderStatus !== 'ready' &&
                  mainStore.currentOrderStatus !== 'delivery' && (
                    <>
                      <Spacer height={CustomSpacing(10)} />
                      <HStack
                        style={{
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {/* <TouchableOpacity
                            style={{
                              alignItems: 'center',
                            }}
                            onPress={goToCallRestaurant}>
                            <Icon name="phone" size={CustomSpacing(15)} />
                            <Spacer height={CustomSpacing(5)} />
                            <Text style={{...Fonts.textM}}>
                              Call Restaurant
                            </Text>
                          </TouchableOpacity> */}
                        <Spacer width={CustomSpacing(10)} />
                        {/* <TouchableOpacity
                            style={{
                              alignItems: 'center',
                            }}
                            activeOpacity={0.8}
                            onPress={goToHelpCenter}>
                            <Icon
                              name="question-circle"
                              size={CustomSpacing(15)}
                            />
                            <Spacer height={CustomSpacing(5)} />
                            <Text style={{...Fonts.textM}}>Help</Text>
                          </TouchableOpacity> */}
                      </HStack>
                    </>
                  )}
              </VStack>
            </HStack>
            <HStack top={CustomSpacing(10)} bottom={CustomSpacing(10)}>
              <VStack alignSelf="flex-start">
                <Image
                  source={UserLocation}
                  style={{
                    width: CustomSpacing(20),
                    height: CustomSpacing(20),
                    backgroundColor: Colors.secondaryMain,
                    borderRadius: CustomSpacing(10),
                    padding: CustomSpacing(5),
                  }}
                />
              </VStack>
              <Spacer width={CustomSpacing(10)} />
              <VStack>
                <Text style={{...Fonts.textXs}}>Destination</Text>
                <Text
                  numberOfLines={2}
                  style={{...Fonts.textM, maxWidth: CustomSpacing(250)}}
                >
                  {userAddress}
                </Text>
              </VStack>
            </HStack>

            {mainStore.currentOrderStatus !== 'new' &&
            mainStore.currentOrderStatus !== 'ready' &&
            mainStore.currentOrderStatus !== 'delivery' ? (
              <>
                <Spacer height={CustomSpacing(20)} />
                <TouchableOpacity onPress={goToOrderDetail} activeOpacity={0.8}>
                  <HStack
                    top={CustomSpacing(10)}
                    style={{
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{...Fonts.textM}}>Order Details</Text>
                    <Icon name="chevron-right" size={CustomSpacing(10)} />
                  </HStack>
                </TouchableOpacity>
              </>
            ) : null}
          </VStack>

          {mainStore.currentOrderStatus === 'accepted' && (
            <>
              <Spacer height={CustomSpacing(8)} />

              <Button
                onPress={() => {
                  mainStore.setCurrentOrderStatus('otp');
                }}
                style={{
                  backgroundColor: Colors.primaryMain,
                }}
              >
                <Text style={{...Fonts.textMBold}}>
                  Already at the restaurant
                </Text>
              </Button>
            </>
          )}

          {mainStore.currentOrderStatus === 'otp' && (
            <>
              <Spacer height={CustomSpacing(8)} />
              <Button
                onPress={goToOtpVerification}
                style={{
                  backgroundColor: Colors.primaryMain,
                }}
              >
                <Text style={{...Fonts.textMBold}}>OTP Verification</Text>
              </Button>
            </>
          )}

          {mainStore.currentOrderStatus === 'new' && (
            <>
              <Spacer height={CustomSpacing(8)} />
              <HStack
                style={{
                  width: dimensions.screenWidth - CustomSpacing(32),
                  justifyContent: 'space-between',
                  backgroundColor: Colors.neutral10,
                }}
              >
                <Button
                  onPress={handleAcceptOrder}
                  style={{
                    width: dimensions.screenWidth - CustomSpacing(32),
                  }}
                >
                  <Text style={{...Fonts.textMBold}}>Accept</Text>
                </Button>
              </HStack>
            </>
          )}

          {mainStore.currentOrderStatus === 'receipt' && (
            <VStack style={componentStyles.priceCard}>
              <Text
                style={[
                  Fonts.textMBold,
                  {
                    alignSelf: 'center',
                  },
                ]}
              >
                Take picture of your Order receipt
              </Text>
              <Text
                style={[
                  Fonts.textM,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                To continue, please take picture of order’s receipt. Thank you!
              </Text>
              <Spacer height={CustomSpacing(16)} />
              <Button
                onPress={handleUploadByCamera}
                style={{
                  backgroundColor: Colors.primaryMain,
                }}
              >
                <Text style={{...Fonts.textMBold}}>Upload Receipt</Text>
              </Button>
            </VStack>
          )}

          {mainStore.currentOrderStatus === 'ready' && (
            <VStack style={componentStyles.priceCard}>
              <Text style={[Fonts.textMBold]}>Order is being prepared</Text>
              <Text style={[Fonts.textM]}>
                You can wait until the order is ready, then start delivery
              </Text>
              <Spacer height={CustomSpacing(16)} />
              <Button
                onPress={handleStartDelivery}
                style={{
                  backgroundColor: Colors.primaryMain,
                }}
              >
                <Text style={{...Fonts.textMBold}}>Start delivery</Text>
              </Button>
            </VStack>
          )}

          {mainStore.currentOrderStatus === 'delivery' && (
            <>
              <Spacer height={CustomSpacing(8)} />
              <HStack
                style={{
                  width: dimensions.screenWidth - CustomSpacing(32),
                  justifyContent: 'space-between',
                  backgroundColor: Colors.neutral10,
                }}
              >
                <Button
                  onPress={handleFinishDelivery}
                  style={{
                    width: dimensions.screenWidth - CustomSpacing(32),
                  }}
                >
                  <Text style={{...Fonts.textMBold}}>Finish Delivery</Text>
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </ScrollView>
    </BottomSheet>
  );
});

export default OnGoingFoodDeliveryModal;

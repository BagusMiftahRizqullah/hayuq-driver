import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geocoder from 'react-native-geocoding';
import BottomSheet from '@gorhom/bottom-sheet';
import {GOOGLE_API_KEY} from '@config';
import Numbro from '@utils/numbro';
// import BottomSheet from '@gorhom/bottom-sheet';
import Geolocation from 'react-native-geolocation-service';
import {VStack, HStack, Button, Spacer} from '@components';
import {dimensions} from '@config/Platform.config';
import {Colors, CustomSpacing, Fonts} from '@styles';
import {portSocketChat} from '@config';
import {UserLocation, StarIcon, PickyuqRide} from '@assets';
import {socketDriver} from '@config';
import {MAIN_CONSTANT} from '../../Main.constant';
import {CHAT_CONSTANT} from '../../../Chat/Chat.constant';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import styles from './OnGoingOrder.style';

Geocoder.init(GOOGLE_API_KEY);

const OnGoingPickyuqModal = observer(() => {
  const {mainStore} = useStores();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const componentStyles = styles();
  const {location} = useSelector((state) => state.main);
  const [pickLocation, setPickLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [counter, setCounter] = useState(10);
  const [transactionData, setTransactionData] = useState(null);

  const pickupLocation = useMemo(() => {
    return {
      latitude: Number(mainStore.currentOrderData?.transactions?.pickup.lat),
      longitude: Number(mainStore.currentOrderData?.transactions?.pickup.long),
    };
  }, [mainStore.currentOrderData]);

  const dropLocation = useMemo(() => {
    return {
      latitude: Number(mainStore.currentOrderData?.transactions?.drop.lat),
      longitude: Number(mainStore.currentOrderData?.transactions?.drop.long),
    };
  }, [mainStore.currentOrderData]);

  const transactionId = useMemo(() => {
    return mainStore.currentOrderData?.transactions?.transactions_id;
  }, [mainStore.currentOrderData]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '70%', '100%'], []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const goBack = () => {
    navigation.goBack();
  };

  const goToOrderDetail = () => {
    navigation.navigate('OrderDetail');
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
    const DriverID = mainStore.currentOrderData?.drivers_id;
    const OrderDatas = mainStore.currentOrderData;

    await portSocketChat.emit('find-rooms', {
      code: transactionId,
      drivers_id: DriverID,
    });

    navigation.navigate('ChatDetail', {transactionId, DriverID, OrderDatas});
  };
  const sendDriverLocation = () => {
    console.log('share location');
    Geolocation.getCurrentPosition(
      (position) => {
        const dataLocation = {
          users_id: mainStore.currentOrderData.transactions.users.id,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        socketDriver.emit('driver-share-live', dataLocation);
      },
      (error) => {
        console.log('ERROR UPDATE', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 100000},
    );
  };

  const handleAcceptOrder = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 2,
      },
    };
    mainStore.postChangeStatusPickyuq(data);
    sendDriverLocation();
  };

  const handleGoToPickupPoint = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 3,
      },
    };
    mainStore.postChangeStatusPickyuq(data);
  };

  const handleGoToDropPoint = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 4,
      },
    };
    mainStore.postChangeStatusPickyuq(data);
  };

  const handleFinishDelivery = () => {
    const data = {
      drivers_id: mainStore.currentOrderData.drivers_id,
      orders: {
        transactions_id: transactionId,
        status: 5,
      },
    };
    mainStore.postChangeStatusPickyuq(data);
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
          setPickLocation(res);
        } else {
          setDestinationLocation(res);
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (mainStore.currentOrderData) {
      getLocConvertAddress(
        pickupLocation.latitude,
        pickupLocation.longitude,
        'merchant',
      );
      getLocConvertAddress(
        dropLocation.latitude,
        dropLocation.longitude,
        'users',
      );
      setTransactionData(mainStore.currentOrderData.transactions.data);
    }
  }, [mainStore.currentOrderData]);

  const handleOpenMapDirection = () => {
    if (mainStore.currentOrderStatus === 'accepted') {
      Linking.openURL(
        googleMapOpenUrl({
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
        }),
      );
    } else {
      Linking.openURL(
        googleMapOpenUrl({
          latitude: dropLocation.latitude,
          longitude: dropLocation.longitude,
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

  const paymentTypeTransaction = () => {
    if (mainStore.currentOrderData.transactions.payment_type === 1) {
      return 'Wallet';
    } else if (mainStore.currentOrderData.transactions?.payment_type === 2) {
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

  // send update location when start deliver
  useEffect(() => {
    const isPickup = mainStore.currentOrderStatus === 'pickup'
    const updateLocationToUser = isPickup && setInterval(() => {
      sendDriverLocation();
    }, 5000);
    
    return () => clearInterval(updateLocationToUser)
  }, [mainStore.currentOrderStatus]);

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
                  {Numbro.formatCurrency(
                    mainStore.currentOrderData?.transactions?.prices.price
                      .total -
                      mainStore.currentOrderData?.transactions?.prices.price
                        .platformsAppDrivers,
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
                    mainStore.currentOrderData.transactions?.prices.price.total,
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
                      mainStore?.currentOrderData?.transactions?.users?.name,
                    ) ?? ''}
                  </Text>
                </VStack>
                <Spacer width={CustomSpacing(10)} />
                <VStack>
                  <Text style={{...Fonts.textM}}>
                    {mainStore.currentOrderData?.transactions.users.name}
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
                    >{`${Math.round(
                      transactionData?.transactionsaddress.users.usersratings
                        .ratings ?? 0,
                    )} (${
                      mainStore.currentOrderData.transactions.total_order ?? 0
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
                </HStack>
              )}
            </HStack>
            <HStack top={CustomSpacing(20)}>
              <VStack alignSelf="flex-start">
                <Image
                  source={PickyuqRide}
                  style={{
                    width: CustomSpacing(22),
                    height: CustomSpacing(22),
                  }}
                />
              </VStack>
              <Spacer width={CustomSpacing(10)} />
              <VStack>
                <Text style={{...Fonts.textXs}}>Pickup Location</Text>
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.textMBold,
                    marginVertical: CustomSpacing(4),
                    maxWidth: CustomSpacing(270),
                  }}
                >
                  {mainStore.currentOrderData.transactions.pickup.address ?? ''}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{...Fonts.textM, maxWidth: CustomSpacing(250)}}
                >
                  {pickLocation}
                </Text>
              </VStack>
            </HStack>
            <HStack top={CustomSpacing(10)} bottom={CustomSpacing(10)}>
              <VStack
                alignSelf="flex-start"
                style={{
                  backgroundColor: Colors.secondaryMain,
                  borderRadius: CustomSpacing(20),
                  padding: CustomSpacing(4),
                }}
              >
                <Image
                  source={UserLocation}
                  style={{
                    width: CustomSpacing(14),
                    height: CustomSpacing(14),
                  }}
                />
              </VStack>
              <Spacer width={CustomSpacing(10)} />
              <VStack>
                <Text style={{...Fonts.textXs}}>Destination</Text>
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.textMBold,
                    marginVertical: CustomSpacing(4),
                    maxWidth: CustomSpacing(270),
                  }}
                >
                  {mainStore.currentOrderData.transactions.drop.address ?? ''}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{...Fonts.textM, maxWidth: CustomSpacing(250)}}
                >
                  {destinationLocation}
                </Text>
              </VStack>
            </HStack>
            {mainStore.currentOrderStatus !== 'new' && (
              <VStack style={{marginHorizontal: CustomSpacing(5)}}>
                <Spacer height={CustomSpacing(15)} />
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
              </VStack>
            )}
          </VStack>

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

          {mainStore.currentOrderStatus === 'accepted' && (
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
                  onPress={handleGoToPickupPoint}
                  style={{
                    width: dimensions.screenWidth - CustomSpacing(32),
                  }}
                >
                  <Text style={{...Fonts.textMBold}}>
                    Start Drive to Pickup Point
                  </Text>
                </Button>
              </HStack>
            </>
          )}

          {mainStore.currentOrderStatus === 'pickup' && (
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
                  onPress={handleGoToDropPoint}
                  style={{
                    width: dimensions.screenWidth - CustomSpacing(32),
                  }}
                >
                  <Text style={{...Fonts.textMBold}}>
                    Start Drive to Drop Point
                  </Text>
                </Button>
              </HStack>
            </>
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

export default OnGoingPickyuqModal;

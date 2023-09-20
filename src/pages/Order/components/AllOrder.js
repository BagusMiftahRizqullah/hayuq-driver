import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@config';
import { toJS } from 'mobx';

import {useStores} from '@store/root.store';
import {dimensions} from '@config/Platform.config';
import {Layout, Fonts, CustomSpacing, Colors} from '@styles';
import {VStack, HStack, Spacer, ModalBottom} from '@components';
import {
  UserPhoto,
  StarIconOrder,
  MerchantIcon,
  OrderCancelIlustration,
  EmptyChat,
} from '@assets';
import styles from '../Order.style';
import t from '@lang';
Geocoder.init(GOOGLE_API_KEY);

const AllOrder = () => {
  const {mainStore} = useStores();
  console.log(mainStore.driverId);
  const componentStyle = styles();
  const [counter, setCounter] = useState(10);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    address: '',
    income: '',
    usersName: '',
    usersRating: '',
  });

  const hanldeCloseModalCanceledOrder = () => {
    setCancelOrderModal(!cancelOrderModal);
  };

  const getInitialName = (name) => {
    const nameSplit = name.split(' ');
    const firstInital = nameSplit[0]?.charAt(0)?.toUpperCase() ?? ''
    const scndInitial = nameSplit[1]?.charAt(0)?.toUpperCase() ?? ''
    return firstInital + scndInitial
  };

  const getLocConvertAddress = async (lat, long) => {
    Geocoder.from(Number(lat), Number(long))
      .then((json) => {
        const res = json.results[0].formatted_address;
        if (res) {
          setOrderData({
            ...orderData,
            address: res,
            name: mainStore.getCurrentOrderData.transactionsaddress.merchants
              .address.address,
            usersName:
              mainStore.getCurrentOrderData.transactionsaddress.users.users
                .name,
          });
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (mainStore.getCurrentOrderData) {
      getLocConvertAddress(
        mainStore.getCurrentOrderData.transactionsaddress.merchants.location
          .location[0].cordinates[0],
        mainStore.getCurrentOrderData.transactionsaddress.merchants.location
          .location[0].cordinates[1],
      );
    }
  }, [mainStore.getCurrentOrderData]);

  // merchant location
  // [LONG, LAT] mainStore.getCurrentOrderData.transactionsaddress.merchants.location.location[0].cordinates
  // ADDRESS NAME  mainStore.getCurrentOrderData.transactionsaddress.merchants.address.address

  // console.log('mainStore.getCurrentOrderData', toJS(mainStore.getCurrentOrderData));

  return (
    <VStack style={[Layout.flex, {paddingHorizontal: CustomSpacing(16)}]}>
      {mainStore.getCurrentOrderData !== null && orderData ? (
        <View style={componentStyle.cardOrder}>
          <HStack
            style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <HStack>
              <VStack style={componentStyle.avatarUser}>
                {orderData.usersName && (
                  <Text style={[Fonts.textS, {color: Colors.neutral10}]}>
                    {getInitialName(orderData?.usersName)}
                  </Text>
                )}
              </VStack>
              <Spacer width={CustomSpacing(8)} />
              <VStack>
                <Text style={{...Fonts.textM}}>{orderData.usersName}</Text>
                <HStack>
                  <Image
                    source={StarIconOrder}
                    style={componentStyle.imgStaricon}
                  />
                  <Text style={Fonts.textM}>5</Text>
                  <Text style={Fonts.textM}>(69)</Text>
                </HStack>
              </VStack>
            </HStack>
          </HStack>
          <HStack style={{marginTop: CustomSpacing(15)}}>
            <HStack style={{alignItems: 'flex-start'}}>
              <VStack>
                <Image
                  source={MerchantIcon}
                  style={{
                    width: CustomSpacing(22),
                    height: CustomSpacing(30),
                    marginRight: CustomSpacing(14),
                  }}
                />
              </VStack>
              <VStack style={Layout.flex}>
                <Text style={Fonts.textMBold}>{orderData.name}</Text>
                <Text
                  style={{
                    ...Fonts.textM,
                    lineHeight: CustomSpacing(22),
                    marginTop: CustomSpacing(5),
                  }}>
                  {orderData.address}
                </Text>
                <Text style={{...Fonts.textMBold, marginTop: CustomSpacing(5)}}>
                  {t('Income')}: 12.000
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </View>
      ) : (
        <View
          style={[
            Layout.flexCenterMid,
            {
              height: dimensions.screenWidth * 1.2,
              marginHorizontal: CustomSpacing(15),
            },
          ]}
        >
          <Image
            style={{
              width: CustomSpacing(300),
              height: CustomSpacing(200),
            }}
            source={EmptyChat}
          />
          <Text style={[Fonts.headingMBold]}>You dont have order</Text>
          <Text style={[Fonts.textM, {color: Colors.neutral70, textAlign: 'center'}]}>
            Begin your delivery with Hayuq, and your order will show up here.
          </Text>
        </View>
      )}
      <ModalBottom
        isVisible={cancelOrderModal}
        type="bottom"
        onClose={hanldeCloseModalCanceledOrder}>
        <VStack
          style={[Layout.flexCenterMid, {marginVertical: CustomSpacing(25)}]}>
          <Image
            source={OrderCancelIlustration}
            style={{width: CustomSpacing(110), height: CustomSpacing(94)}}
          />
          <Text style={{...Fonts.textMBold, marginTop: CustomSpacing(24)}}>
            Your order has been canceled
          </Text>
          <Text style={{...Fonts.textXs, marginTop: CustomSpacing(5)}}>
            But dont worry, theres still order coming up on you. Keep spirit!
          </Text>
        </VStack>
      </ModalBottom>
    </VStack>
  );
};

export default AllOrder;

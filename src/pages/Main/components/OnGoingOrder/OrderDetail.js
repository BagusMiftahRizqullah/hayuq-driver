import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';

import t from '@lang';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import Numbro from '@utils/numbro';
import {VStack, HStack, Spacer, HeaderNavigation} from '@components';
import {dimensions} from '@config/Platform.config';
import {Colors, CustomSpacing, Fonts} from '@styles';

import {LocationOrder} from '@assets';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import styles from './OnGoingOrder.style';

const OrderDetail = observer(() => {
  const {mainStore} = useStores();
  const [userAddress, setUserAddress] = useState('');
  const [transactionData, setTransactionData] = useState(null);

  const componentStyles = styles();
  const navigation = useNavigation();

  const isFood = mainStore.currentOrderData.type === 1;

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const orderOwner = () => {
    return isFood
      ? transactionData?.transactionsaddress.users.users.name
      : mainStore?.currentOrderData?.transactions?.users?.name;
  };

  const totalPrice = () => {
    return isFood
      ? transactionData?.price.totalmerchantstotal
      : mainStore.currentOrderData.transactions?.prices.price.total;
  };

  const orderCode = () => {
    return isFood
      ? transactionData?.transactions.code
      : mainStore.currentOrderData.transactions.code;
  };

  const orderRange = () => {
    return (
      mainStore.currentOrderData.transactions.distances.distance +
      ' ' +
      mainStore.currentOrderData.transactions.distances.unit
    );
  };

  const userLocation = useMemo(() => {
    return {
      latitude: isFood
        ? Number(
            mainStore.currentOrderData?.transactions?.data?.transactionsaddress
              .merchants?.location.location[0]?.cordinates[0],
          )
        : Number(mainStore.currentOrderData?.transactions?.pickup.lat),

      longitude: isFood
        ? Number(
            mainStore.currentOrderData?.transactions?.data?.transactionsaddress
              .merchants?.location?.location[0]?.cordinates[1],
          )
        : Number(mainStore.currentOrderData?.transactions?.pickup.long),
    };
  }, [mainStore.currentOrderData]);

  const getLocConvertAddress = async (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        const res = json.results[0].formatted_address;
        setUserAddress(res);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (mainStore.currentOrderData) {
      getLocConvertAddress(userLocation.latitude, userLocation.longitude);
      setTransactionData(mainStore.currentOrderData.transactions.data);
    }
  }, [mainStore.currentOrderData]);

  return (
    <VStack>
      <HeaderNavigation
        title={t('Order Details')}
        goback
        onPress={goBackNavigation}
      />
      <ScrollView
        style={{
          backgroundColor: Colors.backgroundMain,
          padding: CustomSpacing(16),
        }}
      >
        <VStack style={componentStyles.priceCard}>
          <HStack>
            <VStack
              style={{
                alignSelf: 'flex-start',
                backgroundColor: Colors.secondaryMain,
                borderRadius: CustomSpacing(20),
                padding: CustomSpacing(4),
              }}
            >
              <FastImage
                source={LocationOrder}
                style={{
                  width: CustomSpacing(14),
                  height: CustomSpacing(14),
                }}
              />
            </VStack>
            <Spacer width={CustomSpacing(10)} />
            <VStack>
              <Text style={[Fonts.textM]}>{orderOwner()}</Text>
              {!isFood && (
                <Text
                  numberOfLines={2}
                  style={{
                    maxWidth: CustomSpacing(270),
                    marginVertical: CustomSpacing(4),
                  }}
                >
                  {mainStore.currentOrderData.transactions.pickup.address}
                </Text>
              )}
              <Text
                style={[
                  Fonts.textMBold,
                  {
                    width: dimensions.screenWidth * 0.7,
                  },
                ]}
              >
                {userAddress}
              </Text>
              {isFood && (
                <Text style={[Fonts.textM]}>
                  Notes : {transactionData?.transactionsnotes.description}
                </Text>
              )}
            </VStack>
          </HStack>
        </VStack>
        <VStack style={componentStyles.priceCard}>
          <Text style={[Fonts.textM]}>Order Id : {orderCode()}</Text>
        </VStack>
        {!isFood && (
          <VStack style={componentStyles.priceCard}>
            <Text style={[Fonts.textM]}>Order Range : {orderRange()}</Text>
          </VStack>
        )}
        <VStack style={componentStyles.priceCard}>
          {transactionData &&
            transactionData?.transactionproducts.map((item, index) => {
              return (
                <HStack
                  key={`product-${index}`}
                  justifyContent="space-between"
                  marginVertical={CustomSpacing(4)}
                >
                  <VStack>
                    <Text style={[Fonts.textMBold]}>{item.name}</Text>
                    <Text style={[Fonts.textM]}>
                      {item.productsprice.quantitys} x Rp{' '}
                      {Numbro.formatCurrency(
                        item.productsprice.price -
                          item.productsprice.discount_price ?? 0,
                      )}
                    </Text>
                    {item.productsvariants?.length > 0 && (
                      <VStack>
                        <Spacer height={CustomSpacing(8)} />
                        <Text style={[Fonts.textMBold]}>-- Variasi --</Text>
                        {item.productsvariants.map((x, y) => {
                          return (
                            <VStack key={`variasi-${y}`}>
                              <Text style={[Fonts.textMBold]}>{x.name}</Text>
                              <Text style={[Fonts.textM]}>
                                {x.quantity} x Rp{' '}
                                {Numbro.formatCurrency(x.price)}
                              </Text>
                              <Spacer height={CustomSpacing(4)} />
                            </VStack>
                          );
                        })}
                        <Spacer height={CustomSpacing(8)} />
                      </VStack>
                    )}
                    <Text
                      style={[
                        Fonts.textM,
                        {
                          width: dimensions.screenWidth * 0.48,
                        },
                      ]}
                    >
                      Notes: {item.productsprice.notes}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text style={[Fonts.textMBold]}>
                      Rp {Numbro.formatCurrency(item.productsprice.totals)}
                    </Text>
                  </VStack>
                </HStack>
              );
            })}

          <View
            style={{
              borderBottomColor: Colors?.neutral90,
              borderBottomWidth: 0.7,
              marginVertical: CustomSpacing(10),
            }}
          />
          <HStack justifyContent="space-between">
            <Text style={[Fonts.textMBold]}>Total</Text>
            <Text
              style={[
                Fonts.textMBold,
                {
                  color: Colors.secondaryMain,
                },
              ]}
            >
              Rp {Numbro.formatCurrency(totalPrice())}
            </Text>
          </HStack>
        </VStack>
        <Spacer height={dimensions.screenWidth * 0.5} />
      </ScrollView>
    </VStack>
  );
});

export default OrderDetail;

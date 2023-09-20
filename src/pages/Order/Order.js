import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import t from '@lang';
import {observer} from 'mobx-react-lite';
import { toJS } from 'mobx';

import {useStores} from '@store/root.store';
import {VStack, HStack, Spacer, HeaderNavigation} from '@components';
import {dimensions} from '@config/Platform.config';
import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import AllOrder from './components/AllOrder';
import ConfirmOrder from './components/ConfirmOrder';
import {UserPhoto, StarIconOrder, MerchantIcon, EmptyChat} from '@assets';
import styles from './Order.style';
import moment from 'moment/moment';
import Numbro from '@utils/numbro';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@config';

Geocoder.init(GOOGLE_API_KEY);

const Order = observer(() => {
  const componentStyle = styles();
  const {mainStore} = useStores();
  const [activeTab, setActiveTab] = useState(1);
  const [HistoryDatas, setHistoryDatas] = useState(null);

  useEffect(() => {
    if (mainStore.historyOrderData) {
      mainStore.historyOrderData.response.forEach(async el => {
        const lat = el.details.transactionsaddress.merchants.location.location[0].cordinates[0]
        const long = el.details.transactionsaddress.merchants.location.location[0].cordinates[1]
        try {
          const res = await Geocoder.from(Number(lat), Number(long))
          el.address = res.results[0].formatted_address
        } catch(err) {
          console.warn(err)
        }
      });
      setHistoryDatas(mainStore.historyOrderData);
    }
  }, [mainStore.historyOrderData]);

  const tab = [
    {id: 1, title: t('Ongoing Order')},
    {id: 2, title: t('History Order')},
  ];

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleGetOrderHistory = () => {
    if (mainStore.driverId) {
      const data = {
        driverId: mainStore.driverId,
        start: moment().format('YYYY/MM/DD'),
        end: moment().format('YYYY/MM/DD'),
      };
      mainStore.getHistoryOrder(data);
    }
  }

  useEffect(() => {
    mainStore.getCurrentOrder();
    handleGetOrderHistory();
    setActiveTab(1);
  }, []);

  const ConfirmOrder = () => {
    return (
      <VStack style={[Layout.flex]}>
        {HistoryDatas?.response.length > 0 ? (
          <ScrollView style={{paddingHorizontal: CustomSpacing(16)}}>
            {HistoryDatas?.response?.map((items, index) => {
              const income = items?.details?.price?.totaldelivery
              const userDatas = items?.details?.transactionsaddress?.users;
              const merchantDatas =
                items?.details?.transactionsaddress?.merchants;
              return (
                <>
                  <View key={index} style={componentStyle.cardOrder}>
                    <HStack
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <HStack>
                        <Image
                          source={UserPhoto}
                          style={{
                            width: CustomSpacing(40),
                            height: CustomSpacing(40),
                            marginRight: CustomSpacing(7),
                            borderRadius: CustomSpacing(100),
                          }}
                        />
                        <VStack>
                          <Text
                            style={{
                              ...Fonts.textM,
                              marginBottom: CustomSpacing(2),
                            }}>
                            {userDatas?.users?.name}
                          </Text>
                          <HStack>
                            <Image
                              source={StarIconOrder}
                              style={{
                                width: CustomSpacing(10),
                                height: CustomSpacing(10),
                                marginRight: CustomSpacing(5),
                              }}
                            />
                            <Text style={Fonts.textM}>
                              {userDatas?.usersratings?.ratings}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      <VStack>
                        <Text style={componentStyle.labelTimeOreder}>
                          {moment(
                            items?.details?.transactions?.created_at,
                          ).format('HH:mm')}
                        </Text>
                      </VStack>
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
                          <Text style={Fonts.textMBold}>
                            {merchantDatas?.name}
                          </Text>
                          <Text
                            style={{
                              ...Fonts.textM,
                              lineHeight: CustomSpacing(22),
                              marginTop: CustomSpacing(5),
                            }}>
                            {items.address}
                          </Text>
                          <Text
                            style={{
                              ...Fonts.textMBold,
                              marginTop: CustomSpacing(5),
                            }}>
                            {t('Income') + `: ${Numbro.formatCurrency(income)}`}
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  </View>
                  <Spacer height={CustomSpacing(23)} />
                </>
              );
            })}
          </ScrollView>
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
            <Text style={[Fonts.headingMBold]}>No order history</Text>
            <Text style={[Fonts.textM, {color: Colors.neutral70, textAlign: 'center'}]}>
              Begin your delivery with Hayuq, and all your order history will show up here.
            </Text>
          </View>
        )}
      </VStack>
    );
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Order')} />
      <HStack>
        {tab.map((e, i) => (
          <Pressable
            key={i}
            style={{width: dimensions.screenWidth * 0.5}}
            onPress={() => handleSetActiveTab(e.id)}>
            <Text
              style={[
                {
                  ...Fonts.textMBold,
                  color:
                    activeTab === e.id
                      ? Colors.secondaryMain
                      : Colors.neutral60,
                  borderBottomWidth: activeTab === e.id ? CustomSpacing(2) : 0,
                  borderBottomColor:
                    activeTab === e.id ? Colors.secondaryMain : 'transparent',
                },
                componentStyle.orderTab,
              ]}>
              {e.title}
            </Text>
          </Pressable>
        ))}
      </HStack>
      <VStack
        style={[
          Layout.flex,
          {
            marginTop: CustomSpacing(24),
          },
        ]}>
        {activeTab === 1 && <AllOrder />}
        {activeTab === 2 && <ConfirmOrder />}
      </VStack>
    </View>
  );
});

export default Order;

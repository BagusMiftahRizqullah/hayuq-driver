import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from '@lang';
import moment from 'moment';
import Numbro from '@utils/numbro';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {TopUpIcon, PerformanceIcon, PointIcon, PerformanceOrderIcon} from '@assets';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import { useSelector, useDispatch } from 'react-redux';
import TopUp from './components/TopUp/TopUp';

import {MAIN_CONSTANT} from '../Main/Main.constant';
import styles from './Earning.style';

const Earning = observer(() => {
  const {earningStore, mainStore} = useStores();
  const { 
    driverDetail: {driverWallets}, 
    driverData,
    dataRewardDriver,
  } = useSelector(state => state.main);
  const navigation = useNavigation();
  const componentStyles = styles();
  const dispatch = useDispatch();
  const [earningData, setEarningData] = useState({
    total: '',
    list: [],
  });
  const [isTopup, setIsTopUp] = useState(false);

  const goToOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  const goToEarningDetail = () => {
    navigation.navigate('EarningDetail');
  };

  const goToWithdraw = () => {
    navigation.navigate('Withdraw');
  };

  const goToTopUp = () => {
    // navigation.navigate('TopUp');
    setIsTopUp(true)
  };

  const onCloseTopUp = () => {
    setIsTopUp(false)
  }

  const goToTransaction = () => {
    navigation.navigate('Transaction');
  };

  const goToPerformance = () => {
    navigation.navigate('Performance');
  };

  const getUpdateWalletBalance = () => {
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_DETAIL,
      payload: driverData?.id ?? driverData?.drivers?.id,
    })
  }

  const getDriverRewardData = () => {
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_REWARD,
      payload: {
        drivers_id: mainStore.driverId,
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
      }
    })
  }

  useEffect(() => {
    if (mainStore.driverId) {
      const data = {
        driverId: mainStore.driverId,
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      };
      earningStore.getEarning(data);
    }
    getUpdateWalletBalance();
    getDriverRewardData();
  }, []);

  useEffect(() => {
    if (earningStore.getEarningData !== null) {
      setEarningData(earningStore.getEarningData);
    }
  }, [earningStore.getEarningData]);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Earning')} />
      <ScrollView style={componentStyles.earningContainer}>
        <Text 
          style={{
            ...Fonts.textMBold, 
            marginVertical: CustomSpacing(6),
            paddingHorizontal: CustomSpacing(15)
          }}
        >
          {t('Earning Summary')}
        </Text>
        {/* Earning Summary Card */}
        <VStack style={componentStyles.cardEarningSummary}>
          <VStack padding={CustomSpacing(14)} bottom={CustomSpacing(5)}>
            <Text style={{...Fonts.textS}}>{t('Today')}</Text>
            <HStack
              style={[Layout.flexFullBetween]}
              vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>
                Rp. {Numbro.formatCurrency(earningData.total)}
              </Text>

              <Button
                style={{
                  width: CustomSpacing(60),
                }}
                onPress={goToEarningDetail}>
                <Text style={{...Fonts.textXsBold}}>{t('Details')}</Text>
              </Button>
            </HStack>
          </VStack>
          <VStack
            style={{
              borderBottomColor: Colors.neutral60,
              borderBottomWidth: 0.5,
              paddingHorizontal: CustomSpacing(14),
            }}
            bottom={CustomSpacing(14)}>
            <Text style={{...Fonts.textXs}}>
              {earningData.list.length} {t('Order Completed')}
            </Text>
          </VStack>
          {/* <VStack
            padding={CustomSpacing(14)}
            bottom={CustomSpacing(5)}
            style={{
              borderBottomColor: Colors.neutral60,
              borderBottomWidth: 0.5,
            }}>
            <Text style={{...Fonts.textS}}>{t('Hold Amount')}</Text>
            <HStack
              style={[Layout.flexFullBetween]}
              vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>Rp. 189.000</Text>
            </HStack>
          </VStack> */}

          <TouchableOpacity onPress={goToOrderHistory}>
            <HStack
              style={[Layout.flexFullBetween]}
              padding={CustomSpacing(14)}>
              <Text style={{...Fonts.textXsBold}}>
                {t('View Order History')}
              </Text>
              <Icon name="chevron-right" size={10} color={Colors.neutral70} />
            </HStack>
          </TouchableOpacity>
        </VStack>
        {/* Balance Summary Card */}
        <VStack style={componentStyles.cardBalanceSummary}>
          <HStack
            padding={CustomSpacing(14)}
            style={[
              Layout.flexFullBetween,
              {
                borderBottomColor: Colors.neutral60,
                borderBottomWidth: 0.5,
              },
            ]}>
            <Text style={{...Fonts.textMBold}}>Payyuq Balance</Text>
            <Text style={{...Fonts.textMBold}}>
              Rp. {Numbro.formatCurrency(driverWallets?.amount ?? 0)}
            </Text>
          </HStack>
          <HStack 
            padding={CustomSpacing(14)} 
            style={[
              Layout.flexFullEven,
              {marginTop: CustomSpacing(5)}
            ]}
          >
            <TouchableOpacity onPress={goToWithdraw} activeOpacity={0.5}>
              <VStack style={[Layout.flexCenter]}>
                <Icon
                  name="credit-card-alt"
                  size={24}
                  color={Colors.supportMain}
                />
                <Spacer height={CustomSpacing(8)} />
                <Text style={{...Fonts.textS}}>{t('Withdrawal')}</Text>
              </VStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToTopUp}>
              <VStack style={[Layout.flexCenter]}>
                <Image
                  source={TopUpIcon}
                  style={{
                    width: CustomSpacing(24),
                    height: CustomSpacing(24),
                  }}
                />
                <Spacer height={CustomSpacing(8)} />
                <Text style={{...Fonts.textS}}>{t('Top Up')}</Text>
              </VStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToTransaction}>
              <VStack style={[Layout.flexCenter]}>
                <Icon name="file" size={24} color={Colors.supportMain} />
                <Spacer height={CustomSpacing(8)} />
                <Text style={{...Fonts.textS}}>{t('Transaction')}</Text>
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
        {/* Performance Card */}
        <VStack style={componentStyles.cardPerformance}>
          <HStack 
            bottom={CustomSpacing(20)} 
            style={[
              Layout.flexFullEven,
              {marginTop: CustomSpacing(5)}
            ]}
          >
            <VStack style={{alignItems: 'center'}}>
              <Image
                source={PerformanceIcon}
                style={{
                  width: CustomSpacing(24),
                  height: CustomSpacing(24),
                }}
              />
              <Spacer height={CustomSpacing(8)} />
              <Text style={{...Fonts.textM}}>{t('Performance')}</Text>
              <VStack vertical={CustomSpacing(12)}>
                <Text style={{...Fonts.textMBold, color: Colors.primaryMain}}>
                  {dataRewardDriver?.performance_score ?? 0} %
                </Text>
              </VStack>
            </VStack>
            <VStack style={{alignItems: 'center'}}>
              <Image
                source={PointIcon}
                style={{
                  width: CustomSpacing(24),
                  height: CustomSpacing(24),
                }}
              />
              <Spacer height={CustomSpacing(8)} />
              <Text style={{...Fonts.textM}}>{t('Point')}</Text>
              <VStack vertical={CustomSpacing(12)}>
                <Text style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
                  {dataRewardDriver?.total_point ?? 0} Points
                </Text>
              </VStack>
            </VStack>
            <VStack style={{alignItems: 'center'}}>
              <Image
                source={PerformanceOrderIcon}
                style={{
                  width: CustomSpacing(24),
                  height: CustomSpacing(24),
                }}
              />
              <Spacer height={CustomSpacing(8)} />
              <Text style={{...Fonts.textM}}>Order</Text>
              <VStack vertical={CustomSpacing(12)}>
                <Text style={{...Fonts.textMBold, color: Colors.supportMain}}>
                  {dataRewardDriver?.completed_order ?? 0} Completed
                </Text>
              </VStack>
            </VStack>
          </HStack>
          <Button
            style={{
              width: CustomSpacing(140),
            }}
            onPress={goToPerformance}>
            <Text style={{...Fonts.textXsBold}}>{t('Details')}</Text>
          </Button>
        </VStack>
        <Spacer height={CustomSpacing(20)} />
        {/* Topup Modal */}
        <TopUp isTopUp={isTopup} onCloseTopUp={onCloseTopUp} />
      </ScrollView>
    </View>
  );
});

export default Earning;

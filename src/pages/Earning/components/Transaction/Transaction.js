import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import t from '@lang';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {dimensions} from '@config/Platform.config';
import {HStack, VStack, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {
  DebitTrransactionIcon, 
  CreditTransactionIcon, 
  ArrowDownLightIcon,
  EmptyChat,
} from '@assets';
import Numbro from '@utils/numbro';

import {EARNING_ACTION} from '../../Earning.constant';
import styles from './Transaction.style';

const Transaction = () => {
  const navigation = useNavigation();
  const componentStyles = styles();
  const dispatch = useDispatch();
  const { driverData } = useSelector(state => state.main);
  const { historyTransactionSuccess } = useSelector(state => state.earningReducer);

  const [groupDataTransaction, setGroupDataTransaction] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All Category')
  const [dateFilter, setDateFilter] = useState({title: 'Today'});

  const dataFilterCategory = ['All Category','Topup', 'Withdraw', 'Order', 'Income', 'Referral'];

  const optionData = [
    {title: 'Today'},
    {title: t('Last 7 Days'), count: 6},
    {title: t('Last 14 Days'), count: 13},
    {title: t('Last 30 Days'), count: 29},
  ];

  const endDate = moment()
  const startDate = moment(endDate).subtract(dateFilter.count || 0, "days").format("YYYY/MM/DD")

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleGroupingData = (data) => {
    // group data by date
    const groups = data?.reduce((data, index) => {
      const date = index?.created_at?.split('T')[0];
      if (!data[date]) {
        data[date] = [];
      }
      data[date].push(index);
      return data;
    }, {});

    // add date on object
    const groupArrays = groups && Object.keys(groups).map((date) => {
      return {
        date,
        data: groups[date]
      };
    });

    // Set Group data to groupDataTransaction state
    setGroupDataTransaction(groupArrays)
  }

  const getHistoryTopup = () => {
    dispatch({ 
      type: EARNING_ACTION.GET_HISTORY_TOPUP, 
      payload: {
        driverId: driverData?.id ?? driverData?.drivers?.id,
        startDate,
        endDate: moment(endDate).format('YYYY/MM/DD'),
      },
      meta: {
        success: function(data){
          handleGroupingData(data)
        }
      }
    });
  };

  const renderTransactionTypeTitle = (type) => {
    switch (type) {
      case 10:
        return 'Withdraw Driver'
      case 2:
        return 'Transaction Order'
      case 0:
        return 'Topup Payyuq'
      case 8:
      case 9:
        return 'Income Driver'
      case 14:
        return 'Ref Drivers Get Drivers'
      case 17:
        return 'Daily Reward'
    }
  };

  const handleFilterCategory = () => {
    if (categoryFilter === 'Topup') {
      const dataTopUp = historyTransactionSuccess.filter(e => e.type === 0)
        handleGroupingData(dataTopUp)
    } 
    if (categoryFilter === 'Withdraw') {
      const dataWd = historyTransactionSuccess.filter(e => e.type === 10)
      handleGroupingData(dataWd)
    }
    if (categoryFilter === 'Order') {
      const dataOrder = historyTransactionSuccess.filter(e => e.type === 2)
      handleGroupingData(dataOrder)
    }
    if (categoryFilter === 'Income') {
      const dataOrder = historyTransactionSuccess.filter(e => e.type === 9 || e.type === 8)
      handleGroupingData(dataOrder)
    }
    if (categoryFilter === 'Referral') {
      const dataOrder = historyTransactionSuccess.filter(e => e.type === 14)
      handleGroupingData(dataOrder)
    }
    if (categoryFilter === 'All Category') {
      handleGroupingData(historyTransactionSuccess)
    }
  }

  useEffect(() => {
    getHistoryTopup();
  }, [dateFilter])

  useEffect(() => {
    handleFilterCategory();
  }, [categoryFilter])

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Transaction')}
        goback
        onPress={goBackNavigation}
      />
      <HStack>
        <SelectDropdown
          data={optionData}
          defaultValue={dateFilter.title}
          onSelect={(selectedItem) => {
            setDateFilter(selectedItem);
          }}
          rowTextForSelection={(item) => {
            return item.title
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem.title
          }}
          renderDropdownIcon={() => (
            <Image
              source={ArrowDownLightIcon}
              style={componentStyles.arrowCategory}
            />
          )}
          buttonStyle={componentStyles.categoryFilter}
          buttonTextStyle={{...Fonts.textXs, textAlign: 'left'}}
          rowTextStyle={{...Fonts.textXs}}
        />   
        <SelectDropdown
          data={dataFilterCategory}
          defaultValue={categoryFilter}
          onSelect={(selectedItem) => {
            setCategoryFilter(selectedItem);
          }}
          renderDropdownIcon={() => (
            <Image
              source={ArrowDownLightIcon}
              style={componentStyles.arrowCategory}
            />
          )}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={componentStyles.categoryFilter}
          buttonTextStyle={{...Fonts.textXs, textAlign: 'left'}}
          rowTextStyle={{...Fonts.textXs}}
        />
      </HStack>
      {groupDataTransaction?.length > 0 ? (
        <ScrollView style={{marginBottom: CustomSpacing(15)}}>
          {groupDataTransaction?.map((e,i) => (
            <VStack
              key={`group-transaction-${i}`}
              style={{ marginHorizontal: CustomSpacing(20) }}
            >
              <Text style={[Fonts.textMBold, {marginVertical: CustomSpacing(10)}]}>
                {moment(e.date).format('dddd, DD MMMM YYYY')}
              </Text>
              {e.data?.map((j,k) => (
                <>
                  {j.credits_name === 'Debit' ? (
                    <HStack
                      key={`list-transaction-${k}`}
                      style={{width: '100%', marginVertical: CustomSpacing(5)}}
                    >
                      <HStack>
                        <Image
                          source={DebitTrransactionIcon}
                          style={componentStyles.iconStyle}
                        />
                      </HStack>
                      <HStack style={componentStyles.containerText}>
                        <VStack>
                          <Text style={[Fonts.textSBold, {marginBottom: CustomSpacing(5)}]}>
                            {renderTransactionTypeTitle(j.type)} 
                          </Text>
                          <HStack>
                            <Text style={[Layout.textS]}>{j.status_name}</Text>
                            <Text 
                              style={[
                                Fonts.textXs, 
                                {
                                  marginLeft: CustomSpacing(8),
                                  color: Colors.neutral60
                                }
                              ]}
                            >
                              {moment(j.created_at).format('h:mm a')}
                            </Text>
                          </HStack>
                        </VStack>
                        <VStack>
                          <Text style={componentStyles.textAmount}>
                            Rp. {Numbro.formatCurrency(j.amount)}
                          </Text>
                          <Text style={[Layout.textS, {textAlign: 'right'}]}>Payyuq</Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  ) : (
                    <HStack
                      key={`list-transaction-${k}`}
                      style={{width: '100%', marginVertical: CustomSpacing(5)}}
                    >
                      <HStack>
                        <Image
                          source={CreditTransactionIcon}
                          style={componentStyles.iconStyle}
                        />
                      </HStack>
                      <HStack style={componentStyles.containerText}>
                        <VStack>
                          <HStack>
                            <Text style={[Fonts.textSBold, {marginBottom: CustomSpacing(5)}]}>
                              {renderTransactionTypeTitle(j.type)} 
                            </Text>
                            <Text 
                              style={[
                                Fonts.textXs, 
                                {
                                  marginLeft: CustomSpacing(5),
                                  color: Colors.neutral60
                                }
                              ]}
                            >
                              {moment(j.created_at).format('h:mm a')}
                            </Text>
                          </HStack>
                          <Text style={[Layout.textS]}>{j.status_name}</Text>
                        </VStack>
                        <VStack>
                          <Text style={componentStyles.textAmount}>
                            Rp. {Numbro.formatCurrency(j.amount)}
                          </Text>
                          <Text style={[Layout.textS, {textAlign: 'right'}]}>Payyuq</Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  )}
                </>
              ))}
            </VStack>
          ))}
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
            <Text style={[Fonts.headingMBold]}>No transaction history</Text>
            <Text style={[Fonts.textM, {color: Colors.neutral70, textAlign: 'center'}]}>
              Begin your delivery with Hayuq, and all your transaction history will show up here.
            </Text>
          </View>
      )}
    </View>
  );
};
export default Transaction;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from '@lang';
import { useSelector, useDispatch } from 'react-redux';
import Numbro from '@utils/numbro';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {EARNING_ACTION} from '../../Earning.constant';
import {MASTER_ACTION} from '../../../../config/masterData';

import styles from './Withdraw.style';

const Withdraw = () => {
  const componentStyles = styles();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { 
    driverDetail: {
      driverWallets, 
      drivers, 
      driverbanks,
    }
  } = useSelector(state => state.main);
  const minimumDeposit = 50000;
  const payyuqBalance = driverWallets?.amount;
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawAmountError, setWithdrawAmountError] = useState(false);

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const storeDataWithdraw = () => {
    dispatch({ 
      type: EARNING_ACTION.STORE_DATA_REQUEST_WITHDRAW, 
      payload:  {
        drivers_id: drivers.id,
        withdraws: {
          driversbanks_id: driverbanks.id,
          total: withdrawAmount
        }
      }
    })
  }

  const handleReqOtpEmail = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: drivers.id}
    })
  };

  const gotoOtp = () => {
    navigation.navigate('VerifyOtp', {
      previousScreen: 'Withdraw',
      type: 'withdraw',
    });
    storeDataWithdraw();
    handleReqOtpEmail();
  };

  const goToChangeBankAccount = () => {
    navigation.navigate('ChangeBankAccount');
  };

  const renderBankAccounTextWd = () => {
    const hideBankNumber = driverbanks?.number.substr(driverbanks.number.length - 4)
    return `${driverbanks?.banks?.account_name ?? ''} ${hideBankNumber ? '| ****' : ''} ${hideBankNumber ?? ''}`
  }

  useEffect(() => {
    if (withdrawAmount) {
      if (
        withdrawAmount + minimumDeposit > payyuqBalance ||
        withdrawAmount < 25000
      ) {
        setWithdrawAmountError(true);
      } else {
        setWithdrawAmountError(false);
      }
    }
  }, [withdrawAmount]);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Withdrawal')}
        goback
        onPress={goBackNavigation}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack style={componentStyles.withdrawContainer}>
          <VStack style={componentStyles.cardBalance}>
            <Text style={{...Fonts.textS}}>Payyuq {t('Balance')}</Text>
            <Spacer height={CustomSpacing(5)} />
            <Text style={{...Fonts.textLBold}}>
              Rp. {Numbro.formatCurrency(driverWallets?.amount ?? 0)}
            </Text>
          </VStack>
          <Text style={{...Fonts.textLBold}}>{t('Amount')}</Text>
          <Spacer height={CustomSpacing(14)} />
          <VStack
            style={[
              componentStyles.cardAmount,
              {
                backgroundColor: withdrawAmountError
                  ? Colors.dangerSurface
                  : Colors.neutral10,
                shadowColor: withdrawAmountError
                  ? Colors.dangerMain
                  : Colors.neutral70,
              },
            ]}>
            <HStack>
              <Text
                style={{
                  ...Fonts.textL,
                  marginRight: CustomSpacing(10),
                  color: withdrawAmountError
                    ? Colors.dangerMain
                    : Colors.neutral90,
                }}>
                Rp
              </Text>
              <TextInput
                style={{
                  width: '90%',
                  ...Fonts.textL,
                  height: CustomSpacing(40),
                  color: withdrawAmountError
                    ? Colors.dangerMain
                    : Colors.neutral90,
                }}
                underlineColorAndroid="transparent"
                placeholder={t('0')}
                placeholderTextColor={Colors.neutral60}
                keyboardType="phone-pad"
                value={String(withdrawAmount)}
                onChangeText={(text) => setWithdrawAmount(Number(text))}
                maxLength={13}
              />
            </HStack>
          </VStack>
          {withdrawAmount + minimumDeposit > payyuqBalance ? (
            <Text style={{...Fonts.textMBold, color: Colors.dangerMain}}>
              {t('Warning: ')}
              <Text
                style={{
                  ...Fonts.textM,
                  lineHeight: CustomSpacing(20),
                  color: Colors.dangerMain,
                }}>
                {t(
                  'Withdrawal amount exceeded the deposit limit balance or Insufficient Fund.',
                )}
              </Text>
            </Text>
          ) : (
            <Text style={{...Fonts.textMBold}}>
              {t('Please Note: ')}
              <Text style={{...Fonts.textM, lineHeight: CustomSpacing(20)}}>
                {t('Minimum amount withdrawal for driver is')} Rp. 25.000,00
              </Text>
            </Text>
          )}
          <Spacer height={CustomSpacing(20)} />
          <Text style={{...Fonts.textSBold}}>{t('Withdrawal to')}</Text>
          <Spacer height={CustomSpacing(15)} />
          <TouchableOpacity activeOpacity={0.9} onPress={goToChangeBankAccount}>
            <VStack style={componentStyles.cardBankAccount}>
              <HStack style={[Layout.flexFullBetween]}>
                <HStack>
                  <Icon
                    name="credit-card-alt"
                    size={18}
                    color={Colors.neutral90}
                  />
                  <VStack left={CustomSpacing(10)} right={CustomSpacing(5)}>
                    <Text style={{...Fonts.textMBold}}>
                      {t('Bank Account')}
                    </Text>
                    <Text style={{...Fonts.textS}}>
                      {driverbanks?.banks?.name}
                    </Text>
                    <Text style={{...Fonts.textS}}>
                      {renderBankAccounTextWd()} 
                    </Text>
                  </VStack>
                </HStack>
                <Icon name="chevron-right" size={10} color={Colors.neutral70} />
              </HStack>
            </VStack>
          </TouchableOpacity>
          <VStack style={componentStyles.withdrawBtn}>
            <Button
              onPress={gotoOtp}
              disabled={withdrawAmountError || withdrawAmount === 0}>
              <Text style={{...Fonts.textMBold}}>{t('Withdraw')}</Text>
            </Button>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Withdraw;

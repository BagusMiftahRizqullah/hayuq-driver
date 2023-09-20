import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import {useSelector, useDispatch} from 'react-redux';

import {HStack, VStack, Button, Spacer} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t, {rtl} from '@lang';

import {MASTER_ACTION} from '../../../../config/masterData';
import styles from './VerifyOtpEmail.style';
import { SETTING_CONSTANT } from '../Setting/Setting.constant';

const VerifyOtpEmail = ({route}) => {
  const {type} = route.params
  const dispatch = useDispatch();
  const {
    masterReducer: { isLoading },
    settingReducer: { 
      vehicleInfoUpdateData, 
      bankAccountUpdateData,
      phoneNumberUpdateData,
      emailUpdateData,
    },
    main: { driverDetail },
  } = useSelector((state) => state);
  const componentStyles = styles();
  const otpInput = useRef(null);

  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isWarningMessageVisible, setIsWarningMessageVisible] = useState(false);
  const [counter, setCounter] = useState(180);

  const handleResendOtp = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: driverDetail.drivers.id}
    })
    if (!isLoading && counter === 0) setCounter(180)
  };

  const submitDataVehicle = () => {
    dispatch({
      type: SETTING_CONSTANT.CHANGE_VEHICLE_INFO,
      payload: vehicleInfoUpdateData,
      meta: {
        success: function() {
          navigation.navigate('AlertSuccess', {
            type: 'Vehicle Info',
          })
        },
        failed: function() {
          navigation.navigate('AlertFailed', {
            type: 'Vehicle Info',
          })
        }
      }
    })
  }

  const submitDataBankAccount = () => {
    dispatch({
      type: SETTING_CONSTANT.CHANGE_BANK_ACCOUNT,
      payload: bankAccountUpdateData,
      meta: {
        success: function() {
          navigation.navigate('AlertSuccess', {
            type: 'Bank Account',
          })
        },
        failed: function() {
          navigation.navigate('AlertFailed', {
            type: 'Bank Account',
          })
        }
      }
    });
  }

  const submitDataPhoneNumber = () => {
    dispatch({
      type: SETTING_CONSTANT.CHANGE_PHONE_NUMBER,
      payload: phoneNumberUpdateData,
      meta: {
        success: function() {
          navigation.navigate('AlertSuccess', {
            type: 'Phone Number',
          })
        },
        failed: function() {
          navigation.navigate('AlertFailed', {
            type: 'Phone Number',
          })
        }
      }
    });
  }

  const submitDataEmail = () => {
    dispatch({
      type: SETTING_CONSTANT.CHANGE_EMAIL,
      payload: emailUpdateData,
      meta: {
        success: function() {
          navigation.navigate('AlertSuccess', {
            type: 'Email',
          })
        },
        failed: function() {
          navigation.navigate('AlertFailed', {
            type: 'Email',
          })
        }
      }
    });
  }

  const handleCallbackSuccess = () => {
    if (type === 'Vehicle Info') {
      submitDataVehicle();
    } else if (type === 'Bank Account') {
      submitDataBankAccount();
    } else if (type === 'Phone Number') {
      submitDataPhoneNumber();
    } else if (type === 'Email') {
      submitDataEmail();
    }
  }

  const handleVerifyOtp = () => {
    dispatch({
      type: MASTER_ACTION.VERIFY_OTP_EMAIL,
      payload: {
        drivers_id: driverDetail.drivers.id, 
        OTP: otp,
        type: 3
      },
      meta: {
        success: function() {
          handleCallbackSuccess()
        },
        failed: function() {
          setIsWarningMessageVisible(true)
        }
      }
    })
  }

  const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${counter > 60 ? '0' : ''}${minutes} : ${
      secondsLeft < 10 ? '0' : ''
    }${secondsLeft}`;
  };
  
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[Layout.flex, Layout.flexMid, componentStyles.loginContainer]}>
        <VStack bottom={CustomSpacing(30)}>
          <Text style={{...Fonts.headingSBold}}>
            Verify you {`${type}`}
          </Text>
          <Text style={{...Fonts.textL, marginTop: CustomSpacing(5)}}>
            {t('An 4-digit code has been sent to')} 
          </Text>
          <Text
            style={{
              ...Fonts.textLBold,
              textAlign: rtl ? 'right' : 'left',
              marginTop: CustomSpacing(10),
            }}>
            {driverDetail?.drivers?.email}
          </Text>
        </VStack>
        <VStack style={{alignItems: 'center'}} bottom={CustomSpacing(80)}>
          <OTPTextInput
            ref={otpInput}
            textInputStyle={{
              ...Fonts.headingS,
            }}
            handleTextChange={(code) => setOtp(code)}
            tintColor={
              isWarningMessageVisible ? Colors.dangerMain : Colors.primaryMain
            }
            offTintColor={
              isWarningMessageVisible ? Colors.dangerMain : Colors.neutral60
            }
            containerStyle={componentStyles.otpContainer}
          />
          {isWarningMessageVisible && (
            <Text
              style={{
                ...Fonts.textM,
                marginTop: CustomSpacing(10),
                color: Colors.dangerMain,
              }}>
              Seems like this code isn’t valid
            </Text>
          )}
        </VStack>
        <VStack style={{alignItems: 'center'}} bottom={CustomSpacing(116)}>
          <Text style={{...Fonts.textM}}>
            {t('The OTP will be expired in')}{' '}
            <Text style={{...Fonts.textMBold, color: Colors.dangerMain}}>
            {convertSecondsToMinutesAndSeconds(counter)}
            </Text>
          </Text>
          <Text style={{...Fonts.textM}}>
            {t('Didn’t receive the code?')}{' '}
            <Text 
              style={{...Fonts.textMBold, color: Colors.secondaryMain}}
              onPress={handleResendOtp}
            >
              {t('Resend')}
            </Text>
          </Text>
        </VStack>
        <Button
          style={{
            width: '100%',
          }}
          disabled={otp.length < 4 && !isLoading}
          onPress={() => handleVerifyOtp()}
        >
          <Text style={{...Fonts.textMBold}}>{t('Verify')}</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtpEmail;

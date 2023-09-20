import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import {useSelector, useDispatch} from 'react-redux';

import {HStack, VStack, Button, Spacer} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t, {rtl} from '@lang';

import styles from './Login.style';
import {AUTH_CONSTANT} from '../../Auth.constant';
import {MASTER_ACTION} from '../../../../config/masterData';
import {EARNING_ACTION} from '../../../Earning/Earning.constant';

const VerifyOtp = ({route}) => {
  const {type} = route.params;
  const dispatch = useDispatch();
  const {mobileNumber} = useSelector((state) => state.auth);
  const {driverDetail} = useSelector((state) => state.main);
  const {dataRequestWithdraw} = useSelector(state => state.earningReducer);
  const componentStyles = styles();
  const otpInput = useRef(null);

  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isWarningMessageVisible, setIsWarningMessageVisible] = useState(false);
  const [counter, setCounter] = useState(180);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${counter > 60 ? '0' : ''}${minutes} : ${
      secondsLeft < 10 ? '0' : ''
    }${secondsLeft}`;
  };

  const handleResendOtp = () => {
    setCounter(180);
  };

  const handeResendOtpWd = () => {
    dispatch({
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: driverDetail.drivers.id}
    })
  }

  const handleRequestWd = () => {
    dispatch({
      type: EARNING_ACTION.REQUEST_WITHDRAW,
      payload: dataRequestWithdraw,
      meta: {
        success: function() {
          navigation.reset({
            index: 0,
            routes: [{name: 'WithdrawSuccess'}],
          });
        },
        failed: function() {
          navigation.reset({
            index: 0,
            routes: [{name: 'WithdrawFailed'}],
          });
        }
      }
    })
  }

  const handleSubmitOtpWd = () => {
    dispatch({
      type: MASTER_ACTION.VERIFY_OTP_EMAIL,
      payload: {
        drivers_id: driverDetail.drivers.id, 
        OTP: otp,
        type: 3
      },
      meta: {
        success: function() {
          handleRequestWd()
        },
        failed: function() {
          setIsWarningMessageVisible(true)
        }
      }
    })
  }

  const submitOtp = () => {
    if (type === 'login') {
      dispatch({
        type: AUTH_CONSTANT.LOGIN,
      });
    } else if (type === 'withdraw') {
      handleSubmitOtpWd();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'RegistrationProcessStack'}],
      });
    }
  };

  const renderOtpSubject = () => {
    if (type === 'login') {
      return `+ ${mobileNumber}`
    } else {
      return driverDetail?.drivers?.email
    }
  }

  const otpResend = () => {
    if (type === 'login') {
      handleResendOtp()
    } else {
      handeResendOtpWd()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[Layout.flex, Layout.flexMid, componentStyles.loginContainer]}>
        <VStack bottom={CustomSpacing(30)}>
          <Text style={{...Fonts.headingSBold}}>
            {t('Verify your phone number')}
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
            {renderOtpSubject()}
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
              onPress={otpResend}
              style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
              {t('Resend')}
            </Text>
          </Text>
        </VStack>
        <Button
          style={{
            width: '100%',
          }}
          disabled={otp.length < 4}
          onPress={submitOtp}>
          <Text style={{...Fonts.textMBold}}>{t('Verify')}</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtp;

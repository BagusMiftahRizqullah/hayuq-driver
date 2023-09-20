import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import {useSelector, useDispatch} from 'react-redux';
import {dimensions} from '@config/Platform.config';
import {HStack, VStack, Button, Spacer, LoadingOverlay} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t, {rtl} from '@lang';

import styles from './Login.style';
import {AUTH_CONSTANT} from '../../Auth.constant';

const VerifyMissCall = ({route}) => {
  const {type, refCode} = route.params;
  const dispatch = useDispatch();
  const {driverData} = useSelector((state) => state.main);
  const {verifyOtpLoading} = useSelector((state) => state.auth);
  const componentStyles = styles();
  const otpInput = useRef(null);

  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isWarningMessageVisible, setIsWarningMessageVisible] = useState(false);
  const [counter, setCounter] = useState(180);
  const [isFailedVerify, setIsFailedVerify] = useState(false);

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
    dispatch({
      type: AUTH_CONSTANT.LOGIN,
      payload: {phone: driverData.drivers.phone},
    });
  };

  const handelSendverifyNumber = () => {
    const dataVerify = {
      otp_id: driverData.otp_id,
      otp: otp,
      type: type === 'login' ? 1 : 2,
      drivers: {
        phone: driverData.drivers.phone,
        email: driverData.drivers.email,
        code: refCode,
      },
    };
    dispatch({
      type: AUTH_CONSTANT.VERIFY_OTP,
      payload: dataVerify,
      meta: {
        success: function () {
          console.log('TYPE=>>>', type);
          if (type !== 'login' || type !== 'withdraw') {
            console.log('TYPE=>>>2', type);
            navigation.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            });
            setIsWarningMessageVisible(false);
          } else {
            console.log('TYPE=>>>3', type);
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabMenu'}],
            });
          }
        },
      },
    });
  };

  const submitOtp = () => {
    if (type === 'withdraw') {
      navigation.reset({
        index: 0,
        routes: [{name: 'WithdrawSuccess'}],
      });
    } else {
      handelSendverifyNumber();
    }
  };

  const RenderMissCallNumber = () => {
    const phone = driverData?.prefix;
    return `+${phone?.slice(0, 4)} - ${phone?.slice(4, 9)} - `;
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[Layout.flex, Layout.flexMid, componentStyles.loginContainer]}>
          <VStack bottom={CustomSpacing(30)}>
            <Text style={{...Fonts.headingSBold}}>
              {t('Verify your phone number')}
            </Text>
            <Text style={{...Fonts.textL, marginTop: CustomSpacing(5)}}>
              {t('Complete the last 4 digit phone number')}
            </Text>
          </VStack>
          <VStack style={{alignItems: 'center'}} bottom={CustomSpacing(80)}>
            <HStack>
              {/* <Text
                style={{
                  ...Fonts.headingS,
                }}>
                {RenderMissCallNumber()}
              </Text> */}
              <OTPTextInput
                ref={otpInput}
                textInputStyle={{
                  ...Fonts.headingS,
                }}
                handleTextChange={(code) => setOtp(code)}
                tintColor={Colors.primaryMain}
                offTintColor={Colors.neutral60}
                containerStyle={{
                  width: dimensions.screenWidth * 0.8,
                  alignSelf: 'center',
                }}
              />
              {/* <TextInput
                keyboardType="phone-pad"
                value={otp}
                maxLength={4}
                onChangeText={(code) => setOtp(code)}
                style={[
                  componentStyles.missCallOtpContainer,
                  {borderBottomColor: Colors.neutral60},
                ]}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
              /> */}
            </HStack>
            {isWarningMessageVisible && (
              <Text
                style={{
                  ...Fonts.textM,
                  marginTop: CustomSpacing(10),
                  color: Colors.dangerMain,
                }}>
                {t('Seems like this code isn’t valid')}
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
                onPress={handleResendOtp}
                style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
                {t('Resend')}
              </Text>
            </Text>
          </VStack>
          <Button
            style={{
              width: dimensions.screenWidth * 0.9,
            }}
            disabled={otp.length < 4}
            onPress={submitOtp}>
            <Text style={{...Fonts.textMBold}}>{t('Verify')}</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
      <LoadingOverlay showing={verifyOtpLoading} text={'Verify OTP'} />
    </>
  );
};

export default VerifyMissCall;

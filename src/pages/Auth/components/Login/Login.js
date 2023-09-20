import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {HStack, VStack, Button, LoadingOverlay} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t from '@lang';

import styles from './Login.style';
import {AUTH_CONSTANT} from '../../Auth.constant';

const Login = () => {
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();

  const {reqOtpLoginResponse, reqOtpLoginError, reqOtpLoginLoading} =
    useSelector((state: any) => state.auth);
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errorForm, setErrorForm] = useState({
    startWith: false,
    countryCode: false,
  });

  useEffect(() => {
    setPhoneNumber('');
  }, []);

  useEffect(() => {
    if (reqOtpLoginResponse && reqOtpLoginResponse.drivers) {
      gotoOtp();
    }
  }, [reqOtpLoginResponse]);

  const handleModalVisible = () => {
    setIsModalConfirmationVisible(!isModalConfirmationVisible);
  };

  const handleSubmitLogin = () => {
    dispatch({
      type: AUTH_CONSTANT.LOGIN,
      payload: {phone: phoneNumber},
    });
    handleModalVisible();
  };

  const gotoRegister = () => {
    navigation.navigate('Register', {
      previousScreen: 'Auth',
    });
  };

  const gotoOtp = () => {
    navigation.navigate('VerifyMissCall', {
      previousScreen: 'Login',
      type: 'login',
    });
  };

  const handleInputPhoneNumber = (text) => {
    setPhoneNumber(text);
  };

  const warningMessage = useMemo(() => {
    let label;
    switch (true) {
      case reqOtpLoginError.code === 201:
        label = reqOtpLoginError.messages;
        break;
      case reqOtpLoginError.code === 202:
        label = 'Email not valid';
        break;
      default:
        label = 'Something went wrong, please try again later';
        break;
    }
    return (
      <Text style={[Fonts.textXs, {color: Colors.dangerMain}]}>{label}</Text>
    );
  }, [reqOtpLoginError]);

  useEffect(() => {
    dispatch({type: AUTH_CONSTANT.CLEAR_AUTH_RESPONSE});
  }, []);

  useEffect(() => {
    if (phoneNumber !== '' && phoneNumber.charAt(0) !== '0') {
      setErrorForm((prev) => ({...prev, startWith: true}));
    } else {
      setErrorForm((prev) => ({...prev, startWith: false}));
    }

    if (phoneNumber !== '' && phoneNumber.substr(0, 2).includes('62')) {
      setErrorForm((prev) => ({...prev, countryCode: true}));
    } else {
      setErrorForm((prev) => ({...prev, countryCode: false}));
    }
  }, [phoneNumber]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[Layout.flex, Layout.flexMid, componentStyles.loginContainer]}>
          <VStack bottom={CustomSpacing(58)}>
            <Text style={{...Fonts.headingMBold}}>{t('Welcome Back!')}</Text>
            <Text style={{...Fonts.textL}}>{t('Sign in to continue')}</Text>
          </VStack>
          <VStack bottom={CustomSpacing(80)}>
            <Text style={{...Fonts.headingSBold}}>{t('Sign In')}</Text>
            <TextInput
              keyboardType="phone-pad"
              value={phoneNumber}
              maxLength={13}
              onChangeText={handleInputPhoneNumber}
              style={{
                ...componentStyles.textInputContainer,
                marginBottom: CustomSpacing(4),
              }}
              placeholder={t('Phone Number...')}
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
            {reqOtpLoginError && (
              <VStack vertical={CustomSpacing(10)}>{warningMessage}</VStack>
            )}
            {errorForm.startWith && (
              <Text style={componentStyles.errorMessage}>
                Phone number must start with 0
              </Text>
            )}
            {errorForm.countryCode && (
              <Text style={componentStyles.errorMessage}>
                Phone number cant contain country code
              </Text>
            )}
          </VStack>
          <VStack style={{alignItems: 'center'}} bottom={CustomSpacing(116)}>
            <Text style={{...Fonts.textM}}>
              {t('Don’t have an account?')}{' '}
              <Text
                onPress={gotoRegister}
                style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
                {t('Sign Up')}
              </Text>
            </Text>
            <Text style={{...Fonts.textM}}>
              {t('Need help?')}{' '}
              <Text style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
                {t('Contact Us')}
              </Text>
            </Text>
          </VStack>
          <Button
            style={{
              width: '100%',
            }}
            disabled={
              phoneNumber.length < 10 ||
              errorForm.startWith ||
              errorForm.countryCode
            }
            onPress={handleModalVisible}>
            <Text style={{...Fonts.textMBold}}>{t('Continue')}</Text>
          </Button>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalConfirmationVisible}
            onRequestClose={handleModalVisible}>
            <View style={[Layout.modalContainer]}>
              <View style={componentStyles.modalStyle}>
                <VStack bottom={CustomSpacing(56)}>
                  <Text style={{...Fonts.textMBold}}>Verification Code</Text>
                  <Text style={{...Fonts.textM, marginTop: CustomSpacing(12)}}>
                    You phone number{' '}
                    <Text style={{...Fonts.textMBold}}>{phoneNumber}</Text>{' '}
                    will be misscalled by our system.{' '}
                    <Text style={{...Fonts.textMBold}}>
                      Please write down the last 4 digit phone number.
                    </Text>
                  </Text>
                </VStack>
                <Button
                  onPress={() => {
                    handleSubmitLogin();
                  }}>
                  <Text style={{...Fonts.textMBold}}>{t('Yes')}</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      <LoadingOverlay showing={reqOtpLoginLoading} text={'Request OTP'} />
    </>
  );
};

export default Login;

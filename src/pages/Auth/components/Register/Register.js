import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Image,
} from 'react-native';
import {PickyuqCar, PickyuqRide, PickyuqCarBigSeat} from '@assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {HStack, VStack, Button, LoadingOverlay} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t from '@lang';

import styles from './Register.style';
import {AUTH_CONSTANT} from '../../Auth.constant';

const RegisterAs = ({registerType, setRegisterType}) => {
  const componentStyles = styles();

  const optionData = [
    {title: 'Pickyuq Ride', id: 1, img: PickyuqRide},
    {title: 'Pickyuq Car (M) *4 passenger seats', id: 2, img: PickyuqCar},
    {title: 'Pickyuq Car (L) *6 passenger seats', id: 3, img: PickyuqCarBigSeat},
  ];

  return (
    <VStack>
      <Text style={{...Fonts.headingSBold, marginVertical: CustomSpacing(10)}}>
        Register As
      </Text>
      <SelectDropdown
        data={optionData}
        defaultValue={registerType}
        onSelect={(selectedItem) => {
          setRegisterType(selectedItem);
        }}
        rowTextForSelection={(item) => {
          return item.title;
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem.title;
        }}
        renderDropdownIcon={() => (
          <Icon name="chevron-down" size={12} color={Colors.neutral50} />
        )}
        buttonStyle={{
          ...componentStyles.textInputContainer,
          width: '100%',
          backgroundColor: Colors.neutral10,
        }}
        dropdownStyle={{
          backgroundColor: Colors.neutral10,
          borderRadius: CustomSpacing(8),
        }}
        rowStyle={{
          borderBottomColor: 'white',
        }}
        buttonTextStyle={{...Fonts.textXs, textAlign: 'left'}}
        dropdownOverlayColor="transparant"
        renderCustomizedRowChild={(data) => (
          <HStack style={{paddingRight: CustomSpacing(10)}}>
            <Image
              source={data.img}
              resizeMode="contain"
              style={componentStyles.rowDropdownImage}
            />
            <Text>{data.title}</Text>
          </HStack>
        )}
      />
    </VStack>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();
  const {reqOtpRegisterResponse, reqOtpRegisterLoading, reqOtpRegisterError} =
    useSelector((state) => state.auth);

  const [registerType, setRegisterType] = useState({
    title: 'Pickyuq Ride',
    id: 1,
    img: PickyuqRide,
  });
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    code: '',
  });
  const [errorForm, setErrorForm] = useState({
    startWith: false,
    countryCode: false,
    validEmail: false,
  });

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (reqOtpRegisterResponse && reqOtpRegisterResponse.drivers) {
      gotoOtp();
    }
  }, [reqOtpRegisterResponse]);

  const handleModalVisible = () => {
    setIsModalConfirmationVisible(!isModalConfirmationVisible);
  };

  const handleSubmitRegister = () => {
    dispatch({
      type: AUTH_CONSTANT.REGISTER,
      payload: formData,
    });
    handleModalVisible();
  };

  const goToLogin = () => {
    navigation.navigate('Login', {
      previousScreen: 'Auth',
    });
  };

  const gotoOtp = () => {
    navigation.navigate('VerifyMissCall', {
      previousScreen: 'Register',
      type: 'Register',
      refCode: formData.code,
    });
  };

  const warningMessage = useMemo(() => {
    let label;
    switch (true) {
      case reqOtpRegisterError === 201:
        label = 'Email / Phone number already registered';
        break;
      case reqOtpRegisterError === 202:
        label = 'Email not valid';
        break;
      default:
        label = 'Something went wrong, please try again later';
        break;
    }
    return (
      <Text style={[Fonts.textXs, {color: Colors.dangerMain}]}>{label}</Text>
    );
  }, [reqOtpRegisterError]);

  useEffect(() => {
    if (formData.phone !== '' && formData.phone.charAt(0) !== '0') {
      setErrorForm((prev) => ({...prev, startWith: true}));
    } else {
      setErrorForm((prev) => ({...prev, startWith: false}));
    }

    if (formData.phone !== '' && formData.phone.substr(0, 2).includes('62')) {
      setErrorForm((prev) => ({...prev, countryCode: true}));
    } else {
      setErrorForm((prev) => ({...prev, countryCode: false}));
    }

    if (formData.email !== '' && !formData.email.match(mailformat)) {
      setErrorForm((prev) => ({...prev, validEmail: true}));
    } else {
      setErrorForm((prev) => ({...prev, validEmail: false}));
    }
  }, [formData]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[Layout.flex, Layout.flexMid, componentStyles.loginContainer]}>
          <VStack bottom={CustomSpacing(40)}>
            <Text style={{...Fonts.headingMBold}}>{t('Getting Started')}</Text>
            <Text style={{...Fonts.textL}}>
              {t('Create an account to continue!')}
            </Text>
          </VStack>
          <VStack bottom={CustomSpacing(35)}>
            <Text
              style={{...Fonts.headingSBold, marginBottom: CustomSpacing(10)}}>
              {t('Sign Up')}
            </Text>
            <TextInput
              style={componentStyles.textInputContainer}
              placeholder="First Name"
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={componentStyles.textInputContainer}
              placeholder="Last Name"
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
            <TextInput
              keyboardType="phone-pad"
              value={formData.phone}
              maxLength={13}
              onChangeText={(e) =>
                setFormData({
                  ...formData,
                  phone: e,
                })
              }
              style={componentStyles.textInputContainer}
              placeholder={t('Phone Number')}
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
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
            <TextInput
              value={formData.email}
              onChangeText={(e) =>
                setFormData({
                  ...formData,
                  email: e,
                })
              }
              style={componentStyles.textInputContainer}
              placeholder={t('Email')}
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
            {errorForm.validEmail && (
              <Text style={componentStyles.errorMessage}>
                Please enter valid email
              </Text>
            )}
            <TextInput
              value={formData.code}
              onChangeText={(e) =>
                setFormData({
                  ...formData,
                  code: e,
                })
              }
              style={componentStyles.textInputContainer}
              placeholder="Referral Code"
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
            />
            {reqOtpRegisterError && <VStack>{warningMessage}</VStack>}

            {/* <RegisterAs
              registerType={registerType}
              setRegisterType={setRegisterType}
            /> */}
          </VStack>
          <VStack style={{alignItems: 'center'}} bottom={CustomSpacing(60)}>
            <Text style={{...Fonts.textM}}>
              {t('Already have an account?')}{' '}
              <Text
                onPress={goToLogin}
                style={{...Fonts.textMBold, color: Colors.secondaryMain}}>
                {t('Sign In')}
              </Text>
            </Text>
          </VStack>
          <Button
            style={{
              width: '100%',
            }}
            disabled={
              !formData.email ||
              !formData.phone ||
              formData.phone.length < 10 ||
              errorForm.startWith ||
              errorForm.countryCode ||
              errorForm.validEmail
            }
            onPress={handleModalVisible}>
            <Text style={{...Fonts.textMBold}}>{t('Continue')}</Text>
          </Button>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalConfirmationVisible}
            onRequestClose={handleModalVisible}>
            <View style={[Layout.modalContainer]}>
              <View style={componentStyles.modalStyle}>
                <VStack bottom={CustomSpacing(56)}>
                  <Text style={{...Fonts.textMBold}}>Verification Code</Text>
                  <Text
                    style={{
                      ...Fonts.textM,
                      marginTop: CustomSpacing(12),
                    }}>
                    You phone number{' '}
                    <Text style={{...Fonts.textMBold}}>+{formData.phone}</Text>{' '}
                    will be misscalled by our system.{' '}
                    <Text style={{...Fonts.textMBold}}>
                      Please write down the last 4 digit phone number.
                    </Text>
                  </Text>
                </VStack>
                <Button
                  onPress={() => {
                    handleSubmitRegister();
                  }}>
                  <Text style={{...Fonts.textMBold}}>{t('Yes')}</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      <LoadingOverlay showing={reqOtpRegisterLoading} text={'Request OTP'} />
    </>
  );
};

export default Register;

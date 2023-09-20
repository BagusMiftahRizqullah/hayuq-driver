import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import t from '@lang';

import {VStack, HStack, HeaderNavigation, Button, ModalBottom} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {SETTING_CONSTANT} from './Setting.constant';
import {MASTER_ACTION} from '../../../../config/masterData';

import styles from './Setting.style';

const ChangePhoneNumber = () => {
  const componentStyles = styles();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {driverDetail: {drivers}} = useSelector(state => state.main)
  const {isLoading} = useSelector((state) => state.masterReducer);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [errorValidation, setErrorValidation] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPhoneNumber: '',
    newPhoneNumber: '',
    confirmPhoneNumber: '',
  });

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleCloseModalConfirm = () => {
    setModalConfirm(false)    
  };

  const redirectToOtpEmail = () => {
    navigation.navigate('VerifyOtpEmail', {
      type: 'Phone Number',
    });
  };

  const storeDataEditPhoneNumber = () => {
    dispatch({
      type: SETTING_CONSTANT.STORE_PHONE_NUMBER_UPDATE_DATA,
      payload: {drivers_id: drivers.id, phone: formData.newPhoneNumber}
    })
  }

  const handleReqOtpEmail = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: drivers.id}
    })
    if (!isLoading) {
      storeDataEditPhoneNumber();
      redirectToOtpEmail();
    }
  };
  
  const validate = () => {
    if (formData.newPhoneNumber !== formData.confirmPhoneNumber) {
      setErrorValidation(prev => ({...prev, confirm: true}))
    } 
    if (formData.newPhoneNumber == formData.confirmPhoneNumber) {
      setErrorValidation(prev => ({...prev, confirm: false}))
    } 
    if (formData.currentPhoneNumber !== drivers.phone) {
      setErrorValidation(prev => ({...prev, current: true}))
    } 
    if (formData.currentPhoneNumber == drivers.phone) {
      setErrorValidation(prev => ({...prev, current: false}))
    }
    if (formData.newPhoneNumber == drivers.phone) {
      setErrorValidation(prev => ({...prev, new: true}))
    }
    if (formData.newPhoneNumber !== drivers.phone) {
      setErrorValidation(prev => ({...prev, new: false}))
    }
  }

  useEffect(() => {
    if (
      formData.currentPhoneNumber !== '' || 
      formData.newPhoneNumber !== '' || 
      formData.confirmPhoneNumber !== ''
    ) {
      validate()
    }
  }, [formData])

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
          <HeaderNavigation
            title={t('Change Phone Number')}
            goback
            onPress={goBackNavigation}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={componentStyles.settingContainer}>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>
                {t('Current phone number')}
              </Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('Current phone number')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.currentPhoneNumber}
                onChangeText={(text) =>
                  setFormData({...formData, currentPhoneNumber: text})
                }
              />
              {errorValidation.current && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  Current number not valid
                </Text>
              )}
            </VStack>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>{t('New phone number')}</Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('New phone number')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.newPhoneNumber}
                onChangeText={(text) =>
                  setFormData({...formData, newPhoneNumber: text})
                }
              />
              {errorValidation.new && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  New Phone number cant be same with current phone number
                </Text>
              )}
            </VStack>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>
                {t('Confirm new phone number')}
              </Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('Confirm new phone number')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.confirmPhoneNumber}
                onChangeText={(text) =>
                  setFormData({...formData, confirmPhoneNumber: text})
                }
              />
              {errorValidation.confirm && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  Confirm Phone number not same with new phone number
                </Text>
              )}
            </VStack>
          </KeyboardAvoidingView>
          <VStack 
            style={{
              ...componentStyles.saveBtn, 
              marginTop: CustomSpacing(20)
            }}
          >
            <Button
              disabled={
                !formData.currentPhoneNumber ||
                !formData.newPhoneNumber ||
                !formData.confirmPhoneNumber
              }
              onPress={() => setModalConfirm(true)}
            >
              <Text style={{...Fonts.textMBold}}>{t('Save')}</Text>
            </Button>
          </VStack>
        </View>
      </TouchableWithoutFeedback>
      
      <ModalBottom
        onClose={handleCloseModalConfirm}
        isVisible={modalConfirm}
        type="bottom"
      >
        <View style={componentStyles.modalStyle}>
          <VStack bottom={CustomSpacing(30)}>
            <Text style={{...Fonts.textMBold}}>Are you sure?</Text>
            <Text
              style={{
                ...Fonts.textM,
                color: Colors.neutral70,
                marginTop: CustomSpacing(12),
              }}>
              Are you sure want to change phone number ? This process cannot be undone. 
              If you sure, an OTP code will send to your email address to verify the process.
            </Text>
          </VStack>
          <HStack style={[Layout.flexCenterMid]}>
            <Button
              style={{
                paddingHorizontal: CustomSpacing(50),
                marginRight: CustomSpacing(16),
                backgroundColor: Colors.primarySurface,
              }}
              onPress={handleCloseModalConfirm}>
              <Text style={{...Fonts.textMBold, color: Colors.primaryPressed}}>
                Cancel
              </Text>
            </Button>
            <Button
              style={{paddingHorizontal: CustomSpacing(50)}}
              onPress={handleReqOtpEmail}
            >
              <Text style={{...Fonts.textMBold}}>Verify</Text>
            </Button>
            {isLoading && (
              <ActivityIndicator
                style={{marginLeft: CustomSpacing(25)}}
                size="small"
                color="#404040"
              />
            )}
          </HStack>
        </View>
      </ModalBottom>
    </>
  );
};

export default ChangePhoneNumber;

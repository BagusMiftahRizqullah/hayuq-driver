import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import t from '@lang';

import {HStack, VStack, HeaderNavigation, Button, ModalBottom} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {SETTING_CONSTANT} from './Setting.constant';
import {MASTER_ACTION} from '../../../../config/masterData';

import styles from './Setting.style';

const ChangeEmail = () => {
  const componentStyles = styles();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {driverDetail: {drivers}} = useSelector(state => state.main)
  const {isLoading} = useSelector((state) => state.masterReducer);
  const [isNotErrorForm, setIsNotErrorForm] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [errorValidation, setErrorValidation] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentEmail: '',
    newEmail: '',
    confirmEmail: '',
  });

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleCloseModalConfirm = () => {
    setModalConfirm(false)    
  };

  const redirectToOtpEmail = () => {
    navigation.navigate('VerifyOtpEmail', {
      type: 'Email',
    });
  };

  const storeDataEditEmail = () => {
    dispatch({
      type: SETTING_CONSTANT.STORE_EMAIL_UPDATE_DATA,
      payload: {drivers_id: drivers.id, email: formData.newEmail}
    })
  }

  const handleReqOtpEmail = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: drivers.id}
    })
    if (!isLoading) {
      storeDataEditEmail();
      redirectToOtpEmail();
    }
  };

  const validate = () => {
    if (formData.newEmail !== formData.confirmEmail) {
      setErrorValidation(prev => ({...prev, confirm: true}))
    } 
    if (formData.newEmail == formData.confirmEmail) {
      setErrorValidation(prev => ({...prev, confirm: false}))
    } 
    if (formData.currentEmail !== drivers.email) {
      setErrorValidation(prev => ({...prev, current: true}))
    } 
    if (formData.currentEmail == drivers.email) {
      setErrorValidation(prev => ({...prev, current: false}))
    }
    if (formData.newEmail == drivers.email) {
      setErrorValidation(prev => ({...prev, new: true}))
    }
    if (formData.newEmail !== drivers.email) {
      setErrorValidation(prev => ({...prev, new: false}))
    }
  }

  useEffect(() => {
    if (
      formData.currentEmail !== '' || 
      formData.newEmail !== '' || 
      formData.confirmEmail !== ''
    ) {
      validate()
    }
  }, [formData])

  useEffect(() => {
    const errorForm = Object.values(errorValidation).filter((e) => e === true);
    if (errorForm.length === 0) {
      setIsNotErrorForm(true);
    } else {
      setIsNotErrorForm(false);
    }
  }, [formData]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
          <HeaderNavigation
            title={t('Change Email')}
            goback
            onPress={goBackNavigation}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={componentStyles.settingContainer}>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>{t('Current email')}</Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('Current email')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.currentEmail}
                onChangeText={(text) =>
                  setFormData({...formData, currentEmail: text})
                }
              />
              {errorValidation.current && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  Current email not valid
                </Text>
              )}
            </VStack>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>{t('New email')}</Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('New email')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.newEmail}
                onChangeText={(text) =>
                  setFormData({...formData, newEmail: text})
                }
              />
              {errorValidation.new && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  New email cant be same with current email
                </Text>
              )}
            </VStack>
            <VStack vertical={CustomSpacing(5)}>
              <Text style={{...Fonts.textLBold}}>{t('Confirm new email')}</Text>
              <TextInput
                style={componentStyles.textInputContainer}
                placeholder={t('Confirm new email')}
                placeholderTextColor={Colors.neutral60}
                underlineColorAndroid="transparent"
                value={formData.confirmEmail}
                onChangeText={(text) =>
                  setFormData({...formData, confirmEmail: text})
                }
              />
              {errorValidation.confirm && (
                <Text style={[Fonts.textXs, {color: Colors.dangerMain, marginVertical: CustomSpacing(7)}]}>
                  Confirm email not same with new email
                </Text>
              )}
            </VStack>
          </KeyboardAvoidingView>
          <VStack style={{...componentStyles.saveBtn, marginTop: CustomSpacing(20)}}>
            <Button
              disabled={
                !formData.currentEmail ||
                !formData.newEmail ||
                !formData.confirmEmail
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
              Are you sure want to change this Email ? This process cannot be undone. 
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

export default ChangeEmail;

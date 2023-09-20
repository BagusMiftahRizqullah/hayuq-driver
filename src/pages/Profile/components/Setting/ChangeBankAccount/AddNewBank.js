import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';

import t from '@lang';

import {ArrowDownIcon, DummyImage} from '@assets';
import {
  HStack,
  VStack,
  HeaderNavigation,
  Button,
  ModalBottom,
} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {SETTING_CONSTANT} from '../Setting.constant';
import {MASTER_ACTION} from '../../../../../config/masterData';

import styles from './ChangeBankAccount.style';

const AddNewAccount = ({route}) => {
  const {idBank} = route.params
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();
  const {
    masterReducer: {dataListBanks},
    main: {driverDetail},
    settingReducer: {isLoading},
  } = useSelector((state) => state);
  const [modalUpload, setModalUpload] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [filledForm, setFilledForm] = useState(false);
  const [dataForm, setDataForm] = useState({
    id: driverDetail.driverbanks.id,
    banks_id: '',
    name: '',
    number: '',
    pictures: '',
  });

  const selectedBank = dataListBanks.findIndex(
    (e, i) => e.id === dataForm.banks_id,
  );

  const driverId = driverDetail.driverdetails.drivers_id

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleCloseModalConfirm = () => {
    setModalConfirm(false)    
   };

  const handleCloseModalUpload = () => {
    setModalUpload(!modalUpload);
  };

  const redirectToOtpEmail = () => {
    navigation.navigate('VerifyOtpEmail', {
      type: 'Bank Account',
    });
  };

  const handleStoreDataBankAccount = () => {
    dispatch({
      type: SETTING_CONSTANT.STORE_BANK_ACCOUNT_UPDATE_DATA,
      payload: {
        drivers_id: driverDetail.drivers.id,
        banks: dataForm
      }
    })
  }

  const handleReqOtpEmail = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: driverDetail.drivers.id}
    })
    if (!isLoading) {
      handleStoreDataBankAccount();
      redirectToOtpEmail();
    }
  };

  const cameraHandler = useCallback((response) => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    if (response && response.didCancel === undefined && response.assets) {
      const newImage = {
        id: randomId,
        uri: response.assets[0].uri,
        url: response.assets[0].uri,
        type: 'image/jpeg',
        name: `image-${randomId}-${new Date().getTime()}.jpg`,
        value: response.assets[0],
        base64: response.assets[0].base64,
      };
      setImageList([newImage]);
      setDataForm((prev) => ({
        ...prev,
        pictures: `data:image/jpeg;base64,${response.assets[0].base64}`,
      }));
    } else if (response.didCancel) {
      handleCloseModalUpload();
    }
  }, []);

  const handleUploadByCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: Platform.OS === 'ios' ? 0.2 : 0.5,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: true,
      },
      cameraHandler,
    );
    handleCloseModalUpload();
  };

  const handleUploadByLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: Platform.OS === 'ios' ? 0.2 : 0.5,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: true,
      },
      cameraHandler,
    );
    handleCloseModalUpload();
  };

  const handleSubmitChangeBank = () => {
    dispatch({
      type: SETTING_CONSTANT.CHANGE_BANK_ACCOUNT,
      payload: {drivers_id: driverId, banks: dataForm},
    });
    !isLoading && navigation.navigate('ChangeBankAccount')
  };

  useEffect(() => {
    const notFilledForm = Object.values(dataForm).filter((e) => e == '');
    if (notFilledForm.length === 0) {
      setFilledForm(true);
    }
  }, [dataForm]);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={'Add New'} goback onPress={goBackNavigation} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={componentStyles.containerBankAccount}>
          <VStack vertical={CustomSpacing(5)} style={{width: '100%'}}>
            <Text style={{...Fonts.textLBold}}>{t('Bank Name')}</Text>
            <SelectDropdown
              style={{width: '100%'}}
              data={dataListBanks}
              defaultValueByIndex={selectedBank}
              search={true}
              onSelect={(selectedItem, index) => {
                setDataForm((prev) => ({...prev, banks_id: selectedItem.id.toString()}));
              }}
              renderDropdownIcon={() => (
                <Image
                  source={ArrowDownIcon}
                  style={{
                    width: CustomSpacing(10),
                    height: CustomSpacing(6),
                    marginRight: CustomSpacing(6),
                  }}
                />
              )}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                ...componentStyles.bankNameInput,
              }}
              buttonTextStyle={{...Fonts.textS, textAlign: 'left'}}
              rowTextStyle={{...Fonts.textS}}
            />
          </VStack>
          <VStack vertical={CustomSpacing(5)}>
            <Text style={{...Fonts.textLBold}}>Bank Account Name</Text>
            <TextInput
              style={componentStyles.textInputContainer}
              placeholder="Bank Account Name"
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
              onChangeText={(value) =>
                setDataForm((prev) => ({...prev, name: value}))
              }
            />
          </VStack>
          <VStack vertical={CustomSpacing(5)}>
            <Text style={{...Fonts.textLBold}}>{t('Account Number')}</Text>
            <TextInput
              style={componentStyles.textInputContainer}
              placeholder="Account Number"
              keyboardType="numeric"
              placeholderTextColor={Colors.neutral60}
              underlineColorAndroid="transparent"
              onChangeText={(value) =>
                setDataForm((prev) => ({...prev, number: value}))
              }
            />
          </VStack>
          <VStack style={{marginTop: CustomSpacing(5)}}>
            <Pressable onPress={() => setModalUpload(true)}>
              <View
                style={{
                  ...componentStyles.cardDocument,
                  marginTop: CustomSpacing(15),
                }}>
                {imageList[0] === undefined ? (
                  <HStack style={Layout.flexRowBetween}>
                    <HStack
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          marginRight: CustomSpacing(10),
                        }}>
                        <Image
                          source={DummyImage}
                          style={{
                            width: CustomSpacing(28),
                            height: CustomSpacing(28),
                          }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            ...Fonts.textMBold,
                            color: Colors.neutral90,
                          }}>
                          Bank Account
                        </Text>
                        <Text
                          style={{
                            ...Fonts.textM,
                            color: Colors.dangerMain,
                            marginBottom: CustomSpacing(2),
                          }}>
                          Upload
                        </Text>
                      </View>
                    </HStack>
                  </HStack>
                ) : (
                  <VStack style={Layout.flexCenterMid}>
                    <Image
                      source={{uri: imageList[0]?.uri}}
                      style={{
                        ...componentStyles.imageContainer,
                        marginBottom: CustomSpacing(5),
                      }}
                    />
                    <Text style={Fonts.textXsBold}>Bank Account</Text>
                    <Text
                      style={{
                        ...Fonts.textXs,
                        color: Colors.successMain,
                        marginTop: CustomSpacing(5),
                      }}>
                      Uploaded
                    </Text>
                  </VStack>
                )}
              </View>
            </Pressable>
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <VStack style={componentStyles.addBankBtn}>
        <Button disabled={!filledForm} onPress={() => setModalConfirm(true)}>
          <Text style={{...Fonts.textMBold}}>{t('Save')}</Text>
        </Button>
      </VStack>

      <ModalBottom
        isVisible={modalUpload}
        type="bottom"
        onClose={handleCloseModalUpload}>
        <View style={componentStyles.modalStyle}>
          <VStack
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Pressable style={{width: '100%'}} onPress={handleUploadByCamera}>
              <Text
                style={{
                  borderBottomWidth: CustomSpacing(0.3),
                  borderColor: Colors.neutral50,
                  paddingBottom: CustomSpacing(14),
                  width: '100%',
                  textAlign: 'center',
                }}>
                From Camera
              </Text>
            </Pressable>
            <Pressable style={{width: '100%'}} onPress={handleUploadByLibrary}>
              <Text
                style={{
                  paddingTop: CustomSpacing(14),
                  textAlign: 'center',
                }}>
                From Gallery
              </Text>
            </Pressable>
          </VStack>
        </View>
      </ModalBottom>

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
              Are you sure want to change this bank account ? This process cannot be undone. 
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
    </View>
  );
};

export default AddNewAccount;

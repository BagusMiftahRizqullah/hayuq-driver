import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {launchCamera} from 'react-native-image-picker';
import {Calendar} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import t from '@lang';

import {dimensions} from '@config/Platform.config';
import {HStack, VStack, HeaderNavigation, Button, ModalBottom} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {ArrowDownIcon} from '@assets';

import {MASTER_ACTION} from '../../../../config/masterData';
import {SETTING_CONSTANT} from '../Setting/Setting.constant';
import styles from './Setting.style';

const ChangeVehicleInformation = () => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {driverDetail} = useSelector((state) => state.main);
  const {dataListVehicle, isLoading} = useSelector((state) => state.masterReducer);
  const [imageList, setImageList] = useState([]);
  const [modalCalendar, setShowModalCalendar] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [filledForm, setFilledForm] = useState(false);

  const [formData, setFormData] = useState({
    vehicles_id: '',
    model: '',
    plate_number: '',
    year: '',
    licenses_expired_date: '',
    pictures: '',
    licenses: '',
    id: driverDetail?.drivervehicles?.id
  });

  const selectTypeVehicle = dataListVehicle?.filter(
    (e) => e.id === driverDetail?.drivervehicles?.vehicles_id,
  )[0];

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const redirectToOtpEmail = () => {
    navigation.navigate('VerifyOtpEmail', {
      type: 'Vehicle Info',
    });
  };

  const handleStoreDataUpdateVehicle = () => {
    dispatch({ 
      type: SETTING_CONSTANT.STORE_VEHICLE_UPDATE_DATA,
      payload: {
        drivers_id: driverDetail.drivers.id,
        vehicles: formData
      }
    })
  };

  const handleReqOtpEmail = () => {
    dispatch({ 
      type: MASTER_ACTION.CREATE_OTP_EMAIL,
      payload: {drivers_id: driverDetail.drivers.id}
    })
    if (!isLoading) {
      handleStoreDataUpdateVehicle();
      redirectToOtpEmail();
    }
  };

  const handleCloseModalCalendar = () => {
    setShowModalCalendar(false);
  };

  const handleCloseModalConfirm = () => {
   setModalConfirm(false)    
  };

  const renderExpiredDate = () => {
    if (formData.licenses_expired_date) {
      return moment(formData.licenses_expired_date).format('YYYY-MM-DD')
    } else {
      return 'e.g. 20-08-2025'
    }
  }

  const markedCalendar = useMemo(() => {
    return {
      [formData.licenses_expired_date]: {
        selected: true,
        selectedColor: '#FFD202',
      },
    };
  }, [formData.licenses_expired_date]);

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
      setImageList([newImage.uri]);
      setFormData((prev) => ({
        ...prev,
        pictures: `data:image/jpeg;base64,${response.assets[0].base64}`,
      }));
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
  };

  useEffect(() => {
    const notFilledForm = Object.values(formData).filter((e) => e == '');
    if (notFilledForm.length === 0) {
      setFilledForm(true);
    }
  }, [formData]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
          <HeaderNavigation
            title={t('Change Vehicle Info')}
            goback
            onPress={goBackNavigation}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView 
              style={{ 
                height: dimensions.screenHeight * 0.77, 
                paddingHorizontal: CustomSpacing(16),
                marginVertical: CustomSpacing(20)
              }}
            >
              <VStack style={componentStyles.cardSetting}>
                <HStack>
                  <VStack right={CustomSpacing(10)}>
                    <Text style={componentStyles.cardVehicleInfoText}>{t('Type')}</Text>
                    <Text style={componentStyles.cardVehicleInfoText}>Model</Text>
                    <Text style={componentStyles.cardVehicleInfoText}>
                      {t('Number Plate')}
                    </Text>
                    <Text style={componentStyles.cardVehicleInfoText}>STNK</Text>
                  </VStack>
                  <VStack>
                    <Text style={componentStyles.cardVehicleInfoText}>
                      :{"  "}  {selectTypeVehicle?.name}
                    </Text>
                    <Text style={componentStyles.cardVehicleInfoText}>
                      :{"  "}  {driverDetail?.drivervehicles?.model}
                    </Text>
                    <Text
                      style={componentStyles.cardVehicleInfoText}>
                      :{"  "}  {driverDetail?.drivervehicles?.plate_number}
                    </Text>
                    <Text style={componentStyles.cardVehicleInfoText}>
                      :{"  "}  {driverDetail?.drivervehicles?.licenses}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>{t('Vehicle Type')}</Text>
                <SelectDropdown
                  data={dataListVehicle}
                  defaultValueByIndex={formData.vehicles_id - 1}
                  search={true}
                  onSelect={(selectedItem) => {
                    setFormData((prev) => ({
                      ...prev,
                      vehicles_id: selectedItem?.id,
                    }));
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
                  rowTextForSelection={(item) => {
                    return item.name;
                  }}
                  buttonStyle={{
                    ...componentStyles.textInputContainerDropDown,
                  }}
                  buttonTextStyle={{...Fonts.textS, textAlign: 'left'}}
                  rowTextStyle={{...Fonts.textS}}
                  defaultButtonText='Select vehicle type'
                />
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>Vehicle Model</Text>
                <TextInput
                  style={componentStyles.textInputContainer}
                  placeholder="e.g. Vario 125"
                  placeholderTextColor={Colors.neutral60}
                  underlineColorAndroid="transparent"
                  value={formData.model}
                  onChangeText={(text) =>
                    setFormData({...formData, model: text})
                  }
                />
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>{t('Number Plate')}</Text>
                <TextInput
                  style={componentStyles.textInputContainer}
                  placeholder='e.g. B0864SMA'
                  placeholderTextColor={Colors.neutral60}
                  underlineColorAndroid="transparent"
                  value={formData.plate_number}
                  onChangeText={(text) =>
                    setFormData({...formData, plate_number: text})
                  }
                />
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>License Number (STNK)</Text>
                <TextInput
                  style={componentStyles.textInputContainer}
                  placeholder='e.g. 3000-6999'
                  placeholderTextColor={Colors.neutral60}
                  underlineColorAndroid="transparent"
                  value={formData.licenses}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setFormData({...formData, licenses: text})
                  }
                />
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>License Expired</Text>
                <Pressable onPress={() => setShowModalCalendar(true)}>
                  <View
                    style={{
                      ...componentStyles.textInputContainer,
                      height: CustomSpacing(47),
                    }}>
                    <Text style={{marginVertical: CustomSpacing(13), color: Colors.neutral90}}>
                      {renderExpiredDate()}
                    </Text>
                  </View>
                </Pressable>
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold}}>Vehicle Year</Text>
                <TextInput
                  style={componentStyles.textInputContainer}
                  placeholder="e.g. 2015"
                  placeholderTextColor={Colors.neutral60}
                  underlineColorAndroid="transparent"
                  value={formData.year}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setFormData({...formData, year: text})
                  }
                />
              </VStack>
              <VStack vertical={CustomSpacing(5)}>
                <Text style={{...Fonts.textLBold, marginBottom: CustomSpacing(5)}}>
                  {t('New STNK Upload')}
                </Text>
                <Pressable
                  style={{
                    ...componentStyles.cardSetting,
                    marginTop: CustomSpacing(8),
                  }}
                  onPress={handleUploadByCamera}
                >
                  {imageList[0] === undefined ? (
                    <HStack style={[Layout.flexFullBetween]}>
                      <HStack>
                        <Icon name={'photo'} size={18} color={Colors.neutral90} />
                        <VStack left={CustomSpacing(10)}>
                          <Text style={{...Fonts.textMBold}}>
                            STNK
                          </Text>
                        </VStack>
                      </HStack>
                      <Icon name="chevron-right" size={10} color={Colors.neutral70} />
                    </HStack>
                  ) : (
                    <VStack style={Layout.flexCenterMid}>
                      <Image
                        source={{uri: imageList[0]?.uri ?? imageList[0]}}
                        style={{
                          ...componentStyles.imageContainer,
                          marginBottom: CustomSpacing(5),
                        }}
                      />
                      <Text style={Fonts.textXsBold}>STNK</Text>
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
                </Pressable>
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
          <VStack style={componentStyles.saveBtn}>
            <Button
              disabled={!filledForm}
              onPress={() => setModalConfirm(true)}
            >
              <Text style={{...Fonts.textMBold}}>{t('Save')}</Text>
            </Button>
          </VStack>
        </View>
      </TouchableWithoutFeedback>

      <ModalBottom
        onClose={handleCloseModalCalendar}
        isVisible={modalCalendar}
        type="bottom"
      >
        <View style={componentStyles.modalStyle}>
          <Calendar
            enableSwipeMonths
            initialDate={moment(new Date()).format('YYYY-MM-DD')}
            markedDates={markedCalendar}
            onDayPress={(day) => {
              setFormData((prev) => ({...prev, licenses_expired_date: day.dateString}));
              handleCloseModalCalendar();
            }}
          />
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
              Are you sure want to change vehicle info? This process cannot be undone. 
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

export default ChangeVehicleInformation;

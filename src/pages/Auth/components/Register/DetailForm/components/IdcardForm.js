import {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';

import {REGISTER_PROCESS} from '../../RegistrationProcess/RegistrationProcess.constant';
import {DummyImage, ArrowDownIcon, ErrorUploadIcon} from '@assets';
import {Button, HStack, VStack, ModalBottom} from '@components';
import {dimensions} from '@config/Platform.config';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import styles from '../DetailForm.style';

const IdcardForm = ({setActiveForm}) => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const {
    auth: {dataUser},
    registerProcessReducer: {isLoading, dataIdCard},
  } = useSelector((state) => state);
  const [openModal, setOpenModel] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [imageList, setImageList] = useState([dataIdCard?.path]);
  const [filledForm, setFilledForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [dataForm, setDataForm] = useState({
    nik: dataIdCard?.nik || '',
    name: dataIdCard?.name || '',
    genders_id: dataIdCard?.gender_id || '',
    religions_id: dataIdCard?.religion_id || '',
    address: dataIdCard?.driveraddress?.address || '',
    pictures: dataIdCard?.path || '',
  });

  const handleCloseModalErrorSubmit = () => {
    setErrorSubmit(false)
  };

  const handleCloseModalConfirm = () => {
    setOpenModel(!openModal);
  };

  const handleCloseModalUpload = () => {
    setModalUpload(!modalUpload);
  };

  const handleCloseModalErrorUpload = () => {
    setErrorUpload(!errorUpload);
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
      setImageList([newImage.uri]);
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

  const handleSubmitDataIdCard = () => {
    const idDriver = dataUser.id;
    dispatch({
      type: REGISTER_PROCESS.REGISTER_ADD_IDCARD,
      payload: {drivers_id: idDriver, details: dataForm},
      meta: {
        success: function(){
          handleCloseModalConfirm();
          setActiveForm('');
        },
        failed: function(){
          handleCloseModalConfirm();
          setErrorSubmit(true);
        }
      }
    });
  };

  useEffect(() => {
    const notFilledForm = Object.values(dataForm).filter((e) => e == '');
    if (notFilledForm.length === 0) {
      setFilledForm(true);
    }
  }, [dataForm]);

  return (
    <ScrollView>
      <VStack style={{marginHorizontal: CustomSpacing(16)}}>
        <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
          ID Card Number
        </Text>
        <TextInput
          style={componentStyles.inputStyle}
          placeholder="e.g. 12345678910111213"
          keyboardType="numeric"
          value={dataForm.nik.toString()}
          onChangeText={(e) => setDataForm((prev) => ({...prev, nik: e}))}
        />
        <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
          Name
        </Text>
        <TextInput
          style={componentStyles.inputStyle}
          placeholder="e.g. alex"
          value={dataForm.name}
          onChangeText={(e) => setDataForm((prev) => ({...prev, name: e}))}
        />
        <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
          Gender
        </Text>
        <SelectDropdown
          data={['Male', 'Female']}
          defaultValueByIndex={dataForm.genders_id - 1}
          onSelect={(selectedItem, index) => {
            setDataForm((prev) => ({...prev, genders_id: index + 1}));
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
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{
            ...componentStyles.inputStyle,
          }}
          buttonTextStyle={{...Fonts.textS, textAlign: 'left'}}
          rowTextStyle={{...Fonts.textS}}
        />
        <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
          Religion
        </Text>
        <SelectDropdown
          data={[
            'Islam',
            'Kristen Katolik',
            'Kristen Protestan',
            'Hindu',
            'Buddha',
            'Konghucu',
          ]}
          defaultValueByIndex={dataForm.religions_id - 1}
          onSelect={(selectedItem, index) => {
            setDataForm((prev) => ({...prev, religions_id: index + 1}));
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
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{
            ...componentStyles.inputStyle,
          }}
          buttonTextStyle={{...Fonts.textS, textAlign: 'left'}}
          rowTextStyle={{...Fonts.textS}}
        />
        <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
          Address
        </Text>
        <TextInput
          style={[componentStyles.inputStyle, {height: CustomSpacing(80)}]}
          placeholder="e.g. Jl. Perdamaian No. 32 RT.03/09 Bekasi"
          value={dataForm.address}
          onChangeText={(e) => setDataForm((prev) => ({...prev, address: e}))}
        />
        <Pressable onPress={() => setModalUpload(true)}>
          <View
            style={{
              ...componentStyles.cardDocument,
              marginTop: CustomSpacing(10),
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
                      ID Card
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
                  source={{uri: imageList[0]}}
                  style={{
                    ...componentStyles.imageContainer,
                    marginBottom: CustomSpacing(5),
                  }}
                />
                <Text style={Fonts.textXsBold}>ID Card</Text>
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
      <VStack
        style={{
          width: dimensions.screenWidth,
        }}>
        {filledForm | dataIdCard?.document_status?.includes('rejected') ? (
          <Button
            style={{margin: CustomSpacing(16)}}
            onPress={() => setOpenModel(true)}>
            <Text style={Fonts.textLBold}>Save</Text>
          </Button>
        ): null}
      </VStack>

      <ModalBottom
        onClose={handleCloseModalErrorSubmit}
        isVisible={errorSubmit}
        type="center">
        <View style={{...componentStyles.modalStyle, borderRadius: CustomSpacing(10)}}>
          <VStack bottom={CustomSpacing(30)} top={CustomSpacing(10)} >
            <Text style={{...Fonts.textMBold, textAlign: 'center'}}>Submit Failed</Text>
          </VStack>
          <HStack style={[Layout.flexCenterMid]}>
            <Button
              onPress={handleCloseModalErrorSubmit}
              style={{paddingHorizontal: CustomSpacing(50)}}
            >
              <Text style={{...Fonts.textMBold}}>Try Again</Text>
            </Button>
          </HStack>
        </View>
      </ModalBottom>

      <ModalBottom
        onClose={handleCloseModalConfirm}
        isVisible={openModal}
        type="bottom">
        <View style={componentStyles.modalStyle}>
          <VStack bottom={CustomSpacing(56)}>
            <Text style={{...Fonts.textMBold}}>ID Card Confirmation</Text>
            <Text
              style={{
                ...Fonts.textM,
                color: Colors.neutral70,
                marginTop: CustomSpacing(12),
              }}>
              I hereby declare that the personal data I have submitted is the
              most recent and correct.
            </Text>
          </VStack>
          <HStack style={[Layout.flexCenterMid]}>
            <Button
              style={{
                paddingHorizontal: CustomSpacing(50),
                marginRight: CustomSpacing(16),
                backgroundColor: Colors.primarySurface,
              }}
              onPress={() => setOpenModel(!openModal)}>
              <Text style={{...Fonts.textMBold, color: Colors.primaryPressed}}>
                Cancel
              </Text>
            </Button>
            <Button
              onPress={!isLoading && handleSubmitDataIdCard}
              style={{paddingHorizontal: CustomSpacing(50)}}>
              <Text style={{...Fonts.textMBold}}>Send</Text>
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
        isVisible={errorUpload}
        type="bottom"
        onClose={handleCloseModalErrorUpload}>
        <View style={componentStyles.modalStyle}>
          <VStack
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              source={ErrorUploadIcon}
              style={{width: CustomSpacing(36), height: CustomSpacing(36)}}
            />
            <Text
              style={{...Fonts.textLBold, marginVertical: CustomSpacing(10)}}>
              Upload Failed
            </Text>
            <Text
              style={{
                ...Fonts.textM,
                color: Colors.dangerMain,
                lineHeight: CustomSpacing(25),
              }}>
              Upload failed. Maximum size for photo is 2 MB. Please
            </Text>
            <Text style={{...Fonts.textMBold, color: Colors.dangerMain}}>
              take another photo or change resolution.
            </Text>
            <Button
              style={{
                width: dimensions.screenWidth - 16,
                marginTop: CustomSpacing(18),
              }}>
              <Text style={Fonts.textLBold}>Retry</Text>
            </Button>
          </VStack>
        </View>
      </ModalBottom>
    </ScrollView>
  );
};

export default IdcardForm;

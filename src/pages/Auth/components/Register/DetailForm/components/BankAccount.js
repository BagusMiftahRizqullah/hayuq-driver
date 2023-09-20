import {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
} from 'react-native';
import {DummyImage, ArrowDownIcon, ErrorUploadIcon} from '@assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';

import {REGISTER_PROCESS} from '../../RegistrationProcess/RegistrationProcess.constant';
import {Button, HStack, VStack, ModalBottom} from '@components';
import {dimensions} from '@config/Platform.config';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import styles from '../DetailForm.style';

const BankAccountForm = ({setActiveForm}) => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const {
    auth: {dataUser},
    registerProcessReducer: {isLoading, dataBank},
    masterReducer: {dataListBanks},
  } = useSelector((state) => state);
  const [openModal, setOpenModel] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [imageList, setImageList] = useState([dataBank?.path]);
  const [filledForm, setFilledForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [dataForm, setDataForm] = useState({
    banks_id: dataBank?.banks_id || '',
    name: dataBank?.banks?.account_name || '',
    number: dataBank?.number || '',
    pictures: dataBank?.path || '',
  });

  const selectedBank = dataListBanks.findIndex(
    (e, i) => e.id === dataForm.banks_id,
  );
  
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

  const handleSumbitDataBank = () => {
    const idDriver = dataUser.id;
    dispatch({
      type: REGISTER_PROCESS.REGISTER_ADD_BANK,
      payload: {drivers_id: idDriver, banks: dataForm},
      meta: {
        success: function(){
          setOpenModel(false);
          setActiveForm('');
        },
        failed: function() {
          handleCloseModalConfirm()
          setErrorSubmit(true)
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
    <View style={[Layout.flex]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[Layout.flex]}>
          <VStack style={{marginHorizontal: CustomSpacing(16)}}>
            <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
              Bank Name
            </Text>
            <SelectDropdown
              data={dataListBanks}
              defaultValueByIndex={selectedBank}
              search={true}
              onSelect={(selectedItem, index) => {
                setDataForm((prev) => ({...prev, banks_id: selectedItem.id}));
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
                ...componentStyles.inputStyle,
              }}
              buttonTextStyle={{...Fonts.textS, textAlign: 'left'}}
              rowTextStyle={{...Fonts.textS}}
            />
            <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
              Bank Account Name
            </Text>
            <TextInput
              style={componentStyles.inputStyle}
              placeholder="e.g John Doe"
              value={dataForm.name}
              onChangeText={(e) => setDataForm((prev) => ({...prev, name: e}))}
            />
            <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
              Account Number
            </Text>
            <TextInput
              style={componentStyles.inputStyle}
              placeholder="123 456 789 012"
              keyboardType="numeric"
              value={dataForm.number}
              onChangeText={(e) =>
                setDataForm((prev) => ({...prev, number: e}))
              }
            />
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
                      source={{uri: imageList[0]?.uri ?? imageList[0]}}
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
          <VStack
            style={{
              position: 'absolute',
              width: dimensions.screenWidth,
              bottom: 20,
            }}>
            {filledForm | dataBank?.document_status?.includes('rejected') ? (
              <Button
                style={{margin: CustomSpacing(16)}}
                onPress={() => setOpenModel(!openModal)}>
                <Text style={Fonts.textLBold}>Save</Text>
              </Button>
            ): null}
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

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
            <Text style={{...Fonts.textMBold}}>Bank Account Confirmation</Text>
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
              onPress={!isLoading && handleSumbitDataBank}
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
    </View>
  );
};

export default BankAccountForm;

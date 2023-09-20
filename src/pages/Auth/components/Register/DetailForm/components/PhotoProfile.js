import {useState, useCallback, useEffect} from 'react';
import {Text, Image, Pressable, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {REGISTER_PROCESS} from '../../RegistrationProcess/RegistrationProcess.constant';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {HStack, VStack, Button, ModalBottom} from '@components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {DummyImage, ErrorUploadIcon} from '@assets';
import {dimensions} from '@config/Platform.config';
import styles from '../DetailForm.style';

const UploadImage = ({setActiveForm}) => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const {
    auth: {dataUser},
    registerProcessReducer: {isLoading, dataProfile},
  } = useSelector((state) => state);
  const [openModal, setOpenModel] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [imageList, setImageList] = useState([dataProfile.path]);

  const handleCloseModalConfirm = () => {
    setOpenModel(!openModal);
  };

  const handleCloseModalErrorSubmit = () => {
    setErrorSubmit(false)
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

  const handleSenDataProfile = () => {
    const idDriver = dataUser?.id;
    dispatch({
      type: REGISTER_PROCESS.REGISTER_ADD_PROFILE,
      payload: {
        drivers_id: idDriver,
        profiles: {
          pictures: `data:${imageList[0].type};base64,${imageList[0].base64}`,
        },
      },
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

  return (
    <VStack style={[Layout.flex]}>
      <Pressable
        onPress={() => setModalUpload(true)}
        style={{margin: CustomSpacing(16)}}>
        <View style={componentStyles.cardDocument}>
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
                    Photo Profile
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
                source={{uri: imageList[0].uri ?? imageList[0]}}
                style={{
                  ...componentStyles.imageContainer,
                  marginBottom: CustomSpacing(5),
                }}
              />
              <Text style={Fonts.textXsBold}>Photo Profile</Text>
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
            <Text style={{...Fonts.textMBold}}>Photo Profile Confirmation</Text>
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
              onPress={!isLoading && handleSenDataProfile}
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

      <View
        style={{
          position: 'absolute',
          width: dimensions.screenWidth,
          bottom: 0,
        }}>
        {imageList.length > 0 && (
          <Button
            style={{margin: CustomSpacing(16)}}
            onPress={() => setOpenModel(!openModal)}>
            <Text style={Fonts.textLBold}>Save</Text>
          </Button>
        )}
      </View>
    </VStack>
  );
};

export default UploadImage;

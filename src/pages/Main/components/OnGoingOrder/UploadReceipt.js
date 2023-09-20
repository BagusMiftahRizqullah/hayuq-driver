import React, {useCallback, useRef, useMemo, useEffect} from 'react';
import {Text, Platform, ActivityIndicator} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import t from '@lang';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import FastImage from 'react-native-fast-image';
// import BottomSheet from '@gorhom/bottom-sheet';
import {VStack, HStack, Button, Spacer, HeaderNavigation} from '@components';
import {dimensions} from '@config/Platform.config';
import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import {useStores} from '@store/root.store';
import styles from './OnGoingOrder.style';

const UploadReceipt = observer(() => {
  const {mainStore} = useStores();
  const componentStyles = styles();
  const navigation = useNavigation();
  const otpInput = useRef(null);

  const transactionId = useMemo(() => {
    return mainStore.currentOrderData?.transactions?.data?.transactions?.id;
  }, [mainStore.currentOrderData]);

  const goBackNavigation = () => {
    mainStore.clearReceiptImage();
    navigation.goBack();
  };

  const submitReceipt = () => {
    mainStore.postUploadReceipt(transactionId);
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
      mainStore.setReceiptImage(
        response.assets[0].uri,
        `data:image/jpeg;base64,${response.assets[0].base64}`,
      );
    } else if (response.didCancel) {
      console.log('CANCEL TAKE PHOTO');
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
    if (mainStore.uploadReceiptData !== null) {
      goBackNavigation();
      mainStore.clearPostUploadReceipt();
      mainStore.setCurrentOrderStatus('ready');
    }
  }, [mainStore.uploadReceiptData]);

  return (
    <VStack>
      <HeaderNavigation
        title={t('Photo Upload')}
        goback
        onPress={goBackNavigation}
      />
      <VStack
        style={{
          backgroundColor: Colors.backgroundMain,
          height: '100%',
        }}>
        <FastImage
          source={{uri: mainStore.receiptImage}}
          style={{
            width: dimensions.screenWidth,
            height: dimensions.screenWidth * 1.2,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <VStack
          style={{
            padding: CustomSpacing(16),
          }}>
          <Text style={[Fonts.textM]}>
            Notes: make sure the writing on the receipt is clear, if it is you
            can continue by clicking the continue button.
          </Text>
          <Spacer height={CustomSpacing(16)} />
          <HStack justifyContent="space-between">
            <Button
              onPress={handleUploadByCamera}
              style={{
                backgroundColor: Colors.primarySurface,
                width: dimensions.screenWidth * 0.43,
              }}>
              <Text style={{...Fonts.textMBold}}>Retake</Text>
            </Button>
            <Button
              disabled={mainStore.uploadReceiptLoading}
              onPress={submitReceipt}
              style={{
                width: dimensions.screenWidth * 0.43,
                backgroundColor: Colors.primaryMain,
              }}>
              {mainStore.uploadReceiptLoading ? (
                <ActivityIndicator size={'small'} color={Colors.neutral80} />
              ) : (
                <Text style={{...Fonts.textMBold}}>Continue</Text>
              )}
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
});

export default UploadReceipt;

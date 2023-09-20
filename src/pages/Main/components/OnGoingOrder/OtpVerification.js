import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Text} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import t from '@lang';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {VStack, Button, Spacer, HeaderNavigation} from '@components';
import {dimensions} from '@config/Platform.config';
import {Colors, CustomSpacing, Fonts} from '@styles';
import {useStores} from '@store/root.store';
import styles from './OnGoingOrder.style';

const OtpVerification = observer(() => {
  const {mainStore} = useStores();
  const componentStyles = styles();
  const navigation = useNavigation();
  const otpInput = useRef(null);

  const transactionId = useMemo(() => {
    return mainStore.currentOrderData?.transactions?.data?.transactions?.id;
  }, [mainStore.currentOrderData]);

  const [otpCode, setOtpCode] = useState('');

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const submitOtp = () => {
    const data = {
      transactions_id: transactionId,
      otpCode: otpCode,
    };
    mainStore.postVerifyOtp(data);
  };

  useEffect(() => {
    if (mainStore.verifyOtpData !== null) {
      mainStore.setCurrentOrderStatus('receipt');
      mainStore.clearVerifyOtpData();
      goBackNavigation();
    }
  }, [mainStore.verifyOtpData]);

  return (
    <VStack>
      <HeaderNavigation
        title={t('Merchant Verification')}
        goback
        onPress={goBackNavigation}
      />
      <VStack
        style={{
          backgroundColor: Colors.backgroundMain,
          padding: CustomSpacing(16),
          height: '100%',
        }}>
        <Text style={[Fonts.textL]}>
          Input code that you receive from restaurant to verify this
          transaction.
        </Text>
        <Spacer height={dimensions.screenWidth * 0.25} />
        <OTPTextInput
          ref={otpInput}
          textInputStyle={{
            ...Fonts.headingS,
          }}
          handleTextChange={(code) => setOtpCode(code)}
          tintColor={Colors.primaryMain}
          offTintColor={Colors.neutral60}
          containerStyle={{
            width: dimensions.screenWidth * 0.8,
            alignSelf: 'center',
          }}
        />
        <Spacer height={dimensions.screenWidth * 0.5} />
        <Button
          onPress={submitOtp}
          disabled={otpCode.length < 4}
          style={{
            backgroundColor: Colors.primaryMain,
          }}>
          <Text style={{...Fonts.textMBold}}>Continue</Text>
        </Button>
      </VStack>
    </VStack>
  );
});

export default OtpVerification;

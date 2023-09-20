import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import t from '@lang';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {WithdrawSuccess} from '@assets';

import styles from './Withdraw.style';

const WithdrawSuccessPage = () => {
  const componentStyles = styles();
  const navigation = useNavigation();

  const goToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTabMenu'}],
    });
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Successfull')} />
      <VStack style={componentStyles.withdrawSuccessContainer}>
        <Image
          source={WithdrawSuccess}
          style={{
            width: CustomSpacing(240),
            height: CustomSpacing(165),
          }}
        />
        <Spacer height={CustomSpacing(20)} />
        <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
          {t('Your withdrawal process have been successfull !')}
        </Text>
        <Text style={{...Fonts.textS, textAlign: 'center'}}>
          {t('We already got your withdrawal request, we need maximum 24 hours to process it.')}
        </Text>
        <VStack style={componentStyles.withdrawBtn}>
          <Button onPress={goToMain}>
            <Text style={{...Fonts.textMBold}}>{t('Continue')}</Text>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};

export default WithdrawSuccessPage;

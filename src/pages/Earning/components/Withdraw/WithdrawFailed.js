import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import t from '@lang';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {WithdrawFailedIcon} from '@assets';

import styles from './Withdraw.style';

const WithdrawFailed = () => {
  const componentStyles = styles();
  const navigation = useNavigation();

  const goToEarning = () => {
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
          source={WithdrawFailedIcon}
          style={{
            width: CustomSpacing(240),
            height: CustomSpacing(165),
          }}
        />
        <Spacer height={CustomSpacing(20)} />
        <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
            {t('Your withdrawal process failed')}
        </Text>
        <Text style={{...Fonts.textS, textAlign: 'center'}}>
            {t('Something went wrong at our end. Don’t worry, it’s not you, it’s us. Sorry about that.')}
        </Text>
        <VStack style={componentStyles.withdrawBtn}>
          <Button onPress={goToEarning}>
            <Text style={{...Fonts.textMBold}}>{t('Try Again')}</Text>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};

export default WithdrawFailed;

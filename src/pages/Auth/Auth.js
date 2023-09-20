import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {dimensions} from '@config/Platform.config';
import {VStack, Button, Spacer} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import t from '@lang';

import {authBg} from '@assets';

import styles from './Auth.style';

const Auth = () => {
  const componentStyles = styles();
  const navigation = useNavigation();

  const gotoLogin = () => {
    navigation.navigate('Login', {
      previousScreen: 'Auth',
    });
  };

  const gotoRegister = () => {
    navigation.navigate('Register', {
      previousScreen: 'Auth',
    });
  };

  return (
    <View style={[Layout.flex, Layout.flexMid, componentStyles.containerAuth]}>
      <VStack>
        <Image source={authBg} style={componentStyles.authBg} />
      </VStack>
      <VStack top={CustomSpacing(132)} bottom={CustomSpacing(48)}>
        <Text style={{...Fonts.headingSBold}}>{t('Let’s you in')}</Text>
      </VStack>
      <VStack>
        <Button style={{width: dimensions.screenWidth * 0.9}} onPress={gotoLogin}>
          <Text style={{...Fonts.textMBold}}>{t('Sign In')}</Text>
        </Button>
        <Spacer height={CustomSpacing(16)} />
        <Button
          style={{
            width: dimensions.screenWidth * 0.9,
            backgroundColor: Colors.primarySurface,
          }}
          onPress={gotoRegister}>
          <Text style={{...Fonts.textMBold, color: Colors.primaryPressed}}>
            {t('Sign Up')}
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

export default Auth;

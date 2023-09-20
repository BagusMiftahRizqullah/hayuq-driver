import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dimensions} from '@config/Platform.config';
import t from '@lang';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {underDev} from '@assets';

const UnderDev = () => {
  return (
    <VStack
      style={[Layout.modalContainer, {backgroundColor: Colors.neutral10}]}>
      <Image
        source={underDev}
        style={{
          width: dimensions.screenWidth * 0.9,
          height: dimensions.screenWidth * 0.9,
          resizeMode: 'contain',
        }}
      />
      <VStack>
        <Text style={{...Fonts.headingSBold}}>{t('Under Development')}</Text>
      </VStack>
    </VStack>
  );
};

export default UnderDev;

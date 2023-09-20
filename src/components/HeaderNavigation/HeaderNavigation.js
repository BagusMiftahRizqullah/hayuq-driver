import React from 'react';
import {Text, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {HStack, VStack, Button, Spacer} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';

import styles from './HeaderNavigation.style';

const HeaderNavigation = ({title, goback, onPress, phonecall, onPressCall}) => {
  const componentStyles = styles();
  return (
    <>
      {Platform.OS === 'ios' && <Spacer height={CustomSpacing(20)} />}
      <HStack
        style={[
          componentStyles.containerHeader,
          {
            justifyContent: phonecall ? 'space-between' : 'flex-start',
          },
        ]}>
        <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.9 : 1}>
          <HStack>
            {goback && (
              <Icon
                name="chevron-left"
                size={CustomSpacing(15)}
                color={Colors.neutral70}
              />
            )}
            <Spacer width={CustomSpacing(10)} />
            <Text
              style={{
                ...Fonts.headingSBold,
                marginTop: CustomSpacing(2),
              }}>
              {title}
            </Text>
          </HStack>
        </TouchableOpacity>
        {phonecall && (
          <TouchableOpacity onPress={onPressCall}>
            <Icon
              name="phone"
              size={CustomSpacing(25)}
              color={Colors.neutral70}
            />
          </TouchableOpacity>
        )}
      </HStack>
    </>
  );
};

export default HeaderNavigation;

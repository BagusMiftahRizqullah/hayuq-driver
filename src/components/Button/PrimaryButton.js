import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Layout, Spacing, Colors} from '@styles';
import {HStack, Spacer} from '@components';
import BaseButton from './BaseButton';

const PrimaryButton = ({children, style, disabled, isSubmitting, ...props}) => {
  return (
    <BaseButton
      {...props}
      disabled={disabled || isSubmitting}
      style={StyleSheet.flatten([
        {
          backgroundColor: isSubmitting
            ? Colors.primaryPressed
            : Colors.primaryMain,
          height: Spacing[48],
          color: Colors.neutral10,
          borderRadius: Spacing[24],
          opacity: disabled ? 0.5 : 1,
        },
        Layout.flexCenterMid,
        style,
      ])}>
      {isSubmitting ? (
        <HStack>
          <ActivityIndicator color={Colors.neutral10} />
          <Spacer width={Spacing[8]} />
          {children}
        </HStack>
      ) : (
        children
      )}
    </BaseButton>
  );
};

export default PrimaryButton;

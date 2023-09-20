import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Layout, Spacing, Colors} from '@styles';
import {HStack, Spacer} from '@components';

const BaseButton = ({
  children,
  style,
  disabled,
  isSubmitting,
  activeOpacity,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={activeOpacity || 0.7}
      disabled={disabled || isSubmitting}
      style={StyleSheet.flatten([
        {
          backgroundColor: isSubmitting
            ? Colors.primaryPressed
            : Colors.primaryMain,
          height: Spacing[36],
          color: Colors.neutral10,
          borderRadius: Spacing[8],
          opacity: disabled ? 0.5 : 1,
          shadowColor: Colors.neutral80,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
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
    </TouchableOpacity>
  );
};

export default BaseButton;

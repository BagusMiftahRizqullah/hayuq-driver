import React from 'react';
import {TouchableOpacity} from 'react-native';

const BaseButton = ({activeOpacity, children, ...props}) => {
  return (
    <TouchableOpacity {...props} activeOpacity={activeOpacity || 0.7}>
      {children}
    </TouchableOpacity>
  );
};

export default BaseButton;

import React from 'react';
import {Text, View} from 'react-native';

import styles from './Onboarding.style';

const Onboarding = () => {
  const componentSytle = styles();
  return (
    <View>
      <Text style={componentSytle.coba}>Onboarding</Text>
    </View>
  );
};

export default Onboarding;

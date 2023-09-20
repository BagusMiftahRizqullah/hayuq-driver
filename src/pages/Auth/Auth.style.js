import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    containerAuth: {
      padding: CustomSpacing(dimensions.screenWidth * 0.2),
      alignItems: 'center',
      backgroundColor: Colors.neutral10,
    },
    authBg: {
      width: CustomSpacing(322),
      height: CustomSpacing(200),
    },
  });
};

export default styles;

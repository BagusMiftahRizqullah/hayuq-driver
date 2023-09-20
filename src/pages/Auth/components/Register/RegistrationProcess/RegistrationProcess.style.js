import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    topNav: {
      width: dimensions.screenWidth,
      paddingVertical: CustomSpacing(20),
      paddingHorizontal: CustomSpacing(16),
      backgroundColor: Colors.neutral10,
      elevation: 10,
    },
  });
};

export default styles;

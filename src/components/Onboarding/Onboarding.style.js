import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';

const styles = () => {
  return StyleSheet.create({
    coba: {
      textAlign: 'center',
      ...Fonts.textLBold,
      color: Colors.primaryMain,
    },
  });
};

export default styles;

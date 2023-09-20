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
    topNavArrow: {
      width: CustomSpacing(7),
      height: CustomSpacing(11),
      marginTop: CustomSpacing(-4),
      marginRight: CustomSpacing(10),
    },
    completedilustration: {
      width: CustomSpacing(160),
      height: CustomSpacing(114),
    },
    borderedCard: {
      marginBottom: CustomSpacing(16),
      marginHorizontal: CustomSpacing(16),
      backgroundColor: Colors.neutral10,
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral30,
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(16),
    },
    roundedPhoto: {
      width: CustomSpacing(40),
      height: CustomSpacing(40),
      borderRadius: CustomSpacing(100),
    },
    labeledText: {
      ...Fonts.textXs,
      color: Colors.dangerMain,
      backgroundColor: Colors.dangerBorder,
      paddingHorizontal: CustomSpacing(15),
      paddingVertical: CustomSpacing(4),
      borderRadius: CustomSpacing(4),
      marginTop: CustomSpacing(5),
      textAlign: 'center',
    },
  });
};

export default styles;

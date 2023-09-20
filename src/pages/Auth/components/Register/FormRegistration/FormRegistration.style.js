import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    containerFormRegistration: {
      padding: CustomSpacing(14),
    },
    topNav: {
      width: dimensions.screenWidth,
      paddingVertical: CustomSpacing(20),
      paddingHorizontal: CustomSpacing(16),
      backgroundColor: Colors.neutral10,
      elevation: 10,
    },
    borderedCard: {
      backgroundColor: Colors.neutral10,
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral40,
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(16),
    },
    cardDocument: {
      paddingLeft: CustomSpacing(12),
      paddingRight: CustomSpacing(19),
      paddingVertical: CustomSpacing(10),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral40,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
    },
    requirementHeader: {
      ...Fonts.textLBold,
      margin: CustomSpacing(16),
    },
    requirementWarningText: {
      ...Fonts.textSBold,
      margin: CustomSpacing(16),
    },
  });
};

export default styles;

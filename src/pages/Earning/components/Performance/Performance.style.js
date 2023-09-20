import {StyleSheet} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';

const styles = () =>
  StyleSheet.create({
    titlePerformance: {
      ...Fonts.textMBold,
      textAlign: 'center',
      marginVertical: CustomSpacing(15),
    },
    cardDetailPerformance: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Colors.neutral30,
      padding: CustomSpacing(15),
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
    },
    cardIncentive: {
      width: CustomSpacing(128),
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: Colors.neutral30,
      padding: CustomSpacing(4),
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
      paddingBottom: CustomSpacing(12),
    },
  });

export default styles;

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    withdrawContainer: {
      padding: CustomSpacing(14),
      flex: 1,
    },
    withdrawSuccessContainer: {
      paddingHorizontal: CustomSpacing(39),
      paddingVertical: CustomSpacing(80),
      flex: 1,
      alignItems: 'center',
    },
    cardBalance: {
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(14),
      marginBottom: CustomSpacing(20),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    cardAmount: {
      borderRadius: CustomSpacing(8),
      paddingHorizontal: CustomSpacing(14),
      paddingVertical: CustomSpacing(5),
      marginBottom: CustomSpacing(20),
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    cardBankAccount: {
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(14),
      marginBottom: CustomSpacing(20),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    withdrawBtn: {
      position: 'absolute',
      bottom: CustomSpacing(20),
      width: dimensions.screenWidth,
      padding: CustomSpacing(14),
    },
  });
};

export default styles;

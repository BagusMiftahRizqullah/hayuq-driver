import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    earningContainer: {
      padding: CustomSpacing(12),
      marginBottom: CustomSpacing(10),
    },
    cardEarningSummary: {
      // borderWidth: 0.5,
      // borderColor: Colors.neutral70,
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(10),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      marginHorizontal: CustomSpacing(4)
    },
    cardBalanceSummary: {
      // borderWidth: 0.5,
      // borderColor: Colors.neutral70,
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(10),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      marginHorizontal: CustomSpacing(4)
    },
    cardPerformance: {
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(10),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      alignItems: 'center',
      paddingVertical: CustomSpacing(17),
      marginHorizontal: CustomSpacing(4)
    },
  });
};

export default styles;

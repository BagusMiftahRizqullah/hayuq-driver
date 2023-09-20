import {StyleSheet} from 'react-native';
import {Layout, Colors, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () =>
  StyleSheet.create({
    finishOrderContainer: {
      ...Layout.flex,
      padding: CustomSpacing(16),
      backgroundColor: Colors.neutral20,
    },
    cardTotalIncome: {
      padding: CustomSpacing(14),
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
    },
    containerTextIncome: {
      justifyContent: 'space-between',
    },
    cardReview: {
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral40,
      backgroundColor: Colors.neutral10,
      paddingVertical: CustomSpacing(6),
      paddingHorizontal: CustomSpacing(16),
      borderRadius: CustomSpacing(8),
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    inputStyle: {
      width: '100%',
      height: CustomSpacing(44),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral30,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
      paddingVertical: CustomSpacing(10),
      paddingHorizontal: CustomSpacing(15),
      marginBottom: CustomSpacing(10),
    },
    containerBottomBtn: {
      position: 'absolute',
      padding: CustomSpacing(16),
      width: dimensions.screenWidth,
      bottom: 0,
    },
  });

export default styles;

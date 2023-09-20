import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    containerOrderHistory: {
      padding: CustomSpacing(10),
    },
    selectDropdown: {
      backgroundColor: Colors.neutral10,
      borderWidth: 0.5,
      borderColor: Colors.neutral50,
      width: CustomSpacing(100),
      height: CustomSpacing(32),
      borderRadius: CustomSpacing(8),
    },
    cardOrderContainer: {
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(10),
      paddingHorizontal: CustomSpacing(10),
      paddingVertical: CustomSpacing(14),
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
    filterLoading: {
      marginRight: CustomSpacing(17),
    }
  });
};

export default styles;

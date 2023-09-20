import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    profileContainer: {
      padding: CustomSpacing(12),
      marginBottom: CustomSpacing(65),
    },
    cardProfileName: {
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(5),
      padding: CustomSpacing(14),
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
    signoutBtn: {
      position: 'absolute',
      bottom: CustomSpacing(10),
      width: dimensions.screenWidth,
      padding: CustomSpacing(14),
      backgroundColor: Colors.neutral10,
    },
  });
};

export default styles;

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
    guideCard: {
      margin: CustomSpacing(16),
      borderRadius: CustomSpacing(8),
      paddingHorizontal: CustomSpacing(19),
      paddingVertical: CustomSpacing(6),
      backgroundColor: Colors.primarySurface,
    },
    inputStyle: {
      width: '100%',
      height: CustomSpacing(44),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral30,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
      padding: CustomSpacing(10),
      marginBottom: CustomSpacing(10),
    },
    cardDocument: {
      paddingLeft: CustomSpacing(12),
      paddingRight: CustomSpacing(19),
      paddingVertical: CustomSpacing(10),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral40,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
      marginBottom: CustomSpacing(8),
    },
    modalStyle: {
      backgroundColor: Colors.neutral10,
      borderTopStartRadius: CustomSpacing(8),
      borderTopEndRadius: CustomSpacing(8),
      padding: CustomSpacing(16),
      justifyContent: 'center',
      shadowColor: Colors.neutral80,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    imageContainer: {
      width: CustomSpacing(58),
      height: CustomSpacing(58),
      borderRadius: CustomSpacing(8),
    },
  });
};

export default styles;

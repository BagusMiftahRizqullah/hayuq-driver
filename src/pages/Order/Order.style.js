import {StyleSheet} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';

const styles = () => {
  return StyleSheet.create({
    orderTab: {
      width: '100%',
      textAlign: 'center',
      paddingVertical: CustomSpacing(16),
    },
    cardOrder: {
      borderWidth: CustomSpacing(0.8),
      borderColor: Colors.neutral30,
      borderRadius: CustomSpacing(8),
      paddingVertical: CustomSpacing(16),
      paddingHorizontal: CustomSpacing(18),
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
    labelTimeOreder: {
      ...Fonts.textMBold,
      color: Colors.neutral70,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral20,
      paddingHorizontal: CustomSpacing(12),
      paddingVertical: CustomSpacing(5),
    },

    // Ongoing Order // All Order
    avatarUser: {
      width: CustomSpacing(40),
      height: CustomSpacing(40),
      borderRadius: CustomSpacing(40),
      backgroundColor: Colors.secondaryMain,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgStaricon: {
      width: CustomSpacing(10),
      height: CustomSpacing(10),
      marginRight: CustomSpacing(5),
    },
  });
};

export default styles;

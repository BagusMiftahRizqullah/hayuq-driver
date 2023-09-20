import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    containerBankAccount: {
      padding: CustomSpacing(14),
    },
    cardBank: {
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(14),
      marginBottom: CustomSpacing(20),
      backgroundColor: Colors.secondaryMain,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    primaryCard: {
      paddingHorizontal: CustomSpacing(8),
      paddingVertical: CustomSpacing(6),
      backgroundColor: Colors.primaryMain,
      borderRadius: CustomSpacing(5),
    },
    addBankBtn: {
      position: 'absolute',
      bottom: CustomSpacing(20),
      width: dimensions.screenWidth,
      padding: CustomSpacing(14),
    },
    textInputContainer: {
      borderColor: Colors.neutral60,
      borderWidth: 1,
      borderRadius: CustomSpacing(8),
      height: CustomSpacing(44),
      ...Fonts.textM,
      paddingHorizontal: CustomSpacing(12),
      marginTop: CustomSpacing(10),
    },
    bankNameInput: {
      width: '100%',
      height: CustomSpacing(44),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral60,
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
      padding: CustomSpacing(10),
      marginTop: CustomSpacing(10),
    },
    imageContainer: {
      width: CustomSpacing(58),
      height: CustomSpacing(58),
      borderRadius: CustomSpacing(8),
    },
    cardDocument: {
      paddingLeft: CustomSpacing(12),
      paddingRight: CustomSpacing(19),
      paddingVertical: CustomSpacing(10),
      borderWidth: CustomSpacing(1),
      borderColor: Colors.neutral60,
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
  });
};

export default styles;

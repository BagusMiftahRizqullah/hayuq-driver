import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
const styles = () => {
  return StyleSheet.create({
    loginContainer: {
      padding: CustomSpacing(16),
      backgroundColor: Colors.neutral10,
    },
    textInputContainer: {
      borderColor: Colors.neutral60,
      borderWidth: 1,
      borderRadius: CustomSpacing(8),
      height: CustomSpacing(44),
      ...Fonts.textM,
      paddingHorizontal: CustomSpacing(12),
      marginTop: CustomSpacing(24),
    },
    otpContainer: {
      width: '80%',
    },
    modalStyle: {
      backgroundColor: Colors.neutral10,
      marginHorizontal: CustomSpacing(14),
      borderRadius: CustomSpacing(8),
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
    missCallOtpContainer: {
      borderBottomWidth: 1,
      width: CustomSpacing(60),
      ...Fonts.headingS,
      marginTop: CustomSpacing(5),
    },
    errorMessage: {
      color: Colors.dangerMain,
      marginVertical: CustomSpacing(5),
      marginHorizontal: CustomSpacing(3),
      fontSize: CustomSpacing(12)
    }
  });
};

export default styles;

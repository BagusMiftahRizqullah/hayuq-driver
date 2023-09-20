import {StyleSheet} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';

const styles = () =>
  StyleSheet.create({
    containerReferral: {
      backgroundColor: Colors.neutral20,
      flex: 1,
    },
    subTitleReferFriend: {
      ...Fonts.textS,
      textAlign: 'justify',
      lineHeight: CustomSpacing(23),
    },
    rounderCircleStep: {
      width: CustomSpacing(44),
      height: CustomSpacing(44),
      backgroundColor: Colors.neutral10,
      borderRadius: CustomSpacing(100),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 3,
    },
    dividerCircleStep: {
      borderWidth: 0.5,
      borderColor: Colors.neutral50,
      width: 0.5,
      height: CustomSpacing(30),
    },
    referralCodeInput: {
      borderWidth: 0.8,
      height: CustomSpacing(38),
      borderColor: Colors.neutral40,
      borderRadius: CustomSpacing(8),
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 1,
      justifyContent: 'space-between',
    },
    btnCopyCode: {
      width: CustomSpacing(70),
      height: CustomSpacing(37),
      borderWidth: 1,
      borderColor: Colors.secondaryMain,
      backgroundColor: Colors.secondaryMain,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
    },
    btnReferFriend: {
      paddingHorizontal: CustomSpacing(25),
      marginTop: CustomSpacing(15),
      flexDirection: 'row',
    },
  });

export default styles;

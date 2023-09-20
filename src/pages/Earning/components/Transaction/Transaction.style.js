import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    containerTransaction: {
      padding: CustomSpacing(14),
    },
    tabBar: {
      borderBottomWidth: 2,
      padding: CustomSpacing(14),
      alignItems: 'center',
      justifyContent: 'center',
      width: dimensions.screenWidth * 0.5,
    },
    cardTopUp: {
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
    },
    containerText: {
      flex: 1, 
      justifyContent: 'space-between',
      paddingVertical: CustomSpacing(11),
      borderBottom: 1,
      borderBottomWidth: 0.4,
      borderBottomColor: Colors.neutral60,
    },
    iconStyle: {
      width: CustomSpacing(40),
      height: CustomSpacing(40),
      marginRight: CustomSpacing(13),
    },
    textAmount: {
      marginBottom: CustomSpacing(5),
      color: Colors.dangerMain,
      ...Fonts.textSBold
    },
    categoryFilter: {
      marginTop: CustomSpacing(25),
      marginBottom: CustomSpacing(10),
      marginRight: CustomSpacing(20),
      backgroundColor: Colors.neutral10,
      borderWidth: 1,
      borderColor: Colors.neutral50,
      width: CustomSpacing(115),
      height: CustomSpacing(32),
      borderRadius: CustomSpacing(15),
    },
    arrowCategory: {
      width: CustomSpacing(10), 
      height: CustomSpacing(6),
      marginRight: CustomSpacing(6)
    },
    dropdownPannel: {
      backgroundColor: Colors.neutral10,
      borderRadius: CustomSpacing(8)
    }
  });
};

export default styles;

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    // topUpContainer: {
    //   padding: CustomSpacing(14),
    // },
    // cardTopUp: {
    //   borderRadius: CustomSpacing(8),
    //   padding: CustomSpacing(14),
    //   marginBottom: CustomSpacing(20),
    //   backgroundColor: Colors.neutral10,
    //   shadowColor: Colors.neutral70,
    //   shadowOffset: {
    //     width: 0,
    //     height: 3,
    //   },
    //   shadowOpacity: 0.27,
    //   shadowRadius: 4.65,
    //   elevation: 6,
    // },
    // cardList: {
    //   borderRadius: CustomSpacing(8),
    //   padding: CustomSpacing(14),
    //   marginVertical: CustomSpacing(5),
    //   backgroundColor: Colors.neutral10,
    //   shadowColor: Colors.neutral70,
    //   shadowOffset: {
    //     width: 0,
    //     height: 3,
    //   },
    //   shadowOpacity: 0.27,
    //   shadowRadius: 4.65,
    //   elevation: 6,
    // },
    // topupBtn: {
    //   position: 'absolute',
    //   bottom: CustomSpacing(20),
    //   width: dimensions.screenWidth,
    //   padding: CustomSpacing(14),
    // },
    container: {
      marginVertical: CustomSpacing(25),
      marginHorizontal: CustomSpacing(20)
    },
    containerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textEnterAmount: {
      ...Fonts.textS,
      color: Colors.neutral60,
      marginVertical: CustomSpacing(20)
    },
    inputAmountTopUp: {
      borderBottomColor: Colors.neutral40,
      borderBottomWidth: 0.8,
      ...Fonts.headingSBold,
      paddingVertical: CustomSpacing(2),
      marginTop: CustomSpacing(5)
    },
    containerCardAmountTopUp: {
      marginVertical: CustomSpacing(10),
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    cardAmountTopUp: {
      width: dimensions.screenWidth / 3 - 19,
      paddingVertical: CustomSpacing(8),
      marginBottom: CustomSpacing(14),
      border: CustomSpacing(1),
      borderColor: Colors.neutral40,
      borderWidth: 0.8,
      borderRadius: CustomSpacing(4),
      ...Fonts.captionMSemiBold,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      elevation: 0.4
    },
    btnConfirmTopUp: {
      marginVertical: CustomSpacing(8),
    }
  });
};

export default styles;

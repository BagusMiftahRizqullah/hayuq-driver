import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing, Layout} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () =>
  StyleSheet.create({
    containerCallPage: {
      ...Layout.flex,
      ...Layout.flexCenterMid,
      justifyContent: 'center',
      backgroundColor: Colors.neutral10,
      flexDirection: 'column',
      paddingVertical: CustomSpacing(50),
    },
    contanerContent: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textCallStatus: {
      ...Fonts.headingS,
      color: Colors.neutral90,
    },
    textUsername: {
      ...Fonts.headingMBold,
      color: Colors.neutral90,
    },
    imageCall: {
      width: CustomSpacing(150),
      height: CustomSpacing(150),
      borderRadius: CustomSpacing(100),
      marginBottom: CustomSpacing(10),
    },
    bottomContainerNav: {
      justifyContent: 'space-between',
      width: dimensions.screenWidth,
      paddingHorizontal: CustomSpacing(35),
    },
  });

export default styles;

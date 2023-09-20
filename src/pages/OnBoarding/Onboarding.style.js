import {StyleSheet} from 'react-native';
import {dimensions} from '@config/Platform.config';
import {Colors, Fonts, CustomSpacing} from '@styles';

const styles = () => {
  return StyleSheet.create({
    text: {
      ...Fonts.headingMBold,
    },
    paginationDot: {
      width: CustomSpacing(15),
      height: CustomSpacing(5),
      borderRadius: CustomSpacing(5),
      marginHorizontal: CustomSpacing(-2),
      backgroundColor: Colors.secondaryMain,
    },
    paginationLayer: {
      width: dimensions.screenWidth,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      paddingTop: CustomSpacing(75),
    },
  });
};

export default styles;

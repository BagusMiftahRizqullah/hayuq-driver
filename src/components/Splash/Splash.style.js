import {StyleSheet} from 'react-native';
import {dimensions} from '@config/Platform.config';
import {CustomSpacing, Layout, Colors, Fonts, Rounded} from '@styles';

const styles = () => {
  return StyleSheet.create({
    renderSubtitle: {
      height: CustomSpacing(60),
      justifyContent: 'center',
      alignItems: 'center',
    },
    callContainer: {
      position: 'absolute',
      padding: CustomSpacing(16),
      justifyContent: 'center',
      alignItems: 'center',
      width: dimensions.screenWidth,
      height: '100%',
    },
    imgAvatar: {
      width: CustomSpacing(160),
      height: CustomSpacing(160),
      borderRadius: CustomSpacing(80),
    },
    actionContainer: {
      justifyContent: 'space-between',
      width: dimensions.screenWidth,
      paddingHorizontal: CustomSpacing(20),
    },
    imgActionIcon: {
      width: CustomSpacing(74),
      height: CustomSpacing(74),
    },
  });
};

export default styles;


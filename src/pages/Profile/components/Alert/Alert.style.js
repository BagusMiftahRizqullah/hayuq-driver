import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    withdrawContainer: {
        padding: CustomSpacing(14),
        flex: 1,
    },
    successContainer: {
        paddingHorizontal: CustomSpacing(39),
        paddingVertical: CustomSpacing(80),
        flex: 1,
        alignItems: 'center',
    },
    alertBtn: {
        position: 'absolute',
        bottom: CustomSpacing(20),
        width: dimensions.screenWidth,
        padding: CustomSpacing(14),
    },
  });
};

export default styles;

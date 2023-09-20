import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    chatContainer: {
      padding: CustomSpacing(14),
    },
    cardChat: {
      padding: CustomSpacing(14),
      borderRadius: CustomSpacing(8),
      marginVertical: CustomSpacing(10),
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
  });
};

export default styles;

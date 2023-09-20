import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    chatContainer: {
      backgroundColor: Colors.mainBackground,
      flex: 1,
    },
    cardNotesOrder: {
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
      marginHorizontal: CustomSpacing(4)
    },

    rightChatBuble: {
      backgroundColor: Colors.primaryMain,
      padding: CustomSpacing(10),
      marginLeft: dimensions.screenWidth * 0.3,
      marginTop: CustomSpacing(5),
      marginRight: dimensions.screenWidth * 0.03,
      maxWidth: dimensions.screenWidth * 0.7,
      alignSelf: 'flex-end',
      borderRadius: CustomSpacing(15),
    },
    dateChatRight: {
      ...Fonts.textXs,
      alignSelf: 'flex-end',
      marginRight: dimensions.screenWidth * 0.06,
      marginVertical: CustomSpacing(5)
    },
    rightArrow: {
      position: 'absolute',
      backgroundColor: Colors.primaryMain,
      width: CustomSpacing(20),
      height: CustomSpacing(15),
      bottom: CustomSpacing(0),
      borderBottomLeftRadius: CustomSpacing(25),
      right: CustomSpacing(-10),
    },
    rightArrowOverlap: {
      position: 'absolute',
      backgroundColor: Colors.neutral10,
      width: CustomSpacing(20),
      height: CustomSpacing(35),
      bottom: CustomSpacing(-6),
      borderBottomLeftRadius: CustomSpacing(18),
      right: CustomSpacing(-20),
    },

    leftChatBuble: {
      backgroundColor: Colors.neutral30,
      padding: CustomSpacing(10),
      marginTop: CustomSpacing(5),
      marginLeft: dimensions.screenWidth * 0.03,
      marginRight: dimensions.screenWidth * 0.3,
      maxWidth: dimensions.screenWidth * 0.7,
      alignSelf: 'flex-start',
      borderRadius: CustomSpacing(15),
    },

    dateChatLeft: {
      ...Fonts.textXs,
      marginLeft: dimensions.screenWidth * 0.06,
      marginVertical: CustomSpacing(5)
    },

    leftArrow: {
      position: 'absolute',
      backgroundColor: Colors.neutral30,
      width: CustomSpacing(20),
      height: CustomSpacing(15),
      bottom: CustomSpacing(0),
      borderBottomRightRadius: CustomSpacing(25),
      left: CustomSpacing(-10),
    },

    leftArrowOverlap: {
      position: 'absolute',
      backgroundColor: Colors.neutral10,
      width: CustomSpacing(20),
      height: CustomSpacing(35),
      bottom: CustomSpacing(-6),
      borderBottomRightRadius: CustomSpacing(18),
      left: CustomSpacing(-20),
    },
    // --- Input ---
    containerInput: {
      position: 'absolute',
      width: '100%',
      paddingBottom: CustomSpacing(5),
    },
    inputBubble: {
      backgroundColor: Colors.backgroundSurface,
      paddingHorizontal: CustomSpacing(14),
      borderRadius: 8,
      justifyContent: 'space-between',
    },
    imgAddMedia: {
      width: CustomSpacing(24),
      height: CustomSpacing(24),
      resizeMode: 'contain',
    },
    input: {
      ...Fonts.labelSemiBold,
      color: Colors.neutral70,
      height: CustomSpacing(55),
    },
    imgMic: {
      width: CustomSpacing(20),
      height: CustomSpacing(20),
      resizeMode: 'contain',
    },
    containerChat: {
      backgroundColor: Colors.neutral30,
      flex: 1,
    },
    containerChatContent: {
      borderRadius: 8,
      minWidth: CustomSpacing(50),
      maxWidth: dimensions.screenWidth * 0.7,
      padding: CustomSpacing(8),
      marginVertical: CustomSpacing(4),
    },
  });
};

export default styles;

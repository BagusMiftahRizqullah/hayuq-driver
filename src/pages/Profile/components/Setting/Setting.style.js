import {StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    settingContainer: {
      padding: CustomSpacing(14),
    },
    cardVehicleInfoText: {
      ...Fonts.textSBold,
      marginBottom: CustomSpacing(3),
    },
    cardSetting: {
      borderRadius: CustomSpacing(8),
      padding: CustomSpacing(14),
      marginBottom: CustomSpacing(20),
      backgroundColor: Colors.neutral10,
      shadowColor: Colors.neutral70,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      marginHorizontal: CustomSpacing(4),
      borderWidth: 0.8,
      borderColor: Colors.neutral30
    },
    textInputContainer: {
      borderColor: Colors.neutral60,
      borderWidth: 1,
      borderRadius: CustomSpacing(8),
      height: CustomSpacing(44),
      ...Fonts.textM,
      paddingHorizontal: CustomSpacing(12),
      marginTop: CustomSpacing(10),
    },
    textInputContainerDropDown: {
      borderColor: Colors.neutral60,
      borderWidth: 1,
      borderRadius: CustomSpacing(8),
      height: CustomSpacing(44),
      ...Fonts.textM,
      paddingHorizontal: CustomSpacing(12),
      marginTop: CustomSpacing(10),
      backgroundColor: Colors.neutral10,
      width: '100%',
    },
    saveBtn: {
      bottom: CustomSpacing(20),
      width: dimensions.screenWidth,
      padding: CustomSpacing(16),
    },
    imageContainer: {
      width: CustomSpacing(58),
      height: CustomSpacing(58),
      borderRadius: CustomSpacing(8),
    },
    modalStyle: {
      backgroundColor: Colors.neutral10,
      borderTopStartRadius: CustomSpacing(8),
      borderTopEndRadius: CustomSpacing(8),
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
    arrowCategory: {
      width: CustomSpacing(10), 
      height: CustomSpacing(6),
      marginRight: CustomSpacing(6)
    },
    categoryFilter: {
      marginTop: CustomSpacing(15),
      marginBottom: CustomSpacing(10),
      backgroundColor: Colors.neutral10,
      borderWidth: 1,
      borderColor: Colors.neutral50,
      borderRadius: CustomSpacing(5),
      width: dimensions.screenWidth * 0.9,
      height: CustomSpacing(45),
    },
  });
};

export default styles;

import {StyleSheet, Platform} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    driverMarker: {
      width: CustomSpacing(30),
      height: CustomSpacing(30),
      transform: [
        {
          rotate: '90deg',
        },
      ],
    },
    merchantMarker: {
      backgroundColor: Colors.primaryMain,
      width: CustomSpacing(35),
      height: CustomSpacing(35),
      borderRadius: CustomSpacing(35),
      justifyContent: 'center',
      alignItems: 'center',
    },
    userMarker: {
      backgroundColor: Colors.secondaryMain,
      width: CustomSpacing(35),
      height: CustomSpacing(35),
      borderRadius: CustomSpacing(35),
      justifyContent: 'center',
      alignItems: 'center',
    },
    recenterBtn: {
      position: 'absolute',
      top:
        Platform.OS === 'ios'
          ? dimensions.screenHeight * 0.2
          : dimensions.screenWidth * 0.3,
      right: CustomSpacing(16),
    },
    emergencyBtn: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? CustomSpacing(40) : CustomSpacing(10),
      right: dimensions.screenWidth * 0.33,
    },
    orderDetailContainer: {
      padding: CustomSpacing(16),
    },
    priceCard: {
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
      justifyContent: 'space-between',
    },
    counterOrder: {
      borderRadius: CustomSpacing(50),
      width: CustomSpacing(30),
      height: CustomSpacing(30),
      backgroundColor: Colors.neutral10,
      borderWidth: 2,
      borderColor: Colors.dangerMain,
      justifyContent: 'center',
      alignItems: 'center',
    },
    decisionBtn: {
      position: 'absolute',
      bottom: CustomSpacing(20),
      width: dimensions.screenWidth,
      padding: CustomSpacing(14),
      justifyContent: 'space-between',
      backgroundColor: Colors.neutral10,
    },

    communicationIcon: {
      width: CustomSpacing(40),
      height: CustomSpacing(40),
      borderRadius: CustomSpacing(50),
      backgroundColor: Colors.neutral10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: Colors.neutral30,
      borderWidth: 2,
    },
  });
};

export default styles;

import {StyleSheet, Platform} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';
import {dimensions} from '@config/Platform.config';

const styles = () => {
  return StyleSheet.create({
    markerStyle: {
      width: CustomSpacing(30),
      height: CustomSpacing(30),
      transform: [
        {
          rotate: '90deg',
        },
      ],
    },
    // markerStyle: {
    //   width: CustomSpacing(20),
    //   height: CustomSpacing(20),
    //   backgroundColor: Colors.secondaryMain,
    //   borderRadius: CustomSpacing(25),
    //   borderWidth: 2,
    //   borderColor: Colors.neutral10,
    // },
    recenterBtn: {
      position: 'absolute',
      bottom: CustomSpacing(100),
      right: CustomSpacing(10),
      backgroundColor: Colors.neutral90,
    },
    driverbtn: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? CustomSpacing(35) : CustomSpacing(20),
      left: CustomSpacing(20),
    },
    profitbtn: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? CustomSpacing(35) : CustomSpacing(20),
      right: CustomSpacing(20),
    },

    driverImg: {
      width: CustomSpacing(50),
      height: CustomSpacing(50),
      borderRadius: CustomSpacing(50),
      borderWidth: 4,
      borderColor: Colors.neutral10,
    },
    reviewDriver: {
      width: CustomSpacing(25),
      height: CustomSpacing(25),
      backgroundColor: Colors.neutral10,
      borderRadius: CustomSpacing(25),
      borderWidth: 2,
      borderColor: Colors.neutral10,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: CustomSpacing(-10),
      right: CustomSpacing(12),
    },
    sliderContainer: {
      position: 'absolute',
      bottom: CustomSpacing(20),
      width: dimensions.screenWidth,
      height: CustomSpacing(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerSlider: {
      padding: CustomSpacing(9),
      width: CustomSpacing(252),
      height: CustomSpacing(60),
      borderRadius: CustomSpacing(100),
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default styles;

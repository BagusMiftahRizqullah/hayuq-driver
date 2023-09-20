import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';
import {Colors, Fonts, Spacing, CustomSpacing} from '@styles';

const ModalBottom = ({onClose, children, isVisible, type = 'center'}) => {
  return (
    <Modal
      swipeDirection="down"
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      backdropTransitionOutTiming={0}
      supportedOrientations={['portrait']}
      style={
        type === 'center'
          ? styles.modalContainerCenter
          : styles.modalContainerBottom
      }>
      <View
        style={StyleSheet.flatten([
          {
            borderTopStartRadius: Spacing[24],
            borderTopRightRadius: Spacing[24],
            borderBottomLeftRadius: type === 'center' ? Spacing[24] : 0,
            borderBottomRightRadius: type === 'center' ? Spacing[24] : 0,
          },
          styles.container,
        ])}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalBottom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral10,
  },
  modalContainerBottom: {
    margin: 0,
    justifyContent: 'flex-end',
    borderTopStartRadius: Spacing[16],
    borderTopEndRadius: Spacing[16],
  },
  modalContainerCenter: {
    margin: CustomSpacing(20),
    borderRadius: Spacing[16],
  },
});

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import t from '@lang';

import {useStores} from '@store/root.store';
import {portSocketChat} from '@config';
import {
  HStack,
  VStack,
  Spacer,
  HeaderNavigation,
} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import styles from './Chat.style';

const Chat = () => {
  const navigation = useNavigation();
  const componentStyles = styles();
  const dispatch = useDispatch();
    const {mainStore} = useStores();

  const goToChatDetail = async () => {
    await portSocketChat.emit('find-rooms', {
      code: mainStore.currentOrderData?.transactions?.data?.transactions.code,
      drivers_id: mainStore.currentOrderData?.drivers_id,
    });

    await portSocketChat.on('find-rooms', (data) => {
      if (data.data) {
        dispatch({
          type: CHAT_CONSTANT.SET_NOTE,
          payload: data.data?.rooms?.notes,
        });
      }
    });

    navigation.navigate('ChatDetail');
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Chat')} />
      <VStack style={componentStyles.chatContainer}>
        <TouchableOpacity onPress={goToChatDetail} activeOpacity={0.9}>
          <VStack style={componentStyles.cardChat}>
            <HStack style={[Layout.flexFullBetween]}>
              <HStack>
                <Icon
                  name="comments"
                  size={CustomSpacing(20)}
                  color={Colors.neutral70}
                />
                <VStack left={CustomSpacing(10)}>
                  <Text style={{...Fonts.textLBold}}>Order Chat</Text>
                  <Spacer height={CustomSpacing(5)} />
                  <Text style={{...Fonts.textXs}}>Chat from last order </Text>
                </VStack>
              </HStack>
              <Icon
                name="chevron-right"
                size={CustomSpacing(10)}
                color={Colors.neutral70}
              />
            </HStack>
          </VStack>
        </TouchableOpacity>
        {/* <VStack style={componentStyles.cardChat}>
          <HStack style={[Layout.flexFullBetween]}>
            <HStack>
              <Icon
                name="commenting"
                size={CustomSpacing(20)}
                color={Colors.neutral70}
              />
              <VStack left={CustomSpacing(10)}>
                <Text style={{...Fonts.textLBold}}>My Report</Text>
              </VStack>
            </HStack>
            <Icon
              name="chevron-right"
              size={CustomSpacing(10)}
              color={Colors.neutral70}
            />
          </HStack>
        </VStack> */}
      </VStack>
    </View>
  );
};

export default Chat;

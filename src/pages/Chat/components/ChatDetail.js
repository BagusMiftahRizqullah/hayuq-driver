import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {VStack, HStack, Spacer, HeaderNavigation} from '@components';
import {dimensions} from '@config/Platform.config';
import FastImage from 'react-native-fast-image';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {EmptyChat, SendIcon} from '@assets';
import styles from './ChatDetail.style';
import {CHAT_CONSTANT} from '../Chat.constant';
import {portSocketChat} from '@config';
import {useStores} from '@store/root.store';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';

const ChatDetail = observer((props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {mainStore, chatStore} = useStores();
  const componentStyles = styles();
  const {chat_notes} = useSelector((state) => state.chatReducer);
  const scrollRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [myMessage, setMyMessage] = useState('');

  const isFood = mainStore.currentOrderData.type === 1;

  const codeTrx = isFood
    ? mainStore.currentOrderData?.transactions?.data?.transactions.code
    : mainStore.currentOrderData?.transactions?.code;
  const driverId = mainStore.currentOrderData?.drivers_id;

  console.log(toJS(mainStore.currentOrderData));

  useEffect(async () => {
    // reconect chat if close app
    portSocketChat.emit('find-rooms', {
      code: codeTrx,
      drivers_id: driverId,
    });

    await portSocketChat.on('find-rooms', (data) => {
      // add list chat
      chatStore.setDataChat(data.data.list);
      // add data note to store
      dispatch({
        type: CHAT_CONSTANT.SET_NOTE,
        payload: data.data?.rooms?.notes,
      });
    });

    await portSocketChat.on('received', async (data) => {
      // clone previous chat
      const prevChat = [...chatStore.dataChat];
      // filter same chat
      const exist = prevChat.filter((list) => list._id === data.data._id);

      if (!exist.length) {
        prevChat.push({text: data.data.text, _id: Math.random() * 1});
        await chatStore.addNewChat(prevChat);
      }
    });
  }, []);

  const SendMessage = async () => {
    // send message
    await portSocketChat.emit('messages', {
      drivers_id: driverId,
      code: codeTrx,
      text: myMessage,
      file: null,
    });

    // clone prev message
    const prevChat = [...chatStore.dataChat];
    prevChat.push({
      text: myMessage,
      _id: Math.random() * 1,
      drivers_id: driverId,
      createdAt: moment(),
    });

    // update dataChat
    await chatStore.addNewChat(prevChat);
    // clear myMessage
    setMyMessage('');
    // close keyboard after send chat
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        if (scrollRef && scrollRef.current) {
          scrollRef.current.scrollToEnd({animated: true});
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleCallUser = () => {
    // dispatch({type: MAIN_CONSTANT.SET_CALL_STATUS, payload: true});
    navigation.goBack();
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={'Chat'} goback onPress={handleCallUser} />
      {chat_notes?.length > 0 ||
        (!isFood && (
          <VStack style={componentStyles.chatContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                onContentSizeChange={() =>
                  scrollRef.current.scrollToEnd({animated: true})
                }
                style={{
                  padding: CustomSpacing(16),
                }}
              >
                {chat_notes?.length > 0 && (
                  <VStack style={componentStyles.cardNotesOrder}>
                    <Text style={{...Fonts.textL, color: Colors.neutral70}}>
                      Notes from user:
                    </Text>
                    <Spacer height={CustomSpacing(10)} />
                    {chat_notes?.map((item, index) => (
                      <VStack key={index}>
                        <Text style={{...Fonts.textMBold}}>
                          {item.name}:{' '}
                          <Text style={{...Fonts.textM}}>{item.notes}</Text>{' '}
                        </Text>
                        <Spacer height={CustomSpacing(5)} />
                      </VStack>
                    ))}
                  </VStack>
                )}

                {chatStore.dataChat.length > 0 &&
                  chatStore.dataChat?.map((item, index) =>
                    item?.drivers_id ? (
                      <VStack>
                        <View
                          style={componentStyles.rightChatBuble}
                          key={`${item.type}-${index}`}
                        >
                          <Text style={{...Fonts.textM}}>{item.text}</Text>
                          <View style={componentStyles.rightArrow}></View>
                          <View
                            style={componentStyles.rightArrowOverlap}
                          ></View>
                        </View>
                        <Text style={componentStyles.dateChatRight}>
                          {moment(item.createdAt).format('hh:mm')}
                        </Text>
                      </VStack>
                    ) : (
                      <VStack>
                        <View
                          style={componentStyles.leftChatBuble}
                          key={`${item.type}-${index}`}
                        >
                          <Text style={{...Fonts.textM}}>{item.text}</Text>
                          <View style={componentStyles.leftArrow}></View>
                          <View style={componentStyles.leftArrowOverlap}></View>
                        </View>
                        <Text style={componentStyles.dateChatLeft}>
                          {moment(item.createdAt).format('hh:mm')}
                        </Text>
                      </VStack>
                    ),
                  )}
                <Spacer
                  height={
                    isKeyboardVisible ? CustomSpacing(190) : CustomSpacing(110)
                  }
                />
              </ScrollView>
              <VStack
                style={[
                  componentStyles.containerInput,
                  {
                    // bottom: CustomSpacing(225),
                    backgroundColor: '#ffffff',
                    bottom: isKeyboardVisible
                      ? CustomSpacing(100)
                      : CustomSpacing(10) * -1,
                  },
                ]}
              >
                <HStack style={componentStyles.inputBubble}>
                  <HStack>
                    {/* <FastImage
                    source={AddMediaIcon}
                    style={componentStyles.imgAddMedia}
                  /> */}
                    <Spacer width={CustomSpacing(8)} />
                    <VStack
                      style={{
                        width: CustomSpacing(232),
                      }}
                    >
                      <TextInput
                        multiline
                        value={myMessage}
                        onChangeText={(text) => setMyMessage(text)}
                        placeholder={'Type your message'}
                        style={[
                          componentStyles.input,
                          {
                            height: CustomSpacing(
                              myMessage?.length > 30 ? 100 : 55,
                            ),
                          },
                        ]}
                        underlineColorAndroid="transparent"
                      />
                    </VStack>
                  </HStack>
                  <TouchableOpacity onPress={() => SendMessage()}>
                    <FastImage
                      source={SendIcon}
                      style={componentStyles.imgMic}
                    />
                  </TouchableOpacity>
                </HStack>
                <Spacer bottomSafeAreaHeight />
              </VStack>
            </KeyboardAvoidingView>
          </VStack>
        ))}

      {isFood && chat_notes.length < 0 && (
        <VStack
          style={[
            Layout.flexCenterMid,
            {
              height: dimensions.screenWidth * 1.2,
              marginHorizontal: CustomSpacing(15),
            },
          ]}
        >
          <Image
            style={{
              width: CustomSpacing(300),
              height: CustomSpacing(200),
            }}
            source={EmptyChat}
          />
          <Text style={[Fonts.headingMBold]}>No Conversation</Text>
          <Text
            style={[
              Fonts.textM,
              {color: Colors.neutral70, textAlign: 'center'},
            ]}
          >
            You didnt made any conversation, yet! Start your order with Hayuq to
            activate this chat.
          </Text>
        </VStack>
      )}
    </View>
  );
});

export default ChatDetail;

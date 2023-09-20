import {useState} from 'react';
import {Text, Image, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {VStack, HStack, Button} from '@components';
import {dimensions} from '@config/Platform.config';
import {useNavigation} from '@react-navigation/native';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {ArrowBlackIcon, RegisterCompletedlustration} from '@assets';
import ViewDocument from './components/ViewDocuments';

import {AUTH_CONSTANT} from '../../../Auth.constant';
import styles from './SuccessRegisterStyle';

const SuccessRegistration = () => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [viewDocument, setViewDocument] = useState(false);

  const handleLogout = () => {
    dispatch({type: AUTH_CONSTANT.LOGOUT});
    dispatch({type: AUTH_CONSTANT.CLEAR_AUTH_RESPONSE});
    setTimeout(() => { 
      navigation.navigate('AuthStack', {screen: 'Login'})
    }, 600)
  };

  return (
    <VStack style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      {!viewDocument ? (
        <VStack style={Layout.flex}>
          <Pressable onPress={() => navigation.navigate('FormRegistration')}>
            <HStack style={componentStyles.topNav}>
              <Image
                source={ArrowBlackIcon}
                style={componentStyles.topNavArrow}
              />
              <Text style={[{color: Colors.neutral90, ...Fonts.headingXsBold}]}>
                Successfull
              </Text>
            </HStack>
          </Pressable>
          <VStack
            style={[Layout.flexCenterMid, {marginTop: CustomSpacing(80)}]}>
            <Image
              source={RegisterCompletedlustration}
              style={componentStyles.completedilustration}
            />
            <Text
              style={[
                Fonts.textLBold,
                {
                  width: CustomSpacing(300),
                  textAlign: 'center',
                  marginTop: CustomSpacing(30),
                  lineHeight: CustomSpacing(27),
                },
              ]}>
              Your document have been successfully uploaded!
            </Text>
            <Text
              style={[
                Fonts.textM,
                {
                  textAlign: 'center',
                  marginTop: CustomSpacing(12),
                  lineHeight: CustomSpacing(20),
                  marginHorizontal: CustomSpacing(16),
                },
              ]}>
              Your request is being reviewd and you should receive an email
              reply within 24 hours
            </Text>
          </VStack>
          <VStack
            style={{
              position: 'absolute',
              bottom: 20,
              width: dimensions.screenWidth,
            }}>
            <Button
              style={{marginHorizontal: CustomSpacing(16)}}
              onPress={() => setViewDocument(true)}>
              <Text style={Fonts.textLBold}>View Document</Text>
            </Button>
            <Button
              style={{
                marginTop: CustomSpacing(12),
                backgroundColor: Colors.primarySurface,
                marginHorizontal: CustomSpacing(16),
              }}
              onPress={handleLogout}>
              <Text style={{...Fonts.textLBold, color: Colors.primaryPressed}}>
                Go to Login page
              </Text>
            </Button>
          </VStack>
        </VStack>
      ) : (
        <ViewDocument setViewDocument={setViewDocument} />
      )}
    </VStack>
  );
};

export default SuccessRegistration;

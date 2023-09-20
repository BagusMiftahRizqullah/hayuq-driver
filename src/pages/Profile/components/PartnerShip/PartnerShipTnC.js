import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import * as Animatable from 'react-native-animatable';

import {useStores} from '@store/root.store';
import {VStack, HeaderNavigation} from '@components';
import {Layout, Colors} from '@styles';

import styles from './PartnerShip.style';

const PartnerShipTnC = () => {
  const {profileStore} = useStores();
  const componentStyles = styles();
  const navigation = useNavigation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileStore.webViewParam === 'help') {
      setUrl('https://hayuq.com/help-centre');
    }
    if (profileStore.webViewParam === 'tnc') {
      setUrl('https://hayuq.com/privacy-policy?type=driver&status=tnc');
    }
  }, []);

  const parseTitle = () => {
    let textTitle;
    switch (profileStore.webViewParam) {
      case 'help':
        textTitle = 'Help Centre';
        break;
      case 'tnc':
        textTitle = 'Terms & Conditions';
        break;
      default:
        textTitle = 'Help Centre';
        break;
    }
    return textTitle;
  };

  const goBackNavigation = () => {
    profileStore.setWebViewParam('');
    navigation.goBack();
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={parseTitle()}
        goback
        onPress={goBackNavigation}
      />
      <VStack style={componentStyles.partnerContainer}>
        <WebView
          onLoad={() => setLoading(false)}
          originWhitelist={['*']}
          source={{
            uri:
              url ??
              'https://hayuq.com/privacy-policy?type=driver&status=privacy',
          }}
        />
        {loading && (
          <Animatable.View
            animation="fadeIn"
            style={componentStyles.loadingIndicator}>
            <ActivityIndicator size="large" color={Colors.secondaryMain} />
          </Animatable.View>
        )}
      </VStack>
    </View>
  );
};

export default PartnerShipTnC;

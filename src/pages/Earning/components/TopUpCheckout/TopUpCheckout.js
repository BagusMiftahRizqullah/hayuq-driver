import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {MAIN_CONSTANT} from '../../../Main/Main.constant';
import {Layout, Colors} from '@styles';
import {VStack, HeaderNavigation} from '@components';

const TopUpCheckout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { driverData } = useSelector((state) => state.main);
  const { topUpSuccessResponse } = useSelector(state => state.earningReducer);
  const url = topUpSuccessResponse?.webRedirectUrl;

  const handleUpdateBalanceWallet = () => {
    dispatch({
        type: MAIN_CONSTANT.GET_DRIVER_DETAIL,
        payload: driverData?.id ?? driverData?.drivers?.id,
    })
  };

  const goBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title='Topup Checkout'
        goback
        onPress={goBackNavigation}
      />
      <VStack style={[Layout.flex]}>
        <WebView
            originWhitelist={['*']}
            source={{
                uri: url,
            }}
            onNavigationStateChange={(event) => {
                if (event.title.includes('refund-callback')) {
                handleUpdateBalanceWallet()
                navigation.goBack()
                }
            }}
            style={{ flex: 1 }}
        />
      </VStack>
    </View>
  );
};

export default TopUpCheckout;

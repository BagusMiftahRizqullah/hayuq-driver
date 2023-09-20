import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import t from '@lang';

import {VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {WithdrawSuccess} from '@assets';

import styles from './Alert.style';

const AlertSuccess = ({route}) => {
  const {type} = route.params;
  const componentStyles = styles();
  const navigation = useNavigation();

  const goToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTabMenu'}],
    });
  };

  const renderSuccessMessage = () => {
    switch (type){
      case 'Vehicle Info':
        return 'Your vehicle info has been successfuly edit !'
      case 'Bank Account':
        return 'Your bank account has been successfuly edit !'
      case 'Phone Number':
        return 'Your phone number has been successfuly edit !'
      case 'Email':
        return 'Your email has been successfuly edit !'
    }
  }

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Successfull')} />
      <VStack style={componentStyles.successContainer}>
        <Image
          source={WithdrawSuccess}
          style={{
            width: CustomSpacing(300),
            height: CustomSpacing(200),
          }}
        />
        <Spacer height={CustomSpacing(20)} />
        <Text style={{...Fonts.headingMBold, textAlign: 'center'}}>
            Success Edit
        </Text>
        <Text style={{...Fonts.textM, textAlign: 'center'}}>
            {renderSuccessMessage()}
        </Text>
        <VStack style={componentStyles.alertBtn}>
          <Button onPress={goToMain}>
            <Text style={{...Fonts.textMBold}}>{t('Continue')}</Text>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};

export default AlertSuccess;

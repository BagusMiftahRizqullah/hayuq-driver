import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import t from '@lang';

import {MASTER_ACTION} from '../../../../../config/masterData';
import {REGISTER_PROCESS} from '../../Register/RegistrationProcess/RegistrationProcess.constant';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {VStack, Button, HeaderNavigation, Spacer} from '@components';
import {RegistrationtIlustration} from '@assets';
import {useEffect} from 'react';

const RegistrationProcess = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dataUser } = useSelector(state => state.auth);
  const dataRequirement = [
    {key: t('ID Card')},
    {key: t('Driving License')},
    {key: t('Vehicle Registration')},
    {key: t('Police Certificate')},
    {key: t('Bank Account')},
  ];

  const handleGetMasterDataBanks = () => {
    dispatch({
      type: MASTER_ACTION.MASTER_GET_BANK,
    });
  };

  const handleGetMasterDataVehicles = () => {
    dispatch({
      type: MASTER_ACTION.MASTER_GET_VEHIVLES,
    });
  };

  const handleGetExistDocument = () => {
    dispatch({
      type: REGISTER_PROCESS.LOAD_EXIST_DOCUMENT,
      payload: dataUser?.id
    })
  }

  useEffect(() => {
    handleGetMasterDataBanks();
    handleGetMasterDataVehicles();
    handleGetExistDocument();
  }, []);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Hayuq Driver Registration')} />
      <ScrollView>
        <VStack
          top={CustomSpacing(40)}
          bottom={CustomSpacing(14)}
          style={[Layout.flexCenter]}>
          <Image
            source={RegistrationtIlustration}
            style={{width: CustomSpacing(160), height: CustomSpacing(165)}}
          />
        </VStack>
        <VStack style={{margin: CustomSpacing(16)}}>
          <Text
            style={[
              {lineHeight: CustomSpacing(23), marginBottom: CustomSpacing(20)},
              Fonts.textM,
            ]}>
            {t(
              'Before you become our driver, you need to fill some data for your profile. Please prepare documents:',
            )}
          </Text>
          {dataRequirement.map((item, index) => (
            <View
              style={{marginBottom: CustomSpacing(10)}}
              key={`data-require-${index}`}>
              <Text style={[{...Fonts.textMBold}]}>{`\u2022 ${item.key}`}</Text>
            </View>
          ))}
          <Text
            style={[
              {
                lineHeight: CustomSpacing(23),
                marginTop: CustomSpacing(10),
                marginBottom: CustomSpacing(30),
              },
              Fonts.textM,
            ]}>
            {t(
              'Once it’s done, our team will verify your data, and will update verification result by Email for the next step.',
            )}
          </Text>
          <Button onPress={() => navigation.navigate('FormRegistration')}>
            <Text style={Fonts.textLBold}>{t('Continue')}</Text>
          </Button>
          {/* <Button
            style={{
              marginTop: CustomSpacing(12),
              backgroundColor: Colors.primarySurface,
            }}>
            <Text
              style={[
                {
                  color: Colors.primaryPressed,
                  ...Fonts.textLBold,
                },
              ]}>
              {t('Go Back')}
            </Text>
          </Button>
          <Spacer bottomSafeAreaHeight /> */}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default RegistrationProcess;

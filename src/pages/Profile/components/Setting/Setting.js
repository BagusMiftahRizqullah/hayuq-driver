import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import t from '@lang';

import {HStack, VStack, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';

import styles from './Setting.style';

const Setting = () => {
  const componentStyles = styles();
  const navigation = useNavigation();

  const {driverDetail} = useSelector((state) => state.main);
  const driverDetails = useMemo(() => driverDetail.driverdetails, []);
  const drivers = useMemo(() => driverDetail.drivers, []);
  const drivervehicles = useMemo(() => driverDetail.drivervehicles, []);
  const driverbanks = useMemo(() => driverDetail.driverbanks, []);

  const activeBank = driverbanks?.length && driverbanks?.filter((e) => e.active === true);

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const goToEmail = () => {
    navigation.navigate('ChangeEmail');
  };

  const goToPhoneNumber = () => {
    navigation.navigate('ChangePhoneNumber');
  };

  const goToVehicleInformation = () => {
    navigation.navigate('ChangeVehicleInformation');
  };

  const goToChangeBankAccount = () => {
    navigation.navigate('ChangeBankAccount');
  };

  const goToDeleteAccount = () => {
    navigation.navigate('DeleteAccount')
  }

  const dataSetting = [
    {
      title: t('Change Email'),
      icon: 'envelope',
      data: drivers?.email ?? '',
      onPress: goToEmail,
    },
    {
      title: t('Change Phone Number'),
      icon: 'phone',
      data: drivers?.phone ?? '',
      onPress: goToPhoneNumber,
    },
    {
      title: t('Vehicle Information'),
      icon: 'info-circle',
      data: drivervehicles?.model ?? '',
      onPress: goToVehicleInformation,
    },
    {
      title: t('Bank Account'),
      icon: 'credit-card-alt',
      data: !driverbanks?.length
        ? driverbanks?.banks?.name
        : activeBank[0]?.banks?.name,
      onPress: goToChangeBankAccount,
    },
    {
      title: 'Delete Account',
      icon: 'trash',
      data: driverDetails?.name ?? '',
      onPress: goToDeleteAccount,
    },
  ];

  console.log(driverDetail);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Setting')}
        goback
        onPress={goBackNavigation}
      />
      <VStack style={componentStyles.settingContainer}>
        <HStack bottom={CustomSpacing(20)}>
          <Text style={{...Fonts.textLBold}}>{t('Account')}</Text>
        </HStack>
        {dataSetting.map((item, index) => (
          <TouchableOpacity
            key={`data-setting-${index}`}
            activeOpacity={0.9}
            onPress={item.onPress}>
            <VStack style={componentStyles.cardSetting}>
              <HStack style={[Layout.flexFullBetween]}>
                <HStack>
                  <Icon name={item.icon} size={18} color={Colors.neutral70} />
                  <VStack left={CustomSpacing(10)}>
                    <Text style={{...Fonts.textMBold}}>{item.title}</Text>
                    <Text style={{...Fonts.textM}}>{item.data}</Text>
                  </VStack>
                </HStack>
                <Icon name="chevron-right" size={10} color={Colors.neutral70} />
              </HStack>
            </VStack>
          </TouchableOpacity>
        ))}
      </VStack>
    </View>
  );
};

export default Setting;

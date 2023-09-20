import React, {useEffect, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import t from '@lang';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import {
  HStack,
  VStack,
  Button,
  Spacer,
  HeaderNavigation,
  RatingStar,
} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {ProfilePic} from '@assets';
import DeviceInfo from 'react-native-device-info';
import styles from './Profile.style';
import {AUTH_CONSTANT} from '../Auth/Auth.constant';
import {MASTER_ACTION} from '../../config/masterData';

const Profile = observer(() => {
  const {profileStore, earningStore, mainStore} = useStores();
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();

  const {driverDetail} = useSelector((state) => state.main);
  const driverDetails = useMemo(() => driverDetail.driverdetails, []);
  const drierProfile = driverDetail.driverprofile
  const drivers = useMemo(() => driverDetail.drivers, []);

  const handleLogout = () => {
    dispatch({type: AUTH_CONSTANT.LOGOUT});
    dispatch({type: AUTH_CONSTANT.CLEAR_AUTH_RESPONSE});
  };

  const handleGetMasterDataBanks = () => {
    dispatch({
      type: MASTER_ACTION.MASTER_GET_BANK,
    });
  };

  const handleGetVehicle = () => {
    dispatch({
      type: MASTER_ACTION.MASTER_GET_VEHIVLES,
    });
  };

  const goToOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  const goToRatingHistory = () => {
    navigation.navigate('RatingHistory');
  };

  const goToChangeLanguage = () => {
    navigation.navigate('ChangeLanguage');
  };

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  const goToPartnerShipTnC = () => {
    navigation.navigate('PartnerShipTnC');
  };

  const goToReferral = () => {
    navigation.navigate('Referral');
  };

  const menuSetting = [
    {
      title: t('Change language'),
      icon: 'filter',
      onPress: goToChangeLanguage,
    },
    {
      title: t('Setting'),
      icon: 'cog',
      onPress: goToSetting,
    },
    {
      title: t('Partnership Help Center'),
      icon: 'question-circle',
      onPress: () => {
        profileStore.setWebViewParam('help');
        goToPartnerShipTnC();
      },
    },
    {
      title: t('Partnership Term & Condition'),
      icon: 'user',
      onPress: () => {
        profileStore.setWebViewParam('tnc');
        goToPartnerShipTnC();
      },
    },
    {
      title: 'Referral',
      icon: 'users',
      onPress: goToReferral,
    },
  ];

  useEffect(() => {
    handleGetMasterDataBanks();
    handleGetVehicle();
    if (mainStore.driverId) {
      earningStore.getRatingCount(mainStore.driverId);
      earningStore.getListRatingCount(mainStore.driverId);
    }
  }, []);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation title={t('Profile')} />
      <ScrollView style={componentStyles.profileContainer}>
        <VStack style={componentStyles.cardProfileName}>
          <HStack style={[Layout.flexFullBetween]}>
            <HStack>
              <Image
                source={{uri: drierProfile?.path}}
                defaultSource={ProfilePic}
                style={{
                  width: CustomSpacing(53),
                  height: CustomSpacing(53),
                  borderRadius: CustomSpacing(9),
                }}
              />
              <VStack left={CustomSpacing(10)}>
                <Text style={{...Fonts.textXsBold, width: CustomSpacing(100)}} numberOfLines={1}>
                  {driverDetails?.name}
                </Text>
                <Spacer height={CustomSpacing(5)} />
                <Text style={{...Fonts.textXs}}>{drivers?.phone}</Text>
              </VStack>
            </HStack>
            <Button
              style={{
                width: CustomSpacing(100),
                paddingVertical: CustomSpacing(1),
                backgroundColor: Colors.secondarySurface,
              }}
              onPress={goToOrderHistory}>
              <Text style={{...Fonts.textXsBold, color: Colors.secondaryMain}}>
                {t('Order History')}
              </Text>
            </Button>
          </HStack>
        </VStack>
        <VStack style={componentStyles.cardProfileName}>
          <HStack style={[Layout.flexFullBetween]}>
            <Text style={{...Fonts.textLBold}}>Rating History</Text>
            <Button
              style={{
                width: CustomSpacing(100),
                paddingVertical: CustomSpacing(1),
                backgroundColor: Colors.secondarySurface,
              }}
              onPress={goToRatingHistory}>
              <Text style={{...Fonts.textXsBold, color: Colors.secondaryMain}}>
                {t('View All')}
              </Text>
            </Button>
          </HStack>
          <Spacer height={CustomSpacing(10)} />
          {earningStore.getDriverRatingData !== null && (
            <HStack style={[Layout.flexFullBetween]}>
              <Text style={{...Fonts.textXs}}>
                Total Rating {earningStore.getDriverRatingData?.count}
              </Text>
              <RatingStar
                rating={
                  Math.round(earningStore.getDriverRatingData?.average) ?? 2
                }
                right={CustomSpacing(20)}
                size={CustomSpacing(12)}
              />
            </HStack>
          )}
        </VStack>
        <Spacer height={CustomSpacing(20)} />
        <Text 
          style={{
            ...Fonts.textSBold, 
            marginBottom: CustomSpacing(14),
            paddingHorizontal: CustomSpacing(7)
          }}
        >
          {t('More Information')}
        </Text>
        {menuSetting.map((item, index) => (
          <TouchableOpacity
            key={`menu-setting-${index}`}
            activeOpacity={0.8}
            onPress={item.onPress}>
            <VStack style={componentStyles.cardProfileName}>
              <HStack style={[Layout.flexFullBetween]}>
                <HStack>
                  <Icon
                    name={item.icon}
                    size={CustomSpacing(20)}
                    color={Colors.neutral70}
                  />
                  <Text
                    style={{
                      ...Fonts.textXsBold,
                      marginLeft: CustomSpacing(10),
                    }}>
                    {item.title}
                  </Text>
                </HStack>
                <Icon
                  name="chevron-right"
                  size={CustomSpacing(10)}
                  color={Colors.neutral70}
                />
              </HStack>
            </VStack>
          </TouchableOpacity>
        ))}
        <Spacer height={CustomSpacing(20)} />

        <VStack
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={[
              Fonts.textLBold,
            ]}>{`Version ${DeviceInfo.getVersion()}`}</Text>
        </VStack>
        <Spacer height={CustomSpacing(32)} />
      </ScrollView>
      <VStack style={componentStyles.signoutBtn}>
        <Button onPress={handleLogout}>
          <Text style={{...Fonts.textMBold}}>{t('Sign Out')}</Text>
        </Button>
      </VStack>
    </View>
  );
});

export default Profile;

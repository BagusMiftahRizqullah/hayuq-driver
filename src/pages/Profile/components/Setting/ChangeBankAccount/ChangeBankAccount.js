import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import t from '@lang';

import {HStack, VStack, HeaderNavigation, Button} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';

import styles from './ChangeBankAccount.style';

const ChangeBankAccount = () => {
  const componentStyles = styles();
  const navigation = useNavigation();
  const {driverDetail} = useSelector((state) => state.main);
  const [isShowBankNumber, setIsShowBankNumber] = useState(false);

  const findPrimaryBank = driverDetail?.driverbanks?.length && driverDetail?.driverbanks?.filter(
    (e) => e.active === true,
  )[0];

  const idPrimaryBank = findPrimaryBank
    ? findPrimaryBank?.id
    : driverDetail?.driverbanks?.id;

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleShowHideBankNumber = () => {
    setIsShowBankNumber(!isShowBankNumber);
  };

  const bankData = [
    {
      id: 1,
      title: 'BCA',
      accountNumber: '123456789',
      accountName: 'John Doe',
      primary: true,
    },
  ];

  const hidShowBankNumber = (number) => {
    if (!isShowBankNumber) {
      return `**** **** ${number?.substr(number.length - 4)}`
    } else {
      return number
    }
  };

  const goToAddNewBank = () => {
    navigation.navigate('AddNewAccount', {
      idBank: idPrimaryBank,
    });
  };

  const renderItem = ({item}) => {
    return (
      <>
        {driverDetail?.driverbanks?.length ? (
          <>
            {driverDetail?.driverbanks?.map((data, index) => (
              <VStack
                key={`list-bank-driver-${index}`}
                style={componentStyles.cardBank}>
                <HStack style={[Layout.flexFullBetween]}>
                  <Text style={{...Fonts.textMBold, color: Colors.neutral10}}>
                    Bank Information
                  </Text>

                  {data?.active ? (
                    <VStack style={componentStyles.primaryCard}>
                      <Text style={{...Fonts.textSBold}}>Primary</Text>
                    </VStack>
                  ) : (
                    <VStack style={componentStyles.primaryCard}>
                      <Text style={{...Fonts.textSBold}}>On Review</Text>
                    </VStack>
                  )}
                </HStack>
                <VStack top={CustomSpacing(50)}>
                  <Text style={{...Fonts.textMBold, color: Colors.neutral10}}>
                    {data.banks.account_name}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.textMBold,
                      color: Colors.neutral10,
                      marginVertical: CustomSpacing(10),
                    }}>
                    {data.name}
                  </Text>
                  <HStack>
                    <Text
                      style={{
                        ...Fonts.textMBold,
                        color: Colors.neutral10,
                        marginRight: CustomSpacing(5),
                      }}>
                      {hidShowBankNumber(data.number)}
                    </Text>
                    <Icon name="eye-slash" size={16} color={Colors.neutral10} onPress={handleShowHideBankNumber} />
                  </HStack>
                </VStack>
              </VStack>
            ))}
          </>
        ) : (
          <VStack style={componentStyles.cardBank}>
            <HStack style={[Layout.flexFullBetween]}>
              <Text style={{...Fonts.textMBold, color: Colors.neutral10}}>
                Bank Information
              </Text>

              {driverDetail?.driverbanks?.active ? (
                <VStack style={componentStyles.primaryCard}>
                  <Text style={{...Fonts.textSBold}}>Primary</Text>
                </VStack>
              ) : (
                <VStack style={componentStyles.primaryCard}>
                  <Text style={{...Fonts.textSBold}}>On Review</Text>
                </VStack>
              )}
            </HStack>
            <VStack top={CustomSpacing(50)}>
              <Text style={{...Fonts.textMBold, color: Colors.neutral10}}>
                {driverDetail?.driverbanks?.banks?.name}
              </Text>
              <Text
                style={{
                  ...Fonts.textMBold,
                  color: Colors.neutral10,
                  marginVertical: CustomSpacing(10),
                }}>
                {driverDetail?.driverbanks?.banks?.account_name}
              </Text>
              <HStack>
                <Text
                  style={{
                    ...Fonts.textMBold,
                    color: Colors.neutral10,
                    marginRight: CustomSpacing(5),
                  }}>
                  {hidShowBankNumber(driverDetail?.driverbanks?.number)}
                </Text>
                <Icon name="eye-slash" size={16} color={Colors.neutral10} onPress={handleShowHideBankNumber} />
              </HStack>
            </VStack>
          </VStack>
        )}
      </>
    );
  };
  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Bank Account')}
        goback
        onPress={goBackNavigation}
      />
      <VStack style={componentStyles.containerBankAccount}>
        <FlatList
          renderItem={renderItem}
          data={bankData ?? []}
          keyExtractor={(item, index) => index.toString()}
          scrollToOverflowEnabled
          showsVerticalScrollIndicator={false}
          bounces={Platform.OS === 'ios'}
          onEndReachedThreshold={0.3}
          windowSize={10}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={100}
          initialNumToRender={5}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: CustomSpacing(200),
          }}
        />
      </VStack>
      <VStack style={componentStyles.addBankBtn}>
        <Button onPress={goToAddNewBank}>
          <Text style={{...Fonts.textMBold}}>Change bank Account</Text>
        </Button>
      </VStack>
    </View>
  );
};

export default ChangeBankAccount;

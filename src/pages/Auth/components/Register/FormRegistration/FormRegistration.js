import React, {useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';

import {VStack, HStack, Button, HeaderNavigation, Spacer} from '@components';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {DummyImage} from '@assets';
import DetailForm from '../DetailForm/DetailForm';
import styles from './FormRegistration.style';

const FormRegistration = () => {
  const componentStyles = styles();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.registerProcessReducer);
  const { dataUser } = useSelector(state => state.auth)
  const [activeForm, setActiveForm] = useState('');

  const dataForm = [
    {title: 'Photo Profile', image: data.dataProfile?.path},
    {title: 'ID Card', image: data.dataIdCard?.path},
    {title: 'Driving License', image: data.dataLicense?.path},
    {title: 'STNK', image: data.dataVehicle?.path},
    {title: 'SKCK', image: data.dataSkck?.path},
    {title: 'Bank Account', image: data.dataBank?.path},
  ];

  return (
    <>
      {activeForm === '' ? (
        <View
          style={[
            Layout.flex,
            {
              backgroundColor: Colors.neutral10,
            },
          ]}>
          <HeaderNavigation title={'Completed Your Information'} />
          <ScrollView style={componentStyles.containerFormRegistration}>
            <VStack style={componentStyles.borderedCard}>
              <Text
                style={[
                  {
                    color: Colors.neutral90,
                    marginBottom: CustomSpacing(5),
                    ...Fonts.textLBold,
                  },
                ]}>
                {dataUser?.email}
              </Text>
              {/* <Text
                style={[
                  {
                    color: Colors.neutral90,
                    lineHeight: CustomSpacing(25),
                    ...Fonts.textM,
                  },
                ]}>
                {dataUser?.email}
              </Text> */}
              <Text style={[{color: Colors.neutral90, ...Fonts.textM}]}>
                {dataUser?.phone}
              </Text>
            </VStack>
            <VStack style={{margin: CustomSpacing(16)}}>
              <Text
                style={[
                  {
                    color: Colors.neutral90,
                    marginBottom: CustomSpacing(5),
                    ...Fonts.textLBold,
                  },
                ]}>
                File Upload
              </Text>
              <Text style={{lineHeight: CustomSpacing(22)}}>
                Please upload image in jpeg/png version from this document and
                information needed.
              </Text>
            </VStack>
            <VStack>
              {dataForm.map((e, i) => {
                return (
                  <Pressable
                    key={i}
                    onPress={() => setActiveForm(e.title)}
                    style={{marginVertical: CustomSpacing(5)}}>
                    <HStack
                      style={[
                        Layout.flexRowBetween,
                        componentStyles.cardDocument,
                      ]}>
                      <HStack>
                        <Image
                          defaultSource={DummyImage}
                          source={e.image ? {uri: e.image} : DummyImage}
                          style={{
                            width: CustomSpacing(28),
                            height: CustomSpacing(28),
                            borderRadius: CustomSpacing(100),
                          }}
                        />
                        <VStack left={CustomSpacing(10)}>
                          <Text
                            style={{
                              ...Fonts.textMBold,
                              color: Colors.neutral90,
                            }}>
                            {e.title === 'SKCK' ? 'SKCK (optional)' : e.title}
                          </Text>
                          {!e.image ? (
                            <Text
                              style={{
                                ...Fonts.textM,
                                color: Colors.dangerMain,
                                marginBottom: CustomSpacing(2),
                              }}>
                              Upload
                            </Text>
                          ) : (
                            <Text
                              style={{
                                ...Fonts.textM,
                                color: Colors.successMain,
                                marginBottom: CustomSpacing(2),
                              }}>
                              Success Upload
                            </Text>
                          )}
                        </VStack>
                      </HStack>
                      <Icon
                        name="chevron-right"
                        size={10}
                        color={Colors.neutral70}
                      />
                    </HStack>
                  </Pressable>
                );
              })}
            </VStack>
            <VStack
              style={{
                marginTop: CustomSpacing(15),
                marginBottom: CustomSpacing(40),
              }}>
              <Button
                onPress={() => navigation.navigate('SuccessRegistration')}>
                <Text style={Fonts.textLBold}>Status Document</Text>
              </Button>
            </VStack>
          </ScrollView>
        </View>
      ) : (
        <DetailForm activeForm={activeForm} setActiveForm={setActiveForm} />
      )}
    </>
  );
};

export default FormRegistration;

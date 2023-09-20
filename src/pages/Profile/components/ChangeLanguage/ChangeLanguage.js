import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import t from '@lang';
import {useDispatch, useSelector} from 'react-redux';

import {HStack, VStack, HeaderNavigation, RatingStar} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {LANG_CONSTANT} from '@lang/Lang.constant';

import styles from './ChangeLanguage.style';

const ChangeLanguage = () => {
  const {lang} = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(lang);

  const handleSelectedLanguage = (index) => {
    dispatch({
      type: LANG_CONSTANT.SET_GLOBAL_LANGUAGE,
      payload: index,
    });
    setSelectedLanguage(index);
  };

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const dataLanguage = [
    {
      id: 'id',
      title: 'Bahasa Indonesia',
    },
    {
      id: 'en',
      title: 'English',
    },
    {
      id: 'ar',
      title: 'العربية',
    },
    {
      id: 'fr',
      title: 'Français',
    },
  ];

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Change Language')}
        goback
        onPress={goBackNavigation}
      />
      <VStack style={componentStyles.changeLanguageContainer}>
        <HStack vertical={CustomSpacing(10)}>
          <Text style={{...Fonts.textMBold}}>{t('Choose Language')}</Text>
        </HStack>
        {dataLanguage.map((item, index) => (
          <TouchableOpacity
            key={`data-language-${index}`}
            onPress={() => handleSelectedLanguage(item.id)}
            activeOpacity={0.9}>
            <VStack style={componentStyles.cardLanguage}>
              <HStack style={[Layout.flexFullBetween]}>
                <Text style={{...Fonts.textMBold}}>{item.title}</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.neutral70,
                    borderRadius: 100,
                    width: 12,
                    height: 12,
                    backgroundColor:
                      item.id === selectedLanguage
                        ? Colors.secondaryMain
                        : Colors.neutral10,
                  }}
                />
              </HStack>
            </VStack>
          </TouchableOpacity>
        ))}
      </VStack>
    </View>
  );
};

export default ChangeLanguage;

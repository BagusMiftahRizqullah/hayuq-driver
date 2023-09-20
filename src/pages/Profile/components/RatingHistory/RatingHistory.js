import React from 'react';
import {View, Text, FlatList, StyleSheet, Platform, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import t from '@lang';
import moment from 'moment';

import {HStack, VStack, HeaderNavigation, RatingStar} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {dimensions} from '@config/Platform.config';

import {EmptyChat} from '@assets'
import styles from './RatingHistory.style';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

const RatingHistory = observer(() => {
  const {earningStore} = useStores();
  const componentStyles = styles();
  const navigation = useNavigation();

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return (
      <VStack style={componentStyles.cardRatingHistory}>
        <HStack
          style={[
            Layout.flexFullBetween,
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.neutral70,
            },
          ]}
          bottom={CustomSpacing(10)}>
          <Text style={{...Fonts.textSBold}}>
          {item?.users?.users?.name} - {moment(item.created_at).format('DD/MM/YYYY')}
          </Text>
          <RatingStar rating={item.ratings} size={CustomSpacing(12)} />
        </HStack>
        <VStack top={CustomSpacing(10)}>
          <Text style={{...Fonts.textXs}}>{item.notes}</Text>
        </VStack>
      </VStack>
    );
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Rating History')}
        goback
        onPress={goBackNavigation}
      />
      {earningStore.getDriverListRatingData ? (
        <VStack style={componentStyles.ratingHistoryContainer}>
          <FlatList
            renderItem={renderItem}
            data={earningStore.getDriverListRatingData ?? []}
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
      ) : (
        <View
          style={[
            Layout.flexCenterMid,
            {
              height: dimensions.screenWidth * 1.2,
              marginHorizontal: CustomSpacing(15),
            },
          ]}
        >
          <Image
            style={{
              width: CustomSpacing(300),
              height: CustomSpacing(200),
            }}
            source={EmptyChat}
          />
          <Text style={[Fonts.headingMBold]}>No rating history</Text>
          <Text style={[Fonts.textM, {color: Colors.neutral70, textAlign: 'center'}]}>
            Begin your delivery with Hayuq, and all rating history will show up here.
          </Text>
        </View>
      )}
    </View>
  );
});

export default RatingHistory;

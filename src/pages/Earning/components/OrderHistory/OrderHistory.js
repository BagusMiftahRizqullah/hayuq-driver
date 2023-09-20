import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Platform, ActivityIndicator, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import t from '@lang';
import {HStack, VStack, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {dimensions} from '@config/Platform.config';
import {EmptyChat} from '@assets'
import OrderCard from './OrderCard';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import styles from './OrderHistory.style';

const OrderHistory = observer(() => {
  const {mainStore} = useStores();
  const navigation = useNavigation();
  const componentStyles = styles();
  const [historyData, setHistoryData] = useState([]);
  const [dateFilter, setDateFilter] = useState({title: t('Last 7 Days'), count: 6});

  const endDate = moment()
  const startDate = moment(endDate).subtract(dateFilter.count || 6, "days").format("YYYY/MM/DD")

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const optionData = [
    {title: t('All')},
    {title: t('Last 7 Days'), count: 6},
    {title: t('Last 14 Days'), count: 13},
    {title: t('Last 30 Days'), count: 29},
  ];

  const handleGetAllOrderHistory = () => {
    if (mainStore.driverId) {
      const data = {
        driverId: mainStore.driverId,
        start: '',
        end: '',
      };
      mainStore.getHistoryOrder(data);
    }
  }

  useEffect(() => {
    if (dateFilter.count && startDate) {
      const data = {
        driverId: mainStore.driverId,
        start: startDate,
        end: moment(endDate).format('YYYY/MM/DD'),
      };
      mainStore.getHistoryOrder(data);
    } else {
      handleGetAllOrderHistory()
    }
  }, [dateFilter])

  useEffect(() => {
    if (mainStore?.historyOrderData?.response) {
      const sortData = mainStore.historyOrderData.response.sort(
        (a, b) => new Date(b.finished_at) - new Date(a.finished_at),
      );
      setHistoryData(sortData);
    }
  }, [mainStore.historyOrderData]);

  const renderItem = ({item}) => {
    return <OrderCard data={item} />;
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Order History')}
        goback
        onPress={goBackNavigation}
      />
      {historyData.length > 0 ? (
        <VStack style={componentStyles.containerOrderHistory}>
          <HStack 
            style={[
              Layout.flexFullBetween, 
              {
                marginVertical: CustomSpacing(10),
                paddingHorizontal: CustomSpacing(6)
              }
            ]}
          >
            <Text style={{...Fonts.textMBold}}>{dateFilter.title} ({historyData.length})</Text>
            <HStack>
              {mainStore.historyOrderLoading && (
                <ActivityIndicator 
                  color={Colors.neutral50}
                  size='small'
                  style={componentStyles.filterLoading} 
                />
              )}
              <SelectDropdown
                data={optionData}
                defaultValue={dateFilter.title}
                onSelect={(selectedItem, index) => {
                  setDateFilter(selectedItem);
                }}
                renderDropdownIcon={() => (
                  <Icon name="chevron-down" size={10} color={Colors.neutral70} />
                )}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.title;
                }}
                rowTextForSelection={(item, index) => {
                  return item.title;
                }}
                buttonStyle={componentStyles.selectDropdown}
                buttonTextStyle={{...Fonts.textMBold}}
                rowTextStyle={{...Fonts.textM}}
              />
            </HStack>
          </HStack>
          <FlatList
            renderItem={renderItem}
            data={historyData ?? []}
            keyExtractor={(item, index) => index.toString()}
            scrollToOverflowEnabled
            //   ref={onGetRef}
            showsVerticalScrollIndicator={false}
            bounces={Platform.OS === 'ios'}
            onEndReachedThreshold={0.3}
            windowSize={10}
            //   refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            //   }
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
          <Text style={[Fonts.headingMBold]}>No order history</Text>
          <Text style={[Fonts.textM, {color: Colors.neutral70, textAlign: 'center'}]}>
            Begin your delivery with Hayuq, and all your order history will show up here.
          </Text>
        </View>
      )}
    </View>
  );
});

export default OrderHistory;

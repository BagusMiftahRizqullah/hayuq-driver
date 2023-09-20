import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import t from '@lang';
import Numbro from '@utils/numbro';

import {HStack, VStack, Button, Spacer, HeaderNavigation} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

import styles from './EarningDetail.style';

const EarningDetail = observer(() => {
  const {earningStore, mainStore} = useStores();
  const componentStyles = styles();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(moment());

  const [earningData, setEarningData] = useState({
    total: '',
    list: [],
  });

  useEffect(() => {
    if (selectedDate) {
      const data = {
        driverId: mainStore.driverId,
        start: moment(selectedDate).format('YYYY-MM-DD'),
        end: moment(selectedDate).format('YYYY-MM-DD'),
      };
      earningStore.getEarning(data);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (earningStore.getEarningData !== null) {
      setEarningData(earningStore.getEarningData);
    }
  }, [earningStore.getEarningData]);

  const goBackNavigation = () => {
    const data = {
      driverId: mainStore.driverId,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    };
    earningStore.getEarning(data);
    navigation.goBack();
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title={t('Earning Details')}
        goback
        onPress={goBackNavigation}
      />
      <VStack style={componentStyles.containerEarningDetail}>
        <VStack style={componentStyles.cardTotalIncome}>
          <CalendarStrip
            scrollable
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{
              type: 'background',
              duration: 300,
              highlightColor: Colors.primaryMain,
            }}
            style={{
              height: CustomSpacing(100),
              paddingVertical: CustomSpacing(10),
            }}
            calendarHeaderStyle={{color: Colors.neutral90}}
            dateNumberStyle={{color: Colors.neutral90}}
            dateNameStyle={{color: Colors.neutral90}}
            iconContainer={{flex: 0.1}}
            highlightDateNameStyle={{color: Colors.neutral90}}
            highlightDateNumberStyle={{color: Colors.neutral90}}
            useIsoWeekday={false}
            onDateSelected={(date) => {
              setSelectedDate(moment(date));
            }}
            startingDate={selectedDate}
            selectedDate={selectedDate}
            datesBlacklist={[
              {
                start: moment().add(1, 'days'),
                end: moment().add(14, 'days'),
              },
            ]}
            maxDate={moment().add(14, 'days')}
            locale={{
              name: 'en',
              config: {
                months:
                  'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                    '_',
                  ),
                monthsShort:
                  'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
                weekdays:
                  'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                    '_',
                  ),
                weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
                weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              },
            }}
          />
        </VStack>
        <HStack style={[Layout.flexFullBetween]} vertical={CustomSpacing(10)}>
          <Text style={{...Fonts.textMBold}}>{t('Total Income')}</Text>
        </HStack>
        <VStack style={componentStyles.cardTotalIncome}>
          <Text style={{...Fonts.textSBold}}>
            {moment(selectedDate).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD')
              ? 'Today'
              : moment(selectedDate).format('DD MMM YY')}
          </Text>
          <Spacer height={CustomSpacing(5)} />
          <Text style={{...Fonts.textLBold}}>
            Rp. {Numbro.formatCurrency(earningData.total)}
          </Text>
          <Spacer height={CustomSpacing(5)} />
          <Text style={{...Fonts.textXs}}>
            {earningData.list.length} {t('Order Completed')}
          </Text>
          <VStack vertical={CustomSpacing(10)}>
            <Spacer height={CustomSpacing(5)} />
            <Text style={{...Fonts.textSBold}}>{t('Income Detail')}</Text>
            <Spacer height={CustomSpacing(5)} />
            <HStack style={[Layout.flexFullBetween]}>
              <Text style={{...Fonts.textS}}>{t('Trip')}</Text>
              <Text style={{...Fonts.textS}}>
                Rp. {Numbro.formatCurrency(earningData.total)}
              </Text>
            </HStack>
            <Spacer height={CustomSpacing(5)} />
            <HStack style={[Layout.flexFullBetween]}>
              <Text style={{...Fonts.textS}}>{t('Incentive')}</Text>
              <Text style={{...Fonts.textS}}>Rp. 0</Text>
            </HStack>
            <Spacer height={CustomSpacing(5)} />
            <HStack style={[Layout.flexFullBetween]}>
              <Text style={{...Fonts.textS}}>{t('Customer Tip')}</Text>
              <Text style={{...Fonts.textS}}>Rp. 0</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </View>
  );
});

export default EarningDetail;

import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HeaderNavigation, VStack, HStack} from '@components';
import {CustomSpacing, Fonts, Colors, Layout} from '@styles';

import styles from './DailyIncentive.style';
import {observer} from 'mobx-react-lite';

const DailyIncentive = observer(() => {
  const navigation = useNavigation();
  const componentStyle = styles();

  const dataPointReward = [
    'Performance must be at least 75%.',
    'Must complete at least 10 order per day. ',
    'Driver’s rating must be at least 4.0.',
    'Working hours started from 00:01 until 23:59 each day.',
    'Performance counted weekly by dividing total completed orders with total orders received in the app.',
    'The amount of extra incentive will be automatically added to driver’s Payyuq balance; driver will be notified once the extra incentive is successfully transferred through their Payyuq.',
  ];

  const dataSpecialIncentive = [
    'Driver’s rating must be at least 4.0',
    'Working hours started from 00:01 until 23:59 each day',
    'Performance counted weekly by dividing total completed orders with total orders received in the app.',
    'Must completed at least 15 order per day',
    'The amount of extra incentive will be automatically added to driver’s Payyuq balance; driver will be notified once the extra incentive is successfully transferred through their Payyuq.',
  ];

  const goBackNavigation = () => {
    navigation.goBack('');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.neutral20}}>
      <HeaderNavigation
        title="Hayuq Driver Incentive"
        goback
        onPress={goBackNavigation}
      />
      <ScrollView style={{paddingHorizontal: CustomSpacing(15)}}>
        <Text style={{...componentStyle.titlePerformance}}>
          T&C Hayuq Driver Incentive
        </Text>
        <VStack
          style={{
            ...componentStyle.cardDetailPerformance,
            marginBottom: CustomSpacing(30),
          }}>
          <Text style={{...Fonts.textXsBold, marginTop: CustomSpacing(20)}}>
            Regular Point System
          </Text>

          <VStack
            style={{
              marginTop: CustomSpacing(5),
              marginLeft: CustomSpacing(3),
            }}>
            {dataPointReward.map((data, index) => (
              <HStack
                key={`list-data-point-system-${index}`}
                style={{...componentStyle.listRuleIncentive}}>
                <Text style={{marginHorizontal: CustomSpacing(8)}}>•</Text>
                <Text
                  style={{
                    ...Fonts.textXs,
                    marginVertical: CustomSpacing(2),
                    textAlign: 'justify',
                  }}>
                  {data}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Text style={{...Fonts.textXsBold, marginTop: CustomSpacing(20)}}>
            Special Incentive
          </Text>
          <Text
            style={{
              ...Fonts.textXs,
              marginVertical: CustomSpacing(2),
              textAlign: 'justify',
              marginBottom: CustomSpacing(8),
            }}>
            During special period, drivers will have a chance to get higher
            incentive during weekend and holidays.
          </Text>
          <VStack style={{...componentStyle.containerListRule}}>
            {dataSpecialIncentive.map((data, index) => (
              <HStack
                key={`list-data-rule-incentite-${index}`}
                style={{...componentStyle.listRuleIncentive}}>
                <Text style={{marginHorizontal: CustomSpacing(8)}}>•</Text>
                <Text
                  style={{
                    ...Fonts.textXs,
                    marginVertical: CustomSpacing(2),
                    textAlign: 'justify',
                  }}>
                  {data}
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack>
            <Text style={{...Fonts.textXsBold, marginTop: CustomSpacing(15)}}>
              Profit Sharing
            </Text>
            <HStack style={{...Layout.flexBetween}}>
              <Text
                style={{
                  ...Fonts.textXs,
                  marginVertical: CustomSpacing(2),
                  textAlign: 'justify',
                  marginBottom: CustomSpacing(8),
                }}>
                Drivers will benefit from profit sharing of 80% of every order
                completed, as Hayuq will only take 20% profit sharing.
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
});

export default DailyIncentive;

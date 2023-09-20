import {View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HeaderNavigation, VStack, HStack} from '@components';
import {
  OrderOutlinedIcon,
  EqualIcon,
  PointoutlinedIcon,
  PointIcon,
  PerformanceIcon,
  StarOutlinedIcon,
} from '@assets';
import {CustomSpacing, Fonts, Colors, Layout} from '@styles';

import styles from './SpecialIncentive.style';

const SpecialIncentive = () => {
  const navigation = useNavigation();
  const componentStyle = styles();

  const dataRuleIncentive = [
    'Bonus only applied during certain period. e.g. Ramadhan, end of the year, etc.',
    'Weekly performance should be at least 75% to get extra point-based bonus.',
  ];

  const goBackNavigation = () => {
    navigation.goBack('');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.neutral20}}>
      <HeaderNavigation
        title="Special Incentive"
        goback
        onPress={goBackNavigation}
      />
      <ScrollView style={{paddingHorizontal: CustomSpacing(15)}}>
        <Text style={{...componentStyle.titlePerformance}}>
          Hayuq Special Incentive Scheme
        </Text>
        <VStack
          style={{
            ...componentStyle.cardDetailPerformance,
            marginBottom: CustomSpacing(30),
          }}>
          <HStack style={{alignItems: 'center', justifyContent: 'center'}}>
            <VStack style={{alignItems: 'center'}}>
              <Image
                source={PointoutlinedIcon}
                style={{
                  width: CustomSpacing(24),
                  height: CustomSpacing(24),
                  marginBottom: CustomSpacing(10),
                }}
              />
              <Text>100 Point</Text>
            </VStack>
            <Image
              source={EqualIcon}
              style={{
                width: CustomSpacing(10),
                height: CustomSpacing(10),
                marginHorizontal: CustomSpacing(10),
              }}
            />
            <VStack style={{alignItems: 'center'}}>
              <Image
                source={StarOutlinedIcon}
                style={{
                  width: CustomSpacing(24),
                  height: CustomSpacing(24),
                  marginBottom: CustomSpacing(10),
                }}
              />
              <Text>1 Star</Text>
            </VStack>
          </HStack>

          <Text
            style={{
              ...Fonts.textXs,
              textAlign: 'center',
              marginTop: CustomSpacing(10),
              lineHeight: CustomSpacing(20),
            }}>
            Collect until 25 points with minimal performance 75% to get daily
            bonus worth 45rb
          </Text>

          <VStack
            style={{
              ...componentStyle.containerListRule,
              marginTop: CustomSpacing(15),
            }}>
            {dataRuleIncentive.map((data, index) => (
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
              Point
            </Text>
            <HStack style={{...Layout.flexBetween}}>
              <VStack style={{marginTop: CustomSpacing(8)}}>
                <Text style={Fonts.textXs}>Point Collected</Text>
                <HStack style={{marginTop: CustomSpacing(5)}}>
                  <Image
                    source={PointIcon}
                    style={{
                      width: CustomSpacing(17),
                      height: CustomSpacing(17),
                    }}
                  />
                  <Text
                    style={{...Fonts.textSBold, marginLeft: CustomSpacing(10)}}>
                    20
                  </Text>
                </HStack>
              </VStack>
              <VStack style={{marginTop: CustomSpacing(8), width: '45%'}}>
                <Text style={Fonts.textXs}>Point Collected</Text>
                <HStack style={{marginTop: CustomSpacing(5)}}>
                  <Image
                    source={PointIcon}
                    style={{
                      width: CustomSpacing(17),
                      height: CustomSpacing(17),
                    }}
                  />
                  <Text
                    style={{...Fonts.textSBold, marginLeft: CustomSpacing(10)}}>
                    20
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text style={{...Fonts.textXsBold, marginTop: CustomSpacing(15)}}>
              Performance
            </Text>
            <HStack style={{...Layout.flexBetween}}>
              <VStack style={{marginTop: CustomSpacing(8)}}>
                <Text style={Fonts.textXs}>Performance Collected</Text>
                <HStack style={{marginTop: CustomSpacing(5)}}>
                  <Image
                    source={PerformanceIcon}
                    style={{
                      width: CustomSpacing(17),
                      height: CustomSpacing(17),
                    }}
                  />
                  <Text
                    style={{...Fonts.textSBold, marginLeft: CustomSpacing(10)}}>
                    96%
                  </Text>
                </HStack>
              </VStack>
              <VStack
                style={{
                  marginTop: CustomSpacing(8),
                  justifyContent: 'flex-start',
                  width: '45%',
                }}>
                <Text style={Fonts.textXs}>Performance Minimal</Text>
                <HStack style={{marginTop: CustomSpacing(5)}}>
                  <Image
                    source={PerformanceIcon}
                    style={{
                      width: CustomSpacing(17),
                      height: CustomSpacing(17),
                    }}
                  />
                  <Text
                    style={{...Fonts.textSBold, marginLeft: CustomSpacing(10)}}>
                    75%
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default SpecialIncentive;

import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {HeaderNavigation, VStack, HStack, Button} from '@components';
import {
  PerformanceIcon,
  PointIcon,
  OrderOutlinedIcon,
  EqualIcon,
  StarOutlinedIcon,
  PerformanceOrderIcon,
} from '@assets';
import Numbro from '@utils/numbro';
import {Colors, CustomSpacing, Fonts} from '@styles';

import styles from './Performance.style';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

const Performance = observer(() => {
  const {PeformanceStore} = useStores();
  const navigation = useNavigation();
  const componentStyle = styles();
  const {dataRewardDriver} = useSelector((state) => state.main);

  const [rewardPointData, setRewardPointData] = useState({
    regularPoint: [],
    specialPoint: [],
  });

  const dataPerformance = [
    {
      title: 'Today Performance',
      image: PerformanceIcon,
      middleContent: `${dataRewardDriver?.performance_score ?? 0} %`,
      bottomContent: 'Daily Performance',
    },
    {
      title: 'Today Point Collected',
      image: PointIcon,
      middleContent: `${dataRewardDriver?.completed_order ?? 0} Points`,
      bottomContent: `${dataRewardDriver?.completed_order ?? 0} from ${dataRewardDriver?.total_order ?? 0} Order Completed`,
      bottomLeftContent: '⋆estimated bonus',
    },
    {
      title: 'Today Order Completed',
      image: PerformanceOrderIcon,
      middleContent: `${dataRewardDriver?.completed_order ?? 0} Completed`,
      bottomContent: `From ${dataRewardDriver?.total_order ?? 0} Total Order Completed`,
    },
  ];

  const goBackNavigation = () => {
    navigation.goBack('');
  };

  useEffect(() => {
    PeformanceStore.getPeformanceTNC();
  }, []);

  useEffect(() => {
    if (PeformanceStore.dataPeformanceTNC !== null) {
      setRewardPointData({
        regularPoint: PeformanceStore?.dataPeformanceTNC
          ?.filter((e) => e.name === 'Regular')[0]
          .pointsrules?.sort((a, b) => a.point - b.point),
        specialPoint: PeformanceStore?.dataPeformanceTNC
          ?.filter((e) => e.name === 'Special')[0]
          .pointsrules?.sort((a, b) => a.point - b.point),
      });
    }
  }, [PeformanceStore.dataPeformanceTNC]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.neutral20}}>
      <HeaderNavigation title="Performance" goback onPress={goBackNavigation} />
      <ScrollView>
        {dataPerformance.map((data, index) => (
          <VStack
            key={`list-detail-performance-${index}`}
            style={{
              marginHorizontal: CustomSpacing(15),
              marginBottom:
                index === dataPerformance.length - 1
                  ? CustomSpacing(4)
                  : CustomSpacing(0),
            }}>
            <Text style={{...componentStyle.titlePerformance}}>
              {data.title}
            </Text>
            <VStack style={{...componentStyle.cardDetailPerformance}}>
              {data.images ? (
                <HStack>
                  <VStack style={{alignItems: 'center'}}>
                    <Image
                      source={data.images[0].image}
                      style={{
                        width: CustomSpacing(24),
                        height: CustomSpacing(24),
                        marginBottom: CustomSpacing(10),
                      }}
                    />
                    <Text>{data.images[0].caption}</Text>
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
                      source={data.images[1].image}
                      style={{
                        width: CustomSpacing(24),
                        height: CustomSpacing(24),
                        marginBottom: CustomSpacing(10),
                      }}
                    />
                    <Text>{data.images[1].caption}</Text>
                  </VStack>
                </HStack>
              ) : (
                <Image
                  source={data.image}
                  style={{
                    width: CustomSpacing(24),
                    height: CustomSpacing(24),
                  }}
                />
              )}
              <Text style={{...Fonts.textLBold, marginTop: CustomSpacing(10)}}>
                {data.middleContent}
              </Text>
              <Text
                style={{
                  ...Fonts.textM,
                  textAlign: 'center',
                  marginTop: CustomSpacing(data.images ? 0 : 10),
                }}>
                {data.bottomContent}
              </Text>
              <Text
                style={{
                  ...Fonts.textxs,
                  alignSelf: 'flex-start',
                  marginTop: CustomSpacing(data.images ? 0 : 10),
                }}>
                {data.bottomLeftContent}
              </Text>
            </VStack>
          </VStack>
        ))}

        <VStack
          style={{
            marginHorizontal: CustomSpacing(15),
            marginBottom: CustomSpacing(30),
          }}>
          <HStack
            style={{
              justifyContent: 'space-between',
              marginHorizontal: CustomSpacing(15),
            }}>
            <Text
              style={{
                ...componentStyle.titlePerformance,
              }}>
              Regular Incentive
            </Text>
            <Text
              style={{
                ...componentStyle.titlePerformance,
              }}>
              Special Incentive
            </Text>
          </HStack>
          <HStack
            style={{
              justifyContent: 'space-between',
              marginHorizontal: CustomSpacing(15),
            }}>
            <VStack style={{...componentStyle.cardIncentive}}>
              <Image
                source={OrderOutlinedIcon}
                style={{
                  width: CustomSpacing(27),
                  height: CustomSpacing(27),
                  marginBottom: CustomSpacing(10),
                }}
              />
              <Text
                style={{
                  ...Fonts.textXs,
                  fontSize: CustomSpacing(11),
                  textAlign: 'center',
                }}>
                Claim this is bounce from
              </Text>
              <Text
                style={{
                  ...Fonts.textXs,
                  fontSize: CustomSpacing(11),
                  textAlign: 'center',
                  marginBottom: CustomSpacing(8),
                }}>
                Monday to Friday
              </Text>
              {rewardPointData?.regularPoint?.map((e) => (
                <Text
                  style={{
                    ...Fonts.textXs,
                    fontSize: CustomSpacing(11),
                    textAlign: 'center',
                    marginTop: CustomSpacing(4)
                  }}>
                  {e?.point} Points = Rp {Numbro.formatCurrency(e?.price)}
                </Text>
              ))}
            </VStack>
            <VStack style={{...componentStyle.cardIncentive}}>
              <Image
                source={StarOutlinedIcon}
                style={{
                  width: CustomSpacing(27),
                  height: CustomSpacing(27),
                  marginBottom: CustomSpacing(10),
                }}
              />
              <Text
                style={{
                  ...Fonts.textXs,
                  fontSize: CustomSpacing(11),
                  textAlign: 'center',
                }}>
                Claim this is bounce on
              </Text>
              <Text
                style={{
                  ...Fonts.textXs,
                  fontSize: CustomSpacing(11),
                  textAlign: 'center',
                  marginBottom: CustomSpacing(8),
                }}>
                Weekend to holidays
              </Text>
              {rewardPointData?.specialPoint?.map((e) => (
                <Text
                  style={{
                    ...Fonts.textXs,
                    fontSize: CustomSpacing(11),
                    textAlign: 'center',
                    marginTop: CustomSpacing(4)
                  }}>
                  {e?.point} Points = Rp {Numbro.formatCurrency(e?.price)}
                </Text>
              ))}
            </VStack>
          </HStack>
          <Button
            style={{
              marginHorizontal: CustomSpacing(90),
              marginTop: CustomSpacing(20),
            }}
            onPress={() => {
              navigation.navigate('DailyIncentive');
            }}>
            <Text style={Fonts.textLBold}>Detail</Text>
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
});

export default Performance;

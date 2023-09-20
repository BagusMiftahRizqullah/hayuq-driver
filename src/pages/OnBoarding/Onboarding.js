import React, {useState, useRef} from 'react';
import {Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {VStack, HStack, Button} from '@components';
import {dimensions} from '@config/Platform.config';

import t from '@lang';
import {FastDelivImg, AfordableImg, HalalFoodImg} from '@assets';
import styles from './Onboarding.style';

const Onboarding = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const componentStyle = styles();
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      img: FastDelivImg,
      title: t('Fast Delivery'),
      desc: t('Get your dishes delivered at your doorstep in no time.'),
      btnText: t('Next'),
    },
    {
      img: AfordableImg,
      title: t('Afordable Prices'),
      desc: t('Get the lowest prices for the best quality foods anywhere.'),
      btnText: t('Next'),
    },
    {
      img: HalalFoodImg,
      title: t('Halal Product'),
      desc: t(
        'No time to worries. We always trying our best to serve delicious halal foods.',
      ),
      btnText: t('Get Started'),
    },
  ];

  function renderItem({item, index}) {
    return (
      <View
        style={[
          Layout.modalContainer,
          {
            height: dimensions.screenWidth,
            width: dimensions.screenWidth,
          },
        ]}>
        <VStack vertical={CustomSpacing(50)}>
          <VStack style={{alignSelf: 'center'}}>
            <Image
              source={item.img}
              style={{
                width: CustomSpacing(320),
                height: CustomSpacing(200),
                alignItems: 'center',
                marginBottom: CustomSpacing(100),
              }}
              resizeMode="contain"
            />
          </VStack>

          <Text
            style={[
              componentStyle.text,
              {color: Colors.neutral90, textAlign: 'center'},
            ]}>
            {item.title}
          </Text>
          <VStack style={{margin: CustomSpacing(20)}}>
            <VStack style={{width: dimensions.screenWidth * 0.9}}>
              <Text
                style={[
                  {
                    color: Colors.neutral90,
                    textAlign: 'center',
                    ...Fonts.textL,
                  },
                ]}>
                {item.desc}
              </Text>
            </VStack>
            <Button
              style={{
                width: '100%',
                marginTop: CustomSpacing(36),
              }}
              onPress={() => {
                if (index === 2) {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'AuthStack'}],
                  });
                } else {
                  carouselRef.current.snapToNext();
                }
              }}>
              <Text style={{...Fonts.textMBold, color: Colors.neutral90}}>
                {item.btnText}
              </Text>
            </Button>
          </VStack>
        </VStack>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          backgroundColor: Colors.neutral10,
        },
        Layout.flex,
      ]}>
      <View style={[Layout.flexRowJustCenter]}>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={carouselItems}
          keyExtractor={(e, i) => `carousel-item-${i}`}
          sliderWidth={dimensions.screenWidth}
          itemWidth={dimensions.screenWidth}
          renderItem={renderItem}
          activeSlideAlignment="center"
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      <HStack style={componentStyle.paginationLayer}>
        <Pagination
          dotsLength={3}
          activeDotIndex={activeIndex}
          dotStyle={componentStyle.paginationDot}
          inactiveDotStyle={{
            backgroundColor: Colors.neutral50,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </HStack>
    </View>
  );
};

export default Onboarding;

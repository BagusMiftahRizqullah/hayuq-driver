import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {HStack} from '@components';
import {CustomSpacing} from '@styles';
import {StarIcon, EmptyStarIcon} from '@assets';

const RatingStar = ({rating, right, size, canRate}) => {
  return (
    <HStack right={right ?? CustomSpacing(0)}>
      {Array.from(Array(rating).keys()).map((item, index) => (
        <TouchableOpacity
          activeOpacity={canRate ? 0.8 : 1}
          onPress={() => {
            if (canRate) {
              switch (index) {
                case 0:
                  canRate(1);
                  break;
                case 1:
                  canRate(2);
                  break;
                case 2:
                  canRate(3);
                  break;
                case 3:
                  canRate(4);
                  break;
                case 4:
                  canRate(5);
                  break;
                default:
                  break;
              }
            } else {
              console.log('canRate is not defined');
            }
          }}>
          <Image
            key={index}
            source={StarIcon}
            style={{
              width: size,
              height: size,
              marginRight: CustomSpacing(2),
            }}
          />
        </TouchableOpacity>
      ))}
      {Array.from(Array(5 - rating).keys()).map((item, index) => (
        <TouchableOpacity
          activeOpacity={canRate ? 0.8 : 1}
          onPress={() => {
            if (canRate) {
              canRate(rating + index + 1);
            } else {
              console.log('canRate is not defined');
            }
          }}>
          <Image
            key={index}
            source={EmptyStarIcon}
            style={{
              width: size,
              height: size,
              marginRight: CustomSpacing(2),
            }}
          />
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

export default RatingStar;

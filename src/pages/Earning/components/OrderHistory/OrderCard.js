import React from 'react';
import {Text, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {dimensions} from '@config/Platform.config';
import Numbro from '@utils/numbro';
import { toJS } from 'mobx';

import {HStack, VStack, Spacer} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {EatyuqIcon, ShopyuqIcon} from '@assets';
import styles from './OrderHistory.style';

const OrderCard = ({data}) => {
  const componentStyles = styles();

  return (
    <VStack style={componentStyles.cardOrderContainer}>
      <HStack>
        <Image
          source={EatyuqIcon}
          style={{
            width: CustomSpacing(24),
            height: CustomSpacing(24),
          }}
        />
        <VStack style={{marginLeft: CustomSpacing(10), width: dimensions.screenWidth * 0.74}}>
          <HStack style={{ justifyContent: 'space-between' }}>
            <Text style={{...Fonts.textXs, marginRight: CustomSpacing(10)}}>
              {moment(data?.updated_at).format('DD MMM YYYY HH:mm')}
            </Text>
            <Text style={{...Fonts.textXss, color: Colors.neutral60}}>{data?.code}</Text>
          </HStack>
          <HStack style={{ justifyContent: 'space-between' }}>
            <VStack>
              <Text style={{...Fonts.textMBold, marginVertical: CustomSpacing(5)}}>
                {data?.details?.transactionsaddress?.merchants?.name}
              </Text>
              <Text style={{...Fonts.textM}}>
                Rp {Numbro.formatCurrency(data?.details?.price?.totaldelivery)}
              </Text>
            </VStack>
            <VStack style={{alignItems: 'center'}}>
                <Icon 
                  name="check-circle" 
                  size={16} 
                  style={{marginTop: CustomSpacing(10)}} 
                  color={Colors.successMain} 
                />
                <Text style={{...Fonts.textXs, marginTop: CustomSpacing(5)}}>
                  Completed
                </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>

    </VStack>
  );
};

export default OrderCard;

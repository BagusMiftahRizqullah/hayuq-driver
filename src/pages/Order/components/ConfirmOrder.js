import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {Layout, Fonts, CustomSpacing} from '@styles';
import {VStack, HStack} from '@components';
import moment from 'moment';
import {UserPhoto, StarIconOrder, MerchantIcon} from '@assets';
import t from '@lang';
import styles from '../Order.style';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

const ConfirmOrder = observer(({dataOrders}) => {
  const {mainStore} = useStores();
  const componentStyle = styles();

  console.log('HistoryDatas=>>>>>>>>>', dataOrders);
  return (
    <VStack style={[Layout.flex]}>
      {dataOrders?.map((items, index) => {
        <View style={componentStyle.cardOrder}>
          <HStack
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <HStack>
              <Image
                source={UserPhoto}
                style={{
                  width: CustomSpacing(40),
                  height: CustomSpacing(40),
                  marginRight: CustomSpacing(7),
                  borderRadius: CustomSpacing(100),
                }}
              />
              <VStack>
                <Text style={{...Fonts.textM, marginBottom: CustomSpacing(2)}}>
                  Rebheca
                </Text>
                <HStack>
                  <Image
                    source={StarIconOrder}
                    style={{
                      width: CustomSpacing(10),
                      height: CustomSpacing(10),
                      marginRight: CustomSpacing(5),
                    }}
                  />
                  <Text style={Fonts.textM}>5</Text>
                  <Text style={Fonts.textM}>(69)</Text>
                </HStack>
              </VStack>
            </HStack>
            <VStack>
              <Text style={componentStyle.labelTimeOreder}>00:10</Text>
            </VStack>
          </HStack>
          <HStack style={{marginTop: CustomSpacing(15)}}>
            <HStack style={{alignItems: 'flex-start'}}>
              <VStack>
                <Image
                  source={MerchantIcon}
                  style={{
                    width: CustomSpacing(22),
                    height: CustomSpacing(30),
                    marginRight: CustomSpacing(14),
                  }}
                />
              </VStack>
              <VStack style={Layout.flex}>
                <Text style={Fonts.textMBold}>
                  Pizza Lover’s Grand Caman Hotel
                </Text>
                <Text
                  style={{
                    ...Fonts.textM,
                    lineHeight: CustomSpacing(22),
                    marginTop: CustomSpacing(5),
                  }}>
                  Jl. Caman Raya No.88F, Jatibening Baru, Kec. Pd. Gede, Kota
                  Bekasi.
                </Text>
                <Text style={{...Fonts.textMBold, marginTop: CustomSpacing(5)}}>
                  {t('Income')}: 12.000
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </View>;
      })}
    </VStack>
  );
});

export default ConfirmOrder;

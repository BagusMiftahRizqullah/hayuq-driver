import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import t from '@lang';
import numbro from 'numbro';
// import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch, useSelector } from 'react-redux';

import {
  HStack,
  VStack,
  Button,
  // Spacer,
  // HeaderNavigation,
  ModalBottom,
} from '@components';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
// import {BcaIcon, MandiriIcon, BniIcon} from '@assets';

import {EARNING_ACTION} from '../../Earning.constant';
import styles from './TopUp.style';

const TopUp = ({isTopUp, onCloseTopUp}) => {
  const componentStyles = styles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { driverData } = useSelector((state) => state.main);
  // const [virtualAccount, setVirtualAccount] = useState('80002 0811234578');
  // const [isModalPayment, setIsModalPayment] = useState(false);
  // const [selectedPayment, setSelectedPayment] = useState(0);
  const [amountTopUp, setAmountTopUp] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templateTopUp = [
    {id: 1, amount: 50000},
    {id: 2, amount: 100000},
    {id: 3, amount: 150000},
    {id: 4, amount: 200000},
    {id: 5, amount: 250000},
    {id: 6, amount: 300000},
  ];

  const isDisabledBtn = amountTopUp >= 50000 ? false : true;

  const handleInputAmount = (value) => {
    setAmountTopUp(value?.toString());
  };

  const handleCloseTopUpModal = () => {
    onCloseTopUp();
    setAmountTopUp(0);
  }

  const handleSubmitTopUp = () => {
    const data = {
      drivers_id: driverData?.id ?? driverData?.drivers?.id,
      amount: parseInt(amountTopUp)
    }
    dispatch({
      type: EARNING_ACTION.TOP_UP_DANA,
      payload: data,
      meta: {
        success: function() {
          handleCloseTopUpModal();
          navigation.navigate('TopUpCheckout');
        }
      }
    })
  };

  const handleClickCardAmount = (id, amount) => {
    if (selectedTemplate === id) {
      handleInputAmount('');
      setSelectedTemplate('');
    } else {
      handleInputAmount(amount);
      setSelectedTemplate(id);
    }
  };

  useEffect(() => {
    const data = selectedTemplate && templateTopUp.filter((e) => e.id === selectedTemplate)[0];
    if (parseInt(amountTopUp) !== data.amount) {
      setSelectedTemplate('');
    }
  }, [amountTopUp]);

  // const handlePaymentMethod = () => {
  //   setIsModalPayment(!isModalPayment);
  // };

  // const dataPaymentMethod = [
  //   {
  //     id: 1,
  //     title: 'ATM',
  //   },
  //   {
  //     id: 2,
  //     title: 'Mobile Banking',
  //   },
  // ];

  // const bankData = [
  //   {
  //     id: 1,
  //     title: 'MBCA',
  //     icon: BcaIcon,
  //   },
  //   {
  //     id: 2,
  //     title: 'Mandiri - Mobile Banking',
  //     icon: MandiriIcon,
  //   },
  //   {
  //     id: 3,
  //     title: 'BNI - Mobile Banking',
  //     icon: BniIcon,
  //   },
  //   {
  //     id: 4,
  //     title: 'Bank lain - Mobile Banking',
  //     icon: BniIcon,
  //   },
  // ];

  // const goBackNavigation = () => {
  //   navigation.goBack();
  // };

  // const copyToClipboard = () => {
  //   Clipboard.setString(virtualAccount);
  // };

  return (
    // <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
    //   <HeaderNavigation title={t('Top Up')} goback onPress={goBackNavigation} />
    //   <VStack style={componentStyles.topUpContainer}>
    //     <VStack style={componentStyles.cardTopUp}>
    //       <Text style={{...Fonts.textS}}>Payyuq Balance</Text>
    //       <Text style={{...Fonts.textLBold}}>Rp. 500,00</Text>
    //     </VStack>
    //     {selectedPayment > 0 && (
    //       <>
    //         <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
    //           Virtual Account No.
    //         </Text>
    //         <VStack style={componentStyles.cardTopUp}>
    //           <HStack style={[Layout.flexFullBetween]}>
    //             <Text style={{...Fonts.textL}}>{virtualAccount}</Text>
    //             <Button
    //               onPress={copyToClipboard}
    //               style={{width: CustomSpacing(50)}}>
    //               <Text style={{...Fonts.textSBold}}>Copy</Text>
    //             </Button>
    //           </HStack>
    //         </VStack>
    //       </>
    //     )}

    //     <Text style={{...Fonts.textSBold, marginBottom: CustomSpacing(10)}}>
    //       {t('Payment Method')}
    //     </Text>
    //     {selectedPayment === 0 ? (
    //       dataPaymentMethod.map((item, index) => (
    //         <TouchableOpacity
    //           key={`payment-method-${index}`}
    //           onPress={handlePaymentMethod}
    //           activeOpacity={0.9}>
    //           <VStack style={componentStyles.cardList}>
    //             <HStack style={[Layout.flexFullBetween]}>
    //               <HStack>
    //                 <Icon name="bank" size={18} color={Colors.neutral70} />
    //                 <VStack left={CustomSpacing(10)}>
    //                   <Text style={{...Fonts.textMBold}}>{item.title}</Text>
    //                 </VStack>
    //               </HStack>
    //               <Icon
    //                 name="chevron-right"
    //                 size={10}
    //                 color={Colors.neutral70}
    //               />
    //             </HStack>
    //           </VStack>
    //         </TouchableOpacity>
    //       ))
    //     ) : (
    //       <>
    //         <VStack style={componentStyles.cardList}>
    //           <HStack style={[Layout.flexFullBetween]}>
    //             <HStack>
    //               <Image
    //                 source={BcaIcon}
    //                 style={{
    //                   width: CustomSpacing(22),
    //                   height: CustomSpacing(16),
    //                 }}
    //               />
    //               <VStack left={CustomSpacing(10)}>
    //                 <Text style={{...Fonts.textMBold}}>MBCA</Text>
    //               </VStack>
    //             </HStack>
    //             <TouchableOpacity
    //               activeOpacity={0.9}
    //               onPress={() => {
    //                 setSelectedPayment(0);
    //               }}>
    //               <Icon name="close" size={10} color={Colors.neutral70} />
    //             </TouchableOpacity>
    //           </HStack>
    //         </VStack>
    //       </>
    //     )}
    //     <ModalBottom
    //       onClose={handlePaymentMethod}
    //       isVisible={isModalPayment}
    //       type="bottom">
    //       <VStack padding={CustomSpacing(14)}>
    //         <HStack style={[Layout.flexFullBetween]} top={CustomSpacing(10)}>
    //           <Text style={{...Fonts.textSBold}}>Mobile Banking Option</Text>
    //           <TouchableOpacity onPress={handlePaymentMethod}>
    //             <Icon name="close" size={15} color={Colors.neutral70} />
    //           </TouchableOpacity>
    //         </HStack>
    //         <VStack vertical={CustomSpacing(10)}>
    //           {bankData.map((item, index) => (
    //             <TouchableOpacity
    //               key={`bank-data-${index}`}
    //               onPress={() => {
    //                 setSelectedPayment(item.id);
    //                 handlePaymentMethod();
    //               }}
    //               activeOpacity={0.9}>
    //               <VStack style={componentStyles.cardList}>
    //                 <HStack style={[Layout.flexFullBetween]}>
    //                   <HStack>
    //                     {index !== 3 ? (
    //                       <Image
    //                         source={item.icon}
    //                         style={{
    //                           width: CustomSpacing(22),
    //                           height: CustomSpacing(16),
    //                         }}
    //                       />
    //                     ) : (
    //                       <Icon
    //                         name="bank"
    //                         size={18}
    //                         color={Colors.neutral70}
    //                       />
    //                     )}
    //                     <VStack left={CustomSpacing(10)}>
    //                       <Text style={{...Fonts.textMBold}}>{item.title}</Text>
    //                     </VStack>
    //                   </HStack>
    //                   <Icon
    //                     name="chevron-right"
    //                     size={10}
    //                     color={Colors.neutral70}
    //                   />
    //                 </HStack>
    //               </VStack>
    //             </TouchableOpacity>
    //           ))}
    //         </VStack>
    //       </VStack>
    //     </ModalBottom>
    //   </VStack>
    //   <VStack style={componentStyles.topupBtn}>
    //     <Button onPress={goBackNavigation} disabled={selectedPayment === 0}>
    //       <Text style={{...Fonts.textMBold}}>{t('Done')}</Text>
    //     </Button>
    //   </VStack>
    // </View>

    <ModalBottom isVisible={isTopUp} onClose={handleCloseTopUpModal} type="bottom">
      <VStack style={componentStyles.container}>
        <HStack style={componentStyles.containerHeader}>
          <Text style={[Fonts.textLBold]}>Topup</Text>
          <Text onPress={handleCloseTopUpModal}>X</Text>
        </HStack>
        <Text style={componentStyles.textEnterAmount}>Enter Amount</Text>
        <TextInput
          value={amountTopUp}
          style={componentStyles.inputAmountTopUp}
          inputMode="numeric"
          keyboardType="numeric"
          onChangeText={handleInputAmount}
        />
        <Text
          style={[
            Fonts.captionS,
            {color: Colors.neutral60, marginTop: CustomSpacing(8)},
          ]}>
          *minimum top up Rp 50.000
        </Text>
        <HStack style={componentStyles.containerCardAmountTopUp}>
          {templateTopUp.map((value, index) => (
            <TouchableOpacity
              key={`amount-topup-${index}`}
              activeOpacity={0.8}
              style={[
                componentStyles.cardAmountTopUp,
                {
                  backgroundColor:
                    selectedTemplate === value.id
                      ? Colors.supportMain
                      : Colors.neutral10,
                },
              ]}
              onPress={() => handleClickCardAmount(value.id, value.amount)}>
              <Text
                style={[
                  Fonts.subhead,
                  {
                    marginRight: CustomSpacing(5),
                    color:
                      selectedTemplate === value.id
                        ? Colors.neutral10
                        : Colors.neutral100,
                  },
                ]}>
                Rp
              </Text>
              <Text
                style={[
                  Fonts.bodySemiBold,
                  {
                    color:
                      selectedTemplate === value.id
                        ? Colors.neutral10
                        : Colors.neutral100,
                  },
                ]}>
                {numbro(value.amount).format({thousandSeparated: true})}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>
        <Button 
          style={componentStyles.btnConfirmTopUp} 
          disabled={isDisabledBtn}
          onPress={handleSubmitTopUp}
        >
          <Text>Confirm & Top up</Text>
        </Button>
      </VStack>
    </ModalBottom>
  );
};

export default TopUp;

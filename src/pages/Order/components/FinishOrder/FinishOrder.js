import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  Pressable,
  BackHandler,
} from 'react-native';
import Numbro from '@utils/numbro';
import moment from 'moment';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import {
  VStack,
  HStack,
  Button,
  HeaderNavigation,
  RatingStar,
  Spacer,
} from '@components';
import {OrderCompletedIlustration} from '@assets';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import {useStores} from '@store/root.store';
import styles from './FinishOrder.style';
import {MAIN_CONSTANT} from '../../../Main/Main.constant';

const FinishOrder = observer(() => {
  const {mainStore, earningStore} = useStores();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const componentStyles = styles();
  const {driverData, isLoading} = useSelector((state) => state.main);
  const [ratingCustomer, setRatingCustomer] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [driverNotes, setDriverNotes] = useState('');

  const isFood = mainStore.currentOrderData?.type === 1;

  const [reviewCustomer, editReviewCostumer] = useState([
    {title: 'Fast Respond', active: false},
    {title: 'Precise location', active: false},
    {title: 'Excellent Communication', active: false},
    {title: 'Polite customer', active: false},
  ]);

  const transactionData = useMemo(() => {
    return !isFood
      ? mainStore.currentOrderData?.transactions?.prices.price
      : mainStore.currentOrderData?.transactions?.data;
  }, [mainStore.currentOrderData]);

  const handleRating = (index) => {
    setRatingCustomer(index);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
    mainStore.setCurrentOrderStatus('standby');
    mainStore.setOnGoingOrder(false);
    mainStore.setCurentOrderData(null);
  };

  const handleChangeReviewCostumer = (index) => {
    const clone = [...reviewCustomer];
    const editData = clone.filter((e, i) => i === index)[0];
    editData.active = !editData.active;
    editReviewCostumer(clone);
    const review = clone
      .filter((e) => e.active)
      .map((e) => e.title)
      .join(', ');
    setDriverNotes(`${review}, ${driverNotes}`);
  };

  const handleSubmitRating = () => {
    const data = {
      transactionId: !isFood
        ? mainStore.currentOrderData.transactions.transactions_id
        : transactionData.transactionsdrivers.transactions_id,
      rating: ratingCustomer,
      note: driverNotes,
    };
    mainStore.postRatingUser(data);
  };

  const handleUpdateEarning = () => {
    const data = {
      driverId: mainStore.driverId,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    };
    earningStore.getEarning(data);
  };

  const getDriverRewardData = () => {
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_REWARD,
      payload: {
        drivers_id: mainStore.driverId,
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      },
    });
  };

  const handleUpdateDriverData = () => {
    dispatch({
      type: MAIN_CONSTANT.GET_DRIVER_DETAIL,
      payload: driverData?.id ?? driverData?.drivers?.id,
    });
    handleUpdateEarning();
    getDriverRewardData();
    !isLoading && handleBackToHome();
  };

  useEffect(() => {
    if (mainStore.ratingUserData) {
      setOrderCompleted(true);
      mainStore.clearRatingUser();
    }
  }, [mainStore.ratingUserData]);

  useFocusEffect(
    useCallback(() => {
      const handleBack = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBack);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }, []),
  );

  return (
    <VStack style={[Layout.flex]}>
      <HeaderNavigation
        title={!orderCompleted ? 'Finish Order' : 'Order Completed'}
      />
      <ScrollView style={componentStyles.finishOrderContainer}>
        {orderCompleted && (
          <VStack
            style={{alignItems: 'center', marginBottom: CustomSpacing(30)}}
          >
            <Image
              source={OrderCompletedIlustration}
              style={{
                width: CustomSpacing(200),
                height: CustomSpacing(150),
              }}
            />
          </VStack>
        )}
        <VStack style={componentStyles.cardTotalIncome}>
          <Text style={{...Fonts.textLBold, color: Colors.neutral90}}>
            Total Income
          </Text>
          <VStack>
            <HStack style={componentStyles.containerTextIncome}>
              <Text style={[Fonts.textM, {lineHeight: CustomSpacing(35)}]}>
                Delivery Fee
              </Text>
              <Text style={[Fonts.textM]}>
                Rp.{' '}
                {Numbro.formatCurrency(
                  !isFood
                    ? transactionData?.total
                    : transactionData?.transactionsdrivers.total,
                )}
              </Text>
            </HStack>
            <HStack
              style={{
                ...componentStyles.containerTextIncome,
                borderBottomWidth: CustomSpacing(0.8),
                borderBottomColor: Colors.neutral40,
                paddingBottom: CustomSpacing(10),
              }}
            >
              <Text
                style={[
                  Fonts.textM,
                  {
                    lineHeight: CustomSpacing(30),
                  },
                ]}
              >
                {!isFood ? 'Platform Fee' : 'Platform Fee 20%'}
              </Text>
              <Text style={[Fonts.textM]}>
                <Text style={{color: Colors.dangerMain}}>-</Text> Rp.{' '}
                {Numbro.formatCurrency(
                  !isFood
                    ? transactionData?.platformsAppDrivers
                    : transactionData?.transactionsdrivers.platforms,
                )}
              </Text>
            </HStack>
            <HStack
              style={{
                ...componentStyles.containerTextIncome,
                marginTop: CustomSpacing(10),
              }}
            >
              <Text style={[Fonts.textLBold]}>Total</Text>
              <Text style={[Fonts.textLBold, {color: Colors.secondaryMain}]}>
                Rp.{' '}
                {Numbro.formatCurrency(
                  !isFood
                    ? transactionData?.total -
                        transactionData?.platformsAppDrivers
                    : transactionData?.transactionsdrivers.prices,
                )}
              </Text>
            </HStack>
          </VStack>
        </VStack>
        {!orderCompleted && (
          <>
            <VStack
              style={[Layout.flexCenter, {marginVertical: CustomSpacing(15)}]}
            >
              <Text style={[Fonts.textLBold, {lineHeight: CustomSpacing(27)}]}>
                How’s the Customer?
              </Text>
              <Text style={[Fonts.textS, {lineHeight: CustomSpacing(27)}]}>
                Relax, it not affected in your account
              </Text>
              <Spacer height={CustomSpacing(15)} />
              <RatingStar
                rating={ratingCustomer}
                size={30}
                canRate={(rate) => handleRating(rate)}
              />
            </VStack>
            <VStack>
              <Text style={[Fonts.textSBold, {marginTop: CustomSpacing(24)}]}>
                What makes the customer good?
              </Text>
              <HStack style={{marginTop: CustomSpacing(10), flexWrap: 'wrap'}}>
                {reviewCustomer.map((e, i) => (
                  <Pressable
                    onPress={() => handleChangeReviewCostumer(i)}
                    key={`list-review-customer-${i}`}
                  >
                    <View
                      style={{
                        ...componentStyles.cardReview,
                        marginRight: CustomSpacing(10),
                        marginTop: CustomSpacing(16),
                        backgroundColor: e.active
                          ? Colors.secondaryMain
                          : Colors.neutral10,
                      }}
                    >
                      <Text
                        style={[
                          Fonts.textSBold,
                          {
                            color: e.active
                              ? Colors.neutral10
                              : Colors.neutral90,
                          },
                        ]}
                      >
                        {e.title}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </HStack>
            </VStack>
            <VStack>
              <Text
                style={[Fonts.textSBold, {marginVertical: CustomSpacing(15)}]}
              >
                Notes for customer
              </Text>
              <TextInput
                placeholder="Type Something"
                style={[
                  componentStyles.inputStyle,
                  {height: CustomSpacing(80), textAlignVertical: 'top'},
                ]}
                value={driverNotes}
                onChangeText={(text) => setDriverNotes(text)}
              />
            </VStack>
          </>
        )}
        {!orderCompleted && (
          <Button
            disabled={ratingCustomer === 0}
            isSubmitting={mainStore.ratingUserLoading}
            onPress={handleSubmitRating}
            style={{
              marginBottom: CustomSpacing(30),
              marginTop: CustomSpacing(55),
            }}
          >
            <Text style={Fonts.textLBold}>Continue</Text>
          </Button>
        )}
      </ScrollView>
      {orderCompleted && (
        <VStack style={componentStyles.containerBottomBtn}>
          <Button
            onPress={handleUpdateDriverData}
            style={{
              marginBottom: CustomSpacing(30),
              marginTop: CustomSpacing(55),
            }}
          >
            <Text style={Fonts.textLBold}>Back to Home</Text>
          </Button>
        </VStack>
      )}
    </VStack>
  );
});

export default FinishOrder;

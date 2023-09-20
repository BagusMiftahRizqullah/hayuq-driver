import {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import {
  VStack,
  HStack,
  Button,
  RatingStar,
  Spacer,
  ModalBottom,
} from '@components';
import {CakeIcon} from '@assets';
import styles from './FinishOrder.style';

const ModalReviewRestaurant = ({
  ratingRestaurant,
  onRatingRestaurant,
  handleCloseReviewRestaurant,
  setOrderCompleted,
  setOnRatingRestaurant,
}) => {
  const componentStyles = styles();

  const [reviewRestaurant, editReviewRestaurant] = useState([
    {title: 'Fast Respond', active: false},
    {title: 'Precise location', active: false},
    {title: 'Excellent Communication', active: false},
    {title: 'Polite customer', active: false},
  ]);

  const handleSendReviewRestaurant = () => {
    setOrderCompleted(true);
    setOnRatingRestaurant(false);
  };

  const handleChangeReviewCostumer = (index) => {
    const clone = [...reviewRestaurant];
    const editData = clone.filter((e, i) => i === index)[0];
    editData.active = !editData.active;
    editReviewRestaurant(clone);
  };

  return (
    <ModalBottom
      onClose={handleCloseReviewRestaurant}
      isVisible={onRatingRestaurant}
      type="bottom">
      <ScrollView>
        <View
          style={{
            ...componentStyles.cardTotalIncome,
            marginHorizontal: CustomSpacing(16),
            marginTop: CustomSpacing(16),
          }}>
          <HStack style={{alignItems: 'flex-start'}}>
            <Image
              source={CakeIcon}
              style={{
                width: CustomSpacing(20),
                height: CustomSpacing(20),
                marginRight: CustomSpacing(15),
              }}
            />
            <VStack style={{flex: 1}}>
              <Text style={[Fonts.textMBold, {marginBottom: CustomSpacing(5)}]}>
                Pizza Lover’s Grand Caman Hotel
              </Text>
              <Text
                style={[
                  Fonts.textS,
                  {color: Colors.neutral70, lineHeight: CustomSpacing(25)},
                ]}>
                Jl. Caman Raya No.88F, Jatibening Baru, Kec. Pd. Gede, Kota
                Bekasi.
              </Text>
            </VStack>
          </HStack>
        </View>
        <VStack style={{marginHorizontal: CustomSpacing(16)}}>
          <VStack
            style={[Layout.flexCenter, {marginVertical: CustomSpacing(15)}]}>
            <Text style={[Fonts.textLBold, {lineHeight: CustomSpacing(27)}]}>
              How’s the Restaurant?
            </Text>
            <Text style={[Fonts.textS, {lineHeight: CustomSpacing(27)}]}>
              Relax, it not affected in your account
            </Text>
            <Spacer height={CustomSpacing(15)} />
            <RatingStar rating={ratingRestaurant} size={30} />
          </VStack>
          <VStack>
            <Text style={[Fonts.textSBold, {marginTop: CustomSpacing(24)}]}>
              What makes the customer good?
            </Text>
            <HStack style={{marginTop: CustomSpacing(10), flexWrap: 'wrap'}}>
              {reviewRestaurant.map((e, i) => (
                <Pressable
                  key={`list-review-customer-${i}`}
                  onPress={() => handleChangeReviewCostumer(i)}>
                  <View
                    style={{
                      ...componentStyles.cardReview,
                      marginRight: CustomSpacing(10),
                      marginTop: CustomSpacing(16),
                      backgroundColor: e.active
                        ? Colors.secondaryMain
                        : Colors.neutral10,
                    }}>
                    <Text
                      style={[
                        Fonts.textSBold,
                        {
                          color: e.active ? Colors.neutral10 : Colors.neutral90,
                        },
                      ]}>
                      {e.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </HStack>
          </VStack>
          <VStack>
            <Text
              style={[Fonts.textSBold, {marginVertical: CustomSpacing(15)}]}>
              Notes for customer
            </Text>
            <TextInput
              placeholder="Type Something"
              style={[componentStyles.inputStyle, {height: CustomSpacing(80)}]}
            />
          </VStack>
          <Button
            onPress={handleSendReviewRestaurant}
            style={{
              marginBottom: CustomSpacing(30),
              marginTop: CustomSpacing(10),
            }}>
            <Text style={Fonts.textLBold}>Send</Text>
          </Button>
        </VStack>
      </ScrollView>
    </ModalBottom>
  );
};

export default ModalReviewRestaurant;

import React, {useState} from 'react';
import {View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@config';
import {Layout, Colors} from '@styles';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';

import OnGoingFoodDeliveryModal from './OnGoingFoodDeliveryModal';
import OnGoingPickyuqModal from './OnGoingPickyuqModal';
import MapsOrder from './MapsOrder';

Geocoder.init(GOOGLE_API_KEY);

const OnGoingOrder = observer(() => {
  const {mainStore} = useStores();
  const [distanceOrder, setDistanceOrder] = useState(0);
  const [estimateTime, setEstimateTime] = useState(0);

  const isFood = mainStore.currentOrderData.type === 1;

  const handleDistanceTime = (res) => {
    setDistanceOrder(res.distance);
    setEstimateTime(res.duration);
  };

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <MapsOrder handleDistanceTime={handleDistanceTime} />
      {isFood ? <OnGoingFoodDeliveryModal /> : <OnGoingPickyuqModal />}
    </View>
  );
});

export default OnGoingOrder;

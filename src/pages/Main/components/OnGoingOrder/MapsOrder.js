import React, {useState, useMemo, useEffect} from 'react';
import {Text, Linking, ScrollView, LogBox} from 'react-native';
import t from '@lang';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import {GOOGLE_API_KEY} from '@config';
import MapViewDirections from 'react-native-maps-directions';

import {VStack, HStack, Button, Spacer} from '@components';
import {Layout, Colors, CustomSpacing, Fonts} from '@styles';
import {MAIN_CONSTANT} from '../../Main.constant';
import {observer} from 'mobx-react-lite';
import {useStores} from '@store/root.store';
import styles from './OnGoingOrder.style';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver`',
  'Warning: Failed prop type:',
]);

Logger.setLogCallback((log) => {
  const {message} = log;
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

const MapsOrder = observer(({handleDistanceTime}) => {
  const {mainStore} = useStores();
  const dispatch = useDispatch();
  const {location} = useSelector((state) => state.main);
  const componentStyles = styles();
  const [recenter, setRecenter] = useState('compass');
  const [geoRouteJson, setGeoRouteJson] = useState([]);

  // const merchantLocation = useMemo(() => {
  //   return {
  //     latitude: mainStore.currentOrderData?.latitude,
  //     longitude: mainStore.currentOrderData?.longitude,
  //   };
  // }, [mainStore.currentOrderData]);

  const merchantLocation = useMemo(() => {
    return {
      latitude: Number(
        mainStore?.currentOrderData?.transactions?.data?.transactionsaddress
          .merchants.location.location[0].cordinates[0] ?? 0,
      ),
      longitude: Number(
        mainStore?.currentOrderData?.transactions?.data?.transactionsaddress
          .merchants.location.location[0]?.cordinates[1] ?? 0,
      ),
    };
  }, [mainStore.currentOrderData]);

  const userLocation = useMemo(() => {
    return {
      latitude: Number(
        mainStore.currentOrderData?.transactions?.data?.delivery?.lat,
      ),
      longitude: Number(
        mainStore.currentOrderData?.transactions?.data?.delivery?.long,
      ),
    };
  }, [mainStore.currentOrderData]);

  useEffect(() => {
    MapboxGL.locationManager.start();
    return () => {
      MapboxGL.locationManager.stop();
    };
  }, []);

  return (
    <>
      {/* {Platform.OS === 'ios' && <Spacer height={CustomSpacing(32)} />} */}
      <MapboxGL.MapView
        localizeLabels={true}
        onDidFinishLoadingMap={() => {
          setRecenter('course');
        }}
        key="mainmap"
        styleURL={'mapbox://styles/mapbox/streets-v11'}
        style={{
          // flex: 1,
          height: '50%',
        }}
        logoEnabled={false}
        attributionEnabled={false}
        showUserLocation={true}
      >
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [location.longitude, location.latitude],
            zoomLevel: 13.5,
          }}
          followZoomLevel={13.5}
          followPitch={0}
          animationMode="flyTo"
          animationDuration={400}
          centerCoordinate={[location.longitude + 0.2, location.latitude]}
          zoomLevel={13.5}
          followUserLocation
          triggerKey={location.longitude}
          followUserMode={recenter}
          allowUpdates={true}
        />
        <MapViewDirections
          origin={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          destination={{
            latitude: merchantLocation.latitude,
            longitude: merchantLocation.longitude,
          }}
          apikey={GOOGLE_API_KEY}
          strokeWidth={4}
          strokeColor={Colors.primaryMain}
          mode="DRIVING"
          onReady={(result) => {
            handleDistanceTime(result);
            const path = result.coordinates.map((item) => {
              return [item.longitude, item.latitude];
            });
            setGeoRouteJson(path);
          }}
        />
        <MapboxGL.ShapeSource
          id="routeSource"
          shape={{
            type: 'LineString',
            coordinates: geoRouteJson,
          }}
        >
          <MapboxGL.LineLayer
            id="routeFill"
            style={{
              lineColor: Colors.primaryMain,
              lineWidth: 5,
              lineCap: MapboxGL.LineJoin.Round,
              lineOpacity: 1,
            }}
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.UserLocation
          visible
          animated
          renderMode={'normal'}
          showsUserHeadingIndicator
          androidRenderMode={'normal'}
          minDisplacement={100}
          onUpdate={(position) => {
            dispatch({
              type: MAIN_CONSTANT.GET_LOCATION_SUCCESS,
              payload: {
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
              },
            });
          }}
        />
        <MapboxGL.PointAnnotation
          selected={true}
          key="key2"
          id="id2"
          coordinate={[merchantLocation.longitude, merchantLocation.latitude]}
        >
          <MapboxGL.Callout title="User" />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>

      {/* <VStack style={componentStyles.recenterBtn}>
        <Button
          style={{
            width: CustomSpacing(120),
            backgroundColor: Colors.successMain,
          }}
          onPress={() => {
            Linking.openURL(
              googleMapOpenUrl({
                latitude: mainStore.currentOrderData.latitude,
                longitude: mainStore.currentOrderData.longitude,
              }),
            );
          }}>
          <HStack>
            <Text
              style={{
                ...Fonts.textSBold,
                color: Colors.neutral10,
              }}>
              Navigation
            </Text>
            <Spacer width={CustomSpacing(10)} />
            <Icon name="location-arrow" size={15} color={Colors.neutral10} />
          </HStack>
        </Button>
      </VStack> */}
      <VStack style={componentStyles.emergencyBtn}>
        <Button
          style={{
            width: CustomSpacing(120),
            backgroundColor: Colors.dangerMain,
          }}
        >
          <HStack>
            <Text
              style={{
                ...Fonts.textSBold,
                color: Colors.neutral10,
              }}
            >
              Emergency
            </Text>
            <Spacer width={CustomSpacing(10)} />
            <Icon name="phone" size={15} color={Colors.neutral10} />
          </HStack>
        </Button>
      </VStack>
    </>
  );
});

export default MapsOrder;

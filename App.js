import React, {useEffect} from 'react';
import MainNavigator from '@route';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import * as Sentry from '@sentry/react-native';

import store, {persistor} from '@store';
import {StoreProvider} from '@store/root.store';
import NotificationController from './src/utils/NotificationController';
import InAppUpdate from './InAppUpdate';

Sentry.init({
  dsn: 'https://a77c91eabc3f4987dfcdcf931aa208d4@o1316409.ingest.sentry.io/4505683881951232',
});

const App = () => {
  useEffect(() => {
    console.log('appCheckInAppUpdate', InAppUpdate.checkUpdate());
    InAppUpdate.checkUpdate();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StoreProvider>
          <NotificationController />
          <MainNavigator />
        </StoreProvider>
      </PersistGate>
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(codePushOptions)(Sentry.wrap(App));

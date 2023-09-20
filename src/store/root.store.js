import React, {createContext, useContext, useState} from 'react';
import {configure} from 'mobx';
import {persist, create} from 'mobx-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainStore} from '@pages/Main/Main.store';
import {EarningStore} from '@pages/Earning/Earning.store';
import {ProfileStore} from '@pages/Profile/Profile.store';
import {PeformanceStore} from '../pages/Earning/components/Performance/Peformance.store';
import {ChatStore} from '../pages/Chat/Chat.store'

configure({
  enforceActions: 'never',
});
const hydrate = create({
  storage: AsyncStorage,
});
export class RootStore {
  mainStore = new MainStore(this);
  earningStore = new EarningStore(this);
  profileStore = new ProfileStore(this);
  PeformanceStore = new PeformanceStore(this);
  chatStore = new ChatStore(this);

  constructor() {
    Promise.all([hydrate('mainStore', this.mainStore)]).then((e) => {
      console.info('HYDRATE SUCCESS', e);
    });
  }
}
export const RootsStoreContext = createContext(new RootStore());

export const useStores = () => useContext(RootsStoreContext);

export const StoreProvider = ({children}) => {
  const [store] = useState(() => new RootStore());
  return (
    <RootsStoreContext.Provider value={store}>
      {children}
    </RootsStoreContext.Provider>
  );
};

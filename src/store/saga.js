import {all} from 'redux-saga/effects';
import authSaga from '../pages/Auth/Auth.saga';
import registerProcessSaga from '../pages/Auth/components/Register/RegistrationProcess/RegistrationProcess.saga';
import mainSaga from '../pages/Main/Main.saga';
import settingSaga from '../pages/Profile/components/Setting/Setting.saga';
import earningSaga from '../pages/Earning/Earning.saga';

import {masterSaga} from '../config/masterData';

export default function* rootSaga() {
  yield all([
    authSaga(),
    registerProcessSaga(),
    masterSaga(),
    mainSaga(),
    settingSaga(),
    earningSaga(),
  ]);
}

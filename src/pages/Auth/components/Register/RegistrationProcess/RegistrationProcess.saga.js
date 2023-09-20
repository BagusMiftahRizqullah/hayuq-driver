import {takeLatest, put, takeEvery} from 'redux-saga/effects';
import {
  apiAddProfile,
  apiAddIdCard,
  addLicenseDriving,
  apiAddVehicle,
  apiAddSkck,
  apiAddBanks,
} from './RegistrationProcess.api';
import {apiGetDriverDetail} from '../../../../Main/Main.api'
import {REGISTER_PROCESS} from './RegistrationProcess.constant';

function* addDataProfile(action) {
  try {
    const res = yield apiAddProfile(action.payload);
    console.log('add profile', res);
    if (res && res.data.data.driverprofile) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_PROFILE_SUCCESS,
        payload: res.data.data.driverprofile,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_PROFILE_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_PROFILE_FAILED});
    action.meta.failed()
  }
}

function* addDataIdCard(action) {
  try {
    const res = yield apiAddIdCard(action.payload);
    console.log('id card', res);
    if (res && res.data.code === 200) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_IDCARD_SUCCESS,
        payload: res.data.data.driverdetails,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_IDCARD_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_IDCARD_FAILED});
    action.meta.failed()
  }
}

function* addDataLicense(action) {
  try {
    const res = yield addLicenseDriving(action.payload);
    console.log('data license', res);
    if (res && res.data.code === 200) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_LICENSE_SUCCESS,
        payload: res.data.data.driverlicense,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_LICENSE_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_LICENSE_FAILED});
    action.meta.failed()
  }
}

function* addDataVehicle(action) {
  try {
    const res = yield apiAddVehicle(action.payload);
    console.log('data vehicle', res);
    if (res && res.data.code === 200) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_VEHICLE_SUCCESS,
        payload: res.data.data.drivervehicles,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_VEHICLE_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_VEHICLE_FAILED});
    action.meta.failed()
  }
}

function* addDataSkck(action) {
  try {
    const res = yield apiAddSkck(action.payload);
    console.log('data skck', res);
    if (res && res.data.code === 200) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_SKCK_SUCCESS,
        payload: res.data.data.driverskck,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_SKCK_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_SKCK_FAILED});
    action.meta.failed()
  }
}

function* addDataBank(action) {
  try {
    const res = yield apiAddBanks(action.payload);
    console.log('data bank', res);
    if (res && res.data.code === 200) {
      yield put({
        type: REGISTER_PROCESS.REGISTER_ADD_BANK_SUCCESS,
        payload: res.data.data.driverbanks,
      });
      action.meta.success()
    } else {
      yield put({type: REGISTER_PROCESS.REGISTER_ADD_BANK_FAILED});
      action.meta.failed()
    }
  } catch (err) {
    yield put({type: REGISTER_PROCESS.REGISTER_ADD_BANK_FAILED});
    action.meta.failed()
  }
}

function* loadExistDocument(action) {
  try {
    const res = yield apiGetDriverDetail(action.payload)
    console.log('get exist doc', res);
    if (res.data.data && res.data.code === 200) {
      yield put({ type: REGISTER_PROCESS.LOAD_EXIST_DOCUMENT_SUCCESS, payload: res.data.data })
    } else {
      yield put({ type: REGISTER_PROCESS.LOAD_EXIST_DOCUMENT_FAILED })
    }
  } catch(err) {
    yield put({ type: REGISTER_PROCESS.LOAD_EXIST_DOCUMENT_FAILED })
  } 
}

function* registerProcessSaga() {
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_PROFILE, addDataProfile);
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_IDCARD, addDataIdCard);
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_LICENSE, addDataLicense);
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_VEHICLE, addDataVehicle);
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_SKCK, addDataSkck);
  yield takeLatest(REGISTER_PROCESS.REGISTER_ADD_BANK, addDataBank);
  yield takeLatest(REGISTER_PROCESS.LOAD_EXIST_DOCUMENT, loadExistDocument);
}

export default registerProcessSaga;

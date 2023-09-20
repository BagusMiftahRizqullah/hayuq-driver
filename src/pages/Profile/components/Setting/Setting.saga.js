import {takeLatest, put, take} from 'redux-saga/effects';
import {
  apiChangeBankAccount, 
  apiChangeVehicleInfo, 
  apiChangePhoneNumber,
  apiChangeEmail,
  apiDeleteAccount,
} from './Setting.api';
import {SETTING_CONSTANT} from './Setting.constant';
import {MAIN_CONSTANT} from '../../../Main/Main.constant';

function* changeBankAccount(action) {
  const res = yield apiChangeBankAccount(action.payload);
  console.log('res change bank', res);
  try {
    if (res.data.code === 200) {
      yield put({
        type: SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_SUCCESS,
      });
      yield put({
        type: MAIN_CONSTANT.SET_DRIVER_DETAIL,
        payload: res.data.data,
      });
      action.meta.success()
    } else {
      yield put({
        type: SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_FAILED,
        payload: err,
      });
      action.meta.failed()
    }
  } catch (err) {
    yield put({
      type: SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_FAILED,
      payload: err,
    });
  }
}

function* changeVehicleInfo(action) {
  try {
    const res = yield apiChangeVehicleInfo(action.payload)
    if (res.data.code === 200) {
      yield put({ type: SETTING_CONSTANT.CHANGE_VEHICLE_INFO_SUCCESS })
      action.meta.success()
    } else {
      yield put({ type: SETTING_CONSTANT.CHANGE_VEHICLE_INFO_FAILED })
      action.meta.failed()
    }
  } catch(err) {
    yield put({ type: SETTING_CONSTANT.CHANGE_VEHICLE_INFO_FAILED })
  }
}

function* changePhoneNumber(action) {
  try {
    const res = yield apiChangePhoneNumber(action.payload)
    if (res.data.code === 200) {
      yield put({ type: SETTING_CONSTANT.CHANGE_PHONE_NUMBER_SUCCESS })
      action.meta.success()
    } else {
      yield put({ type: SETTING_CONSTANT.CHANGE_PHONE_NUMBER_FAILED })
      action.meta.failed()
    }
  } catch {
    yield put({ type: SETTING_CONSTANT.CHANGE_PHONE_NUMBER_FAILED })
  }
}

function* changeEmail(action) {
  try {
    const res = yield apiChangeEmail(action.payload)
    if (res.data.code === 200) {
      yield put({ type: SETTING_CONSTANT.CHANGE_EMAIL_SUCCESS })
      action.meta.success()
    } else {
      yield put({ type: SETTING_CONSTANT.CHANGE_EMAIL_FAILED })
      action.meta.failed()
    }
  } catch {
    yield put({ type: SETTING_CONSTANT.CHANGE_EMAIL_FAILED })
  }
}

function* deleteAccount(action) {
  try {
    const res = yield apiDeleteAccount(action.payload)
    if (res.data.code === 200) {
      yield put({ type: SETTING_CONSTANT.DELETE_ACCOUNT_SUCCESS })
      action.meta.success()
    } else {
      yield put({ type: SETTING_CONSTANT.DELETE_ACCOUNT_FAILED })
      action.meta.failed()
    }
  } catch {
    yield put({ type: SETTING_CONSTANT.DELETE_ACCOUNT_FAILED })
    action.meta.failed()
  }
}

function* settingSaga() {
  yield takeLatest(SETTING_CONSTANT.CHANGE_BANK_ACCOUNT, changeBankAccount);
  yield takeLatest(SETTING_CONSTANT.CHANGE_VEHICLE_INFO, changeVehicleInfo);
  yield takeLatest(SETTING_CONSTANT.CHANGE_PHONE_NUMBER, changePhoneNumber);
  yield takeLatest(SETTING_CONSTANT.CHANGE_EMAIL, changeEmail);
  yield takeLatest(SETTING_CONSTANT.DELETE_ACCOUNT, deleteAccount);
}

export default settingSaga;

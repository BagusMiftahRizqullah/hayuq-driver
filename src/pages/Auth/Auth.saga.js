import AsyncStorage from '@react-native-async-storage/async-storage';
import {takeLatest, put} from 'redux-saga/effects';
import {
  apiLogin,
  apiRegister,
  apiVerifyOtp,
  apiListDocumentRejected,
} from './Auth.api';
import {AUTH_CONSTANT} from './Auth.constant';
import {MAIN_CONSTANT} from '@pages/Main/Main.constant';

function* loginDriver(action) {
  console.log('Goo Login', action);
  const res = yield apiLogin(action.payload);
  try {
    if (res && res.data.code === 200) {
      console.log('Goo SET_DRIVER_DATA', res.data.data);
      yield put({type: AUTH_CONSTANT.LOGIN_SUCCESS, payload: res.data.data});
      yield put({type: MAIN_CONSTANT.SET_DRIVER_DATA, payload: res.data.data});
    } else {
      yield put({type: AUTH_CONSTANT.LOGIN_FAILURE, payload: res.data});
    }
  } catch (err) {
    yield put({type: AUTH_CONSTANT.LOGIN_FAILURE, payload: err});
  }
}

function* registerDriver(action) {
  try {
    const res = yield apiRegister(action.payload);
    console.log('register driver', res);
    if (res && res.data.code === 200) {
      yield put({type: AUTH_CONSTANT.REGISTER_SUCCESS, payload: res.data.data});
      yield put({type: MAIN_CONSTANT.SET_DRIVER_DATA, payload: res.data.data});
    } else {
      yield put({
        type: AUTH_CONSTANT.REGISTER_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({type: AUTH_CONSTANT.REGISTER_FAILED, payload: err});
  }
}

function* verifyMissCallNumber(action) {
  try {
    const res = yield apiVerifyOtp(action.payload);
    console.log('verivOTPMiscall', res);
    if (res && res.data.code === 200) {
      yield put({
        type: AUTH_CONSTANT.VERIFY_OTP_SUCCESS,
        payload: res.data.data.drivers ?? res.data.data.response.drivers,
      });
      yield put({
        type: MAIN_CONSTANT.SET_DRIVER_DATA,
        payload: res.data.data.drivers ?? res.data.data.response.drivers,
      });
      AsyncStorage.setItem(
        'TOKEN',
        res.data.data.tokens.tokensjwt ??
          res.data.data.response.tokens.tokensjwt,
      );
      AsyncStorage.setItem(
        'REFRESHTOKEN',
        res.data.data.tokens.tokenjwtrefresh ??
          res.data.data.response.tokens.tokenjwtrefresh,
      );
      action.meta.success();
    } else {
      yield put({
        type: AUTH_CONSTANT.VERIFY_OTP_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({type: AUTH_CONSTANT.VERIFY_OTP_FAILED, payload: err});
  }
}

function* getDocumentRejected(action) {
  try {
    const res = yield apiListDocumentRejected(action.payload);
    if (res.data.code === 200) {
      yield put({
        type: AUTH_CONSTANT.GET_DOCUMENT_REJECTED_SUCCESS,
        payload: res.data.data,
      });
      action.meta.success(res.data.data);
    } else {
      yield put({type: AUTH_CONSTANT.GET_DOCUMENT_REJECTED_FAILED});
    }
  } catch {
    yield put({type: AUTH_CONSTANT.GET_DOCUMENT_REJECTED_FAILED});
  }
}

function* authSaga() {
  yield takeLatest(AUTH_CONSTANT.LOGIN, loginDriver);
  yield takeLatest(AUTH_CONSTANT.REGISTER, registerDriver);
  yield takeLatest(AUTH_CONSTANT.VERIFY_OTP, verifyMissCallNumber);
  yield takeLatest(AUTH_CONSTANT.GET_DOCUMENT_REJECTED, getDocumentRejected);
}

export default authSaga;

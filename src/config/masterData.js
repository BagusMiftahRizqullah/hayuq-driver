import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {backendApiURL, backendURLPartner} from '@config';

const apiGetVehicle = () => {
  return axios({
    method: 'GET',
    url: backendApiURL + '/master/vehicles-type',
  });
};

const apiGetBank = () => {
  return axios({
    method: 'GET',
    url: backendURLPartner + '/master/banks-type',
  });
};

const apiReqOtpEmail = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/otp/request',
    data
  })
}

const apiVerifyOtpEmail = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/otp/verify',
    data
  })
}

const MASTER_ACTION = {
  MASTER_GET_BANK: 'MASTER_GET_BANK',
  MASTER_GET_BANK_SUCCESS: 'MASTER_GET_BANK_SUCCESS',
  MASTER_GET_BANK_FAILED: 'MASTER_GET_BANK_FAILED',

  MASTER_GET_VEHIVLES: 'MASTER_GET_VEHIVLES',
  MASTER_GET_VEHIVLES_SUCCESS: 'MASTER_GET_VEHIVLES_SUCCESS',
  MASTER_GET_VEHIVLES_FAILED: 'MASTER_GET_VEHIVLES_FAILED',

  CREATE_OTP_EMAIL: 'CREATE_OTP_EMAIL',
  CREATE_OTP_EMAIL_SUCCESS: 'CREATE_OTP_EMAIL_SUCCESS',
  CREATE_OTP_EMAIL_FAILED: 'CREATE_OTP_EMAIL_FAILED',

  VERIFY_OTP_EMAIL: 'VERIFY_OTP_EMAIL',
  VERIFY_OTP_EMAIL_SUCCESS: 'VERIFY_OTP_EMAIL_SUCCESS',
  VERIFY_OTP_EMAIL_FAILED: 'VERIFY_OTP_EMAIL_FAILED',
};

const initialState = {
  dataListBanks: [],
  dataListVehicle: [],

  resSuccessVerifyOTPEmail: {},

  isLoading: false,
};

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- GET BANK -------------------
    case MASTER_ACTION.MASTER_GET_BANK: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case MASTER_ACTION.MASTER_GET_BANK_SUCCESS:
      return {
        ...state,
        dataListBanks: action.payload,
        isLoading: false,
      };
    case MASTER_ACTION.MASTER_GET_BANK_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- GET VEHICLE -------------------
    case MASTER_ACTION.MASTER_GET_VEHIVLES:
      return {
        ...state,
        isLoading: true,
      };
    case MASTER_ACTION.MASTER_GET_VEHIVLES_SUCCESS:
      return {
        ...state,
        dataListVehicle: action.payload,
        isLoading: false,
      };
    case MASTER_ACTION.MASTER_GET_VEHIVLES_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // req otp email
    case MASTER_ACTION.CREATE_OTP_EMAIL:
      return {
        ...state,
        isLoading: true,
      }
    case MASTER_ACTION.CREATE_OTP_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case MASTER_ACTION.CREATE_OTP_EMAIL_FAILED: 
    return {
      ...state,
      isLoading: false,
    }
    // verify otp email
    case MASTER_ACTION.VERIFY_OTP_EMAIL:
      return {
        ...state, 
        isLoading: true,
      }
    case MASTER_ACTION.VERIFY_OTP_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resSuccessVerifyOTPEmail: action.payload,
      }
    case MASTER_ACTION.VERIFY_OTP_EMAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};

function* addListDataMasterBank() {
  try {
    const res = yield apiGetBank();
    if (res && res.data.data) {
      yield put({
        type: MASTER_ACTION.MASTER_GET_BANK_SUCCESS,
        payload: res.data.data,
      });
    } else {
      yield put({type: MASTER_ACTION.MASTER_GET_BANK_FAILED});
    }
  } catch (err) {
    yield put({type: MASTER_ACTION.MASTER_GET_BANK_FAILED});
  }
}

function* addListDataMasterVehicle() {
  try {
    const res = yield apiGetVehicle();
    if (res && res.data.data) {
      yield put({
        type: MASTER_ACTION.MASTER_GET_VEHIVLES_SUCCESS,
        payload: res.data.data,
      });
    } else {
      yield put({type: MASTER_ACTION.MASTER_GET_VEHIVLES_FAILED});
    }
  } catch (err) {
    yield put({type: MASTER_ACTION.MASTER_GET_VEHIVLES_FAILED});
  }
}

function* reqOtpEmail(action) {
  try {
    const res = yield apiReqOtpEmail(action.payload)
    if (res.data.code === 200) {
      yield put({ type: MASTER_ACTION.CREATE_OTP_EMAIL_SUCCESS })
    } else {
      yield put({ type: MASTER_ACTION.CREATE_OTP_EMAIL_FAILED })
    }
  } catch(err) {
    yield put({ type: MASTER_ACTION.CREATE_OTP_EMAIL_FAILED })
  }
}

function* verifyOtpEmail(action) {
  try {
    const res = yield apiVerifyOtpEmail(action.payload)
    console.log('verify otp', res);
    if (res && res.data.code === 200) {
      yield put({ type: MASTER_ACTION.VERIFY_OTP_EMAIL_SUCCESS, payload: res.data.messages })
      action.meta.success();
    } else {
      yield put({ type: MASTER_ACTION.VERIFY_OTP_EMAIL_FAILED })
      action.meta.failed();
    }
  } catch(err) {
    yield put({ type: MASTER_ACTION.VERIFY_OTP_EMAIL_FAILED })
  }
}

function* masterSaga() {
  yield takeLatest(MASTER_ACTION.MASTER_GET_BANK, addListDataMasterBank);
  yield takeLatest(MASTER_ACTION.MASTER_GET_VEHIVLES, addListDataMasterVehicle);
  yield takeLatest(MASTER_ACTION.CREATE_OTP_EMAIL, reqOtpEmail);
  yield takeLatest(MASTER_ACTION.VERIFY_OTP_EMAIL, verifyOtpEmail);
}

export {MASTER_ACTION, masterReducer, masterSaga};

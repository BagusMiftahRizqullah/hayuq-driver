import AsyncStorage from '@react-native-async-storage/async-storage';
import {takeLatest, put, take} from 'redux-saga/effects';
import {
  apiGetDriverDetail,
  apiUpdateDriverLocation,
  apiDriverGoingOffline,
  apiGetDriverStatus,
  apiGetRewardPoint,
  apiSuspendAccount,
} from './Main.api';
import {MAIN_CONSTANT} from './Main.constant';

function* getDriverDetail(action) {
  try {
    const res = yield apiGetDriverDetail(action.payload);
    console.log('get driver detail', res);
    if (res.data.code === 200 && res.data.data) {
      yield put({
        type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION,
        payload: res.data.data,
      });
      yield put({
        type: MAIN_CONSTANT.SET_DRIVER_DETAIL,
        payload: res.data.data,
      });
      action.meta.success(res.data.data.drivers.boarding);
    } else {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_DETAIL_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({type: MAIN_CONSTANT.GET_DRIVER_DETAIL_FAILED, payload: err});
  }
}

function* updateDriverLocation(action) {
  const res = yield apiUpdateDriverLocation(action.payload);
  console.log('res update location', res);
  try {
    if (res && res.data.code === 200) {
      yield put({
        type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION_SUCCESS,
        payload: res.data.data,
      });
    } else {
      yield put({
        type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({
      type: MAIN_CONSTANT.UPDATE_DRIVER_LOCATION_FAILED,
      payload: err,
    });
  }
}

function* driverGoingOffline(action) {
  const res = yield apiDriverGoingOffline(action.payload);
  try {
    if (res && res.data.code === 200) {
      yield put({
        type: MAIN_CONSTANT.DRIVER_GOING_OFFLINE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      yield put({
        type: MAIN_CONSTANT.DRIVER_GOING_OFFLINE_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({
      type: MAIN_CONSTANT.DRIVER_GOING_OFFLINE_FAILED,
      payload: err,
    });
  }
}

function* getDriverStatus(action) {
  const res = yield apiGetDriverStatus(action.payload);
  try {
    if (res && res.data.code === 200) {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_STATUS_SUCCESS,
        payload: 'online',
      });
    } else if (res && res.data.code === 201) {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_STATUS_SUCCESS,
        payload: 'offline',
      });
    } else {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_STATUS_FAILED,
        payload: res.data.code,
      });
    }
  } catch (err) {
    yield put({
      type: MAIN_CONSTANT.GET_DRIVER_STATUS_FAILED,
      payload: err,
    });
  }
}

function* getDriverReward(action) {
  try {
    const res = yield apiGetRewardPoint(action.payload)
    if (res.data.code === 200) {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_REWARD_SUCCESS,
        payload: res.data.data
      })
    } else {
      yield put({
        type: MAIN_CONSTANT.GET_DRIVER_REWARD_FAILED
      })
    }
  } catch {
    yield put({
      type: MAIN_CONSTANT.GET_DRIVER_REWARD_FAILED
    })
  }
}

function* suspendAccount(action) {
  try {
    const res = yield apiSuspendAccount(action.payload)
    console.log('res suspend', res)
    if (res.data.code === 200) {
      yield put({
        type: MAIN_CONSTANT.SUSPEND_ACCOUNT_SUCCESS,
      })
      action.meta.success()
    } else {
      yield put({ type: MAIN_CONSTANT.GET_DRIVER_DETAIL_FAILED })
    }
  } catch {
    yield put({ type: MAIN_CONSTANT.GET_DRIVER_DETAIL_FAILED })
  }
}

function* mainSaga() {
  yield takeLatest(MAIN_CONSTANT.GET_DRIVER_DETAIL, getDriverDetail);
  yield takeLatest(MAIN_CONSTANT.UPDATE_DRIVER_LOCATION, updateDriverLocation);
  yield takeLatest(MAIN_CONSTANT.DRIVER_GOING_OFFLINE, driverGoingOffline);
  yield takeLatest(MAIN_CONSTANT.GET_DRIVER_STATUS, getDriverStatus);
  yield takeLatest(MAIN_CONSTANT.GET_DRIVER_REWARD, getDriverReward);
  yield takeLatest(MAIN_CONSTANT.SUSPEND_ACCOUNT, suspendAccount);
}

export default mainSaga;

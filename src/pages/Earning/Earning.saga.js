import {takeLatest, put} from 'redux-saga/effects';
import {EARNING_ACTION} from './Earning.constant';
import {apiTopUpDana, apiGetHistoryTopUp, apiWithdrawRequest} from './Earning.api';

function* topUpDanaWallet(action) {
    try {
        const res = yield apiTopUpDana(action.payload)
        if (res.data.code === 200) {
            yield put({ type: EARNING_ACTION.TOP_UP_DANA_SUCCESS, payload: res.data.data })
            action.meta.success()
        } else {
            yield put({ type: EARNING_ACTION.TOP_UP_DANA_FAILED, payload: res })
        }
    } catch(err) {
        yield put({ type: EARNING_ACTION.TOP_UP_DANA_FAILED, payload: err })
    }
};

function* getHistoryTopUp(action) {
    try {
        const res = yield apiGetHistoryTopUp(action.payload)
        console.log('res TOP UP', res);
        if (res.data.code === 200) {
            // const topUpData = res.data.data.filter(e => e.status_name === 'Payyuq')
            // const topUpDataSort = topUpData.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
            yield put({ type: EARNING_ACTION.GET_HISTORY_TOPUP_SUCCESS, payload: res.data.data })
            action.meta.success(res.data.data)
        } else {
            yield put({ type: EARNING_ACTION.GET_HISTORY_TOPUP_FAILED, payload: res })
        }
    } catch(err) {
        yield put({ type: EARNING_ACTION.GET_HISTORY_TOPUP_FAILED, payload: err })
    }
}

function* requestWithdraw(action) {
    try {
        const res = yield apiWithdrawRequest(action.payload)
        if (res.data.code === 200) {
            yield put({ type: EARNING_ACTION.REQUEST_WITHDRAW_SUCCESS })
            action.meta.success();
        } else {
            yield put({ type: EARNING_ACTION.REQUEST_WITHDRAW_FAILED })
            action.meta.failed();
        }
    } catch(err) {
        yield put({ type: EARNING_ACTION.REQUEST_WITHDRAW_FAILED })
    }
}

function* earningSaga() {
    yield takeLatest(EARNING_ACTION.TOP_UP_DANA, topUpDanaWallet);
    yield takeLatest(EARNING_ACTION.GET_HISTORY_TOPUP, getHistoryTopUp);
    yield takeLatest(EARNING_ACTION.REQUEST_WITHDRAW, requestWithdraw);
}

export default earningSaga;
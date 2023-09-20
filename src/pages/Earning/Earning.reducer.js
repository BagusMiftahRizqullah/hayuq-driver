import { EARNING_ACTION } from './Earning.constant';

const initialState = {
    topUpSuccessResponse : null,
    topUpErrorResponse: null,

    historyTransactionSuccess : null,
    historyTransactionError: null,

    dataRequestWithdraw: {},

    isLoading: false,
}

const earningReducer = (state = initialState, action) => {
    switch(action.type) {
        // topup 
        case EARNING_ACTION.TOP_UP_DANA:
            return {
                ...state,
                isLoading: true,
            }
        case EARNING_ACTION.TOP_UP_DANA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                topUpSuccessResponse: action.payload,
            }
        case EARNING_ACTION.TOP_UP_DANA_FAILED:
            return {
                ...state,
                isLoading: false,
                topUpErrorResponse: action.payload
            }
        // history transaction
        case EARNING_ACTION.GET_HISTORY_TOPUP:
            return {
                ...state,
                isLoading: true,
            }
        case EARNING_ACTION.GET_HISTORY_TOPUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                historyTransactionSuccess: action.payload,
            }
        case EARNING_ACTION.GET_HISTORY_TOPUP_FAILED:
            return {
                ...state,
                isLoading: false,
                historyTransactionError: action.payload,
            }
        // request withdraw
        case EARNING_ACTION.REQUEST_WITHDRAW:
            return {
                ...state,
                isLoading: true,
            }
        case EARNING_ACTION.REQUEST_WITHDRAW_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case EARNING_ACTION.REQUEST_WITHDRAW_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        // store data request withdraw
        case EARNING_ACTION.STORE_DATA_REQUEST_WITHDRAW:
            return {
                ...state,
                dataRequestWithdraw: action.payload
            }
        default:
            return state
    }
}

export default earningReducer;
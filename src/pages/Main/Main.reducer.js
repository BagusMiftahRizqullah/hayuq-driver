import {MAIN_CONSTANT} from './Main.constant';

const initialState = {
  isLoading: false,
  permissionLocationStatus: false,
  location: {},
  driverData: {},

  // DRIVER DETAIL
  driverDetail: {},
  getDriverDetailResponse: null,
  getDriverDetailError: false,
  getDriverDetailLoading: false,
  // DRIVER REWARD
  dataRewardDriver: {},
  // ORDER TOOK AWAY
  isOrderTookAway: false,

  // CALL
  callStatus: false,

  // FAKE GPS
  mocked: false,

  // UPDATE LOCATION
  updateDriverLocationResponse: null,
  updateDriverLocationError: false,
  updateDriverLocationLoading: false,
  driverStatus: 'offline',
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_CONSTANT.GET_LOCATION:
      return {
        ...state,
        isLoading: true,
      };
    case MAIN_CONSTANT.GET_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        location: action.payload,
      };

    case MAIN_CONSTANT.GET_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case MAIN_CONSTANT.SET_PERMISSION_LOCATION_STATUS:
      return {
        ...state,
        permissionLocationStatus: action.payload,
      };

    // ----------------- DRIVER DATA-----------------
    case MAIN_CONSTANT.SET_DRIVER_DATA:
      return {
        ...state,
        driverData: action.payload,
      };

    // ----------------- DRIVER DETAIL-----------------
    case MAIN_CONSTANT.GET_DRIVER_DETAIL:
      return {
        ...state,
        getDriverDetailLoading: true,
      };
    case MAIN_CONSTANT.GET_DRIVER_DETAIL_SUCCESS:
      return {
        ...state,
        getDriverDetailResponse: action.payload,
        getDriverDetailLoading: false,
      };
    case MAIN_CONSTANT.GET_DRIVER_DETAIL_FAILED:
      return {
        ...state,
        getDriverDetailError: action.payload,
        getDriverDetailLoading: false,
      };
    case MAIN_CONSTANT.SET_DRIVER_DETAIL:
      return {
        ...state,
        driverDetail: action.payload,
      };
    // ----------------- CALL -----------------
    case MAIN_CONSTANT.SET_CALL_STATUS:
      return {
        ...state,
        callStatus: action.payload,
      };
    // ----------------- UPDATE DRIVER LOCATION -----------------
    case MAIN_CONSTANT.UPDATE_DRIVER_LOCATION:
      return {
        ...state,
        updateDriverLocationLoading: true,
      };
    case MAIN_CONSTANT.UPDATE_DRIVER_LOCATION_SUCCESS:
      return {
        ...state,
        updateDriverLocationLoading: false,
        updateDriverLocationResponse: action.payload,
        driverStatus: 'online',
      };
    case MAIN_CONSTANT.UPDATE_DRIVER_LOCATION_FAILED:
      return {
        ...state,
        updateDriverLocationLoading: false,
        updateDriverLocationError: action.payload,
      };

    // ----------------- DRIVER GOING OFFLINE -----------------
    case MAIN_CONSTANT.DRIVER_GOING_OFFLINE:
      return {
        ...state,
        updateDriverLocationLoading: true,
      };
    case MAIN_CONSTANT.DRIVER_GOING_OFFLINE_SUCCESS:
      return {
        ...state,
        updateDriverLocationLoading: false,
        updateDriverLocationResponse: action.payload,
        driverStatus: 'offline',
      };
    case MAIN_CONSTANT.DRIVER_GOING_OFFLINE_FAILED:
      return {
        ...state,
        updateDriverLocationLoading: false,
        updateDriverLocationError: action.payload,
      };
    // ----------------- GET_DRIVER_STATUS -----------------
    case MAIN_CONSTANT.GET_DRIVER_STATUS:
      return {
        ...state,
        updateDriverLocationLoading: true,
      };
    case MAIN_CONSTANT.GET_DRIVER_STATUS_SUCCESS:
      return {
        ...state,
        updateDriverLocationLoading: false,
        driverStatus: action.payload,
      };
    case MAIN_CONSTANT.GET_DRIVER_STATUS_FAILED:
      return {
        ...state,
        updateDriverLocationLoading: false,
        updateDriverLocationError: action.payload,
      };
    // -------------- GET DRIVER REWARD DATA -------------
    case MAIN_CONSTANT.GET_DRIVER_REWARD:
      return {
        ...state,
        isLoading: true,
      }
    case MAIN_CONSTANT.GET_DRIVER_REWARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataRewardDriver: action.payload,
      }
    case MAIN_CONSTANT.GET_DRIVER_REWARD_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    // --------------- SET MOCKED GPS ---------------------
    case MAIN_CONSTANT.SET_MOCKED_GPS_DATA:
      return {
        ...state,
        mocked: action.payload,
      }
    // -------------- SET ORDER TOOK AWAY ----------------
    case MAIN_CONSTANT.SET_ORDER_TOOK_AWAY:
      return {
        ...state,
        isOrderTookAway: action.payload
      }
    // ----------------- RESET MAIN REDUCER-----------------
    case MAIN_CONSTANT.RESET_MAIN_DATA:
      return {
        ...state,
        getDriverDetailResponse: null,
        getDriverDetailError: false,
        getDriverDetailLoading: false,
        updateDriverLocationResponse: null,
      };
    default:
      return state;
  }
};

export default mainReducer;

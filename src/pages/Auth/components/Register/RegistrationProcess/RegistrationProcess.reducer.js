import {REGISTER_PROCESS} from './RegistrationProcess.constant';

const initialState = {
  dataProfile: {},
  dataIdCard: {},
  dataSkck: {},
  dataBank: {},
  dataVehicle: {},
  dataLicense: {},
  isLoading: false,
};

const registerProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- ADD PROFILE -------------------
    case REGISTER_PROCESS.REGISTER_ADD_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_PROFILE_SUCCESS:
      return {
        ...state,
        dataProfile: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- ADD IDCARD -------------------
    case REGISTER_PROCESS.REGISTER_ADD_IDCARD:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_IDCARD_SUCCESS:
      return {
        ...state,
        dataIdCard: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_IDCARD_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- ADD SKCK --------------------
    case REGISTER_PROCESS.REGISTER_ADD_SKCK:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_SKCK_SUCCESS:
      return {
        ...state,
        dataSkck: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_SKCK_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- ADD BANK --------------------
    case REGISTER_PROCESS.REGISTER_ADD_BANK:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_BANK_SUCCESS:
      return {
        ...state,
        dataBank: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_BANK_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- ADD VEHICLE -----------------
    case REGISTER_PROCESS.REGISTER_ADD_VEHICLE:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        dataVehicle: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_VEHICLE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- ADD LICENSE --------------------
    case REGISTER_PROCESS.REGISTER_ADD_LICENSE:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.REGISTER_ADD_LICENSE_SUCCESS:
      return {
        ...state,
        dataLicense: action.payload,
        isLoading: false,
      };
    case REGISTER_PROCESS.REGISTER_ADD_LICENSE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    // ---------------- LOAD EXIST DOCUMENT ------------
    case REGISTER_PROCESS.LOAD_EXIST_DOCUMENT:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_PROCESS.LOAD_EXIST_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataProfile: action.payload.driverprofile ? action.payload.driverprofile : {},
        dataIdCard: action.payload.driverdetails ? action.payload.driverdetails : {},
        dataSkck: action.payload.driverskck ? action.payload.driverskck : {},
        dataBank: action.payload.driverbanks ? action.payload.driverbanks : {},
        dataVehicle: action.payload.drivervehicles ? action.payload.drivervehicles : {},
        dataLicense: action.payload.driverlicense ? action.payload.driverlicense : {},
      };
    case REGISTER_PROCESS.LOAD_EXIST_DOCUMENT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default registerProcessReducer;

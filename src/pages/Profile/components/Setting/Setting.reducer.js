import {SETTING_CONSTANT} from './Setting.constant';

const initilaState = {
  isLoading: false,
  resChangeBankAccountFail: {},
  vehicleInfoUpdateData: {},
  bankAccountUpdateData: {},
  emailUpdateData: {},
  phoneNumberUpdateData: {},
};

const settingReducer = (state = initilaState, action) => {
  switch (action.type) {
    // edit bank account
    case SETTING_CONSTANT.CHANGE_BANK_ACCOUNT:
      return {
        ...state,
        isLoading: true,
      };
    case SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bankAccountUpdateData: {},
      };
    case SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_FAILED:
      return {
        ...state,
        resChangeBankAccountFail: action.payload,
        isLoading: false,
        bankAccountUpdateData: {},
      };
    // store vehicle info update data
    case SETTING_CONSTANT.STORE_VEHICLE_UPDATE_DATA:
      return {
        ...state,
        vehicleInfoUpdateData: action.payload,
      };
    // store bank account update data
    case SETTING_CONSTANT.STORE_BANK_ACCOUNT_UPDATE_DATA:
      return {
        ...state,
        bankAccountUpdateData: action.payload,
      };
    // store email update data
    case SETTING_CONSTANT.STORE_EMAIL_UPDATE_DATA:
      return {
        ...state,
        emailUpdateData: action.payload,
      };
    // store phone number update data
    case SETTING_CONSTANT.STORE_PHONE_NUMBER_UPDATE_DATA:
      return {
        ...state,
        phoneNumberUpdateData: action.payload,
      };
    // edit vehicle info
    case SETTING_CONSTANT.CHANGE_VEHICLE_INFO:
      return {
        ...state,
        isLoading: true,
      };
    case SETTING_CONSTANT.CHANGE_VEHICLE_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vehicleInfoUpdateData: {},
      };
    case SETTING_CONSTANT.CHANGE_VEHICLE_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
        vehicleInfoUpdateData: {},
      };
    // edit phone number
    case SETTING_CONSTANT.CHANGE_PHONE_NUMBER:
      return {
        ...state,
        isLoading: true,
      };
    case SETTING_CONSTANT.CHANGE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phoneNumberUpdateData: {},
      };
    case SETTING_CONSTANT.CHANGE_PHONE_NUMBER_FAILED:
      return {
        ...state,
        isLoading: false,
        phoneNumberUpdateData: {},
      };
    // edit email
    case SETTING_CONSTANT.CHANGE_EMAIL:
      return {
        ...state,
        isLoading: true,
      };
    case SETTING_CONSTANT.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailUpdateData: {},
      };
    case SETTING_CONSTANT.CHANGE_EMAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        emailUpdateData: {},
      };
    // delete account
    case SETTING_CONSTANT.DELETE_ACCOUNT:
      return {
        ...state,
        isLoading: true,
      };
    case SETTING_CONSTANT.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SETTING_CONSTANT.DELETE_ACCOUNT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default settingReducer;

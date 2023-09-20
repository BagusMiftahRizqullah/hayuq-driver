import {AUTH_CONSTANT} from './Auth.constant';

const initialState = {
  isLoading: false,
  mobileNumber: '',
  isAuthenticated: false,

  dataUser: {},
  documentRejected: {},

  reqOtpLoginResponse: {},
  reqOtpLoginError: false,
  reqOtpLoginLoading: false,

  reqOtpRegisterResponse: {},
  reqOtpRegisterError: false,
  reqOtpRegisterLoading: false,

  verifyOtpResponse: {},
  verifyOtpError: false,
  verifyOtpLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CONSTANT.SET_MOBILE_NUMBER_LOGIN:
      return {
        ...state,
        mobileNumber: action.payload,
      };

    case AUTH_CONSTANT.CLEAR_AUTH_RESPONSE:
      return {
        ...state,
        reqOtpRegisterResponse: {},
        reqOtpRegisterError: false,
        reqOtpRegisterLoading: false,
        verifyOtpResponse: {},
        verifyOtpError: false,
        verifyOtpLoading: false,
        reqOtpLoginResponse: {},
        reqOtpLoginError: false,
        reqOtpLoginLoading: false,
      };
    // ---------------- LOGIN ---------------------
    case AUTH_CONSTANT.LOGIN:
      return {
        ...state,
        reqOtpLoginLoading: true,
      };
    case AUTH_CONSTANT.LOGIN_SUCCESS:
      return {
        ...state,
        dataUser: action.payload,
        reqOtpLoginLoading: false,
        reqOtpLoginResponse: action.payload,
      };
    case AUTH_CONSTANT.LOGIN_FAILURE:
      return {
        ...state,
        reqOtpLoginError: action.payload,
        reqOtpLoginLoading: false,
      };
    // ---------------- REGISTER ---------------------
    case AUTH_CONSTANT.REGISTER:
      return {
        ...state,
        reqOtpRegisterLoading: true,
      };
    case AUTH_CONSTANT.REGISTER_SUCCESS:
      return {
        ...state,
        reqOtpRegisterLoading: false,
        reqOtpRegisterResponse: action.payload,
      };
    case AUTH_CONSTANT.REGISTER_FAILED:
      return {
        ...state,
        reqOtpRegisterLoading: false,
        reqOtpRegisterError: action.payload,
      };

    // ---------------- VERIFY OTP -------------------
    case AUTH_CONSTANT.VERIFY_OTP:
      return {
        ...state,
        verifyOtpLoading: true,
      };
    case AUTH_CONSTANT.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        dataUser: action.payload,
        verifyOtpLoading: false,
        verifyOtpResponse: action.payload,
      };
    case AUTH_CONSTANT.VERIFY_OTP_FAILED:
      return {
        ...state,
        verifyOtpError: action.payload,
        verifyOtpLoading: false,
      };
    // ----------------  GET DOCUMENT REJECTED ------
    case AUTH_CONSTANT.GET_DOCUMENT_REJECTED:
      return {
        ...state,
        isLoading: true,
      }
    case AUTH_CONSTANT.GET_DOCUMENT_REJECTED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        documentRejected: action.payload,
      }
    case AUTH_CONSTANT.GET_DOCUMENT_REJECTED_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    // ---------------- LOGOUT ---------------------
    case AUTH_CONSTANT.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;

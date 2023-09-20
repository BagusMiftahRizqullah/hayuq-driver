import {CHAT_CONSTANT} from './Chat.constant';

const initialState = {
  isLoading: false,

  listChat: [],
  receivedChatError: false,
  receivedChatLoading: false,
  receiverOn: false,
  chat_notes: null,
  //   sendChat: [],
  //   sendChatError: false,
  //   sendChatLoading: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_CONSTANT.RECIVED_ALL_CHAT_SUCCESS:
      return {
        ...state,
        listChat: action.payload,
        isLoading: false,
      };

    case CHAT_CONSTANT.RECIVED_CHAT_SUCCESS:
      return {
        ...state,
        listChat: action.payload,
        isLoading: false,
      };

    case CHAT_CONSTANT.SEND_CHAT_SUCCESS:
      return {
        ...state,
        listChat: action.payload,
        isLoading: false,
      };
    case CHAT_CONSTANT.SET_RECIVED_CHAT:
      return {
        ...state,
        receiverOn: action.payload,
        isLoading: false,
      };
    case CHAT_CONSTANT.SET_NOTE:
      return {
        ...state,
        chat_notes: action.payload,
        isLoading: false,
      };
    case CHAT_CONSTANT.RESET_LIST_CHAT:
      return {
        ...state,
        listChat: []
      }
    case CHAT_CONSTANT.CONCAT_LIST_CHAT:
      return {
        ...state,
        listChat: [...listChat, action.payload]
      }
    default:
      return state;
  }
};
export default chatReducer;

import {LANG_CONSTANT} from './Lang.constant';

const initialState = {
  lang: 'en',
};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANG_CONSTANT.SET_GLOBAL_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default langReducer;

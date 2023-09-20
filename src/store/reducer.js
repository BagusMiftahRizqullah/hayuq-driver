import {combineReducers} from 'redux';
import AuthReducer from '@pages/Auth/Auth.reducer';
import LangReducer from '../lang/Lang.reducer';
import mainReducer from '../pages/Main/Main.reducer';
import registerProcessReducer from '../pages/Auth/components/Register/RegistrationProcess/RegistrationProcess.reducer';
import settingReducer from '../pages/Profile/components/Setting/Setting.reducer';
import {masterReducer} from '../config/masterData';
import chatReducer from '../pages/Chat/Chat.reducer';
import earningReducer from '../pages/Earning/Earning.reducer';

const reducers = combineReducers({
  auth: AuthReducer,
  lang: LangReducer,
  main: mainReducer,
  registerProcessReducer: registerProcessReducer,
  masterReducer: masterReducer,
  settingReducer: settingReducer,
  earningReducer: earningReducer,
  chatReducer: chatReducer,
});

export default reducers;

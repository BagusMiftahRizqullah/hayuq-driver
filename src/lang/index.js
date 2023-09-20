import {NativeModules} from 'react-native';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

import LocaleAuth from '@pages/Auth/Lang.auth';
import LocaleEarning from '@pages/Earning/Lang.earning';
import LocaleProfile from '@pages/Profile/Lang.profile';
import LocaleOrder from '@pages/Order/Lang.Order';
import LocaleBoarding from '@pages/OnBoarding/Lang.Onboarding';

// iOS:
const localeIos =
  NativeModules?.SettingsManager?.settings?.AppleLocale ||
  NativeModules?.SettingsManager?.settings?.AppleLanguages[0];

// Android:
const localeAndroid = NativeModules.I18nManager.localeIdentifier;
export let rtl = false;
const getLocale = () => {
  let localeLang = Platform.OS === 'ios' ? localeIos : localeAndroid;
  if (localeLang === 'en_US') {
    rtl = false;
    return 'en';
  } else if (localeLang === 'id_ID') {
    return 'id';
  }
};

const Locale = [
  ...LocaleAuth,
  ...LocaleEarning,
  ...LocaleProfile,
  ...LocaleOrder,
  ...LocaleBoarding,
];

const translator = (key, unique) => {
  const {lang} = useSelector((state) => state.lang);

  const deviceLanguage = lang;

  if (key == null) {
    return '';
  }

  let langMap;

  if (unique == null) {
    // Change id to the default language used in the application.
    langMap = Locale.findIndex((find) => find?.en === key);
  } else {
    langMap = Locale.findIndex(
      (find) => find.en === key && find.unique === unique,
    );
  }

  if (langMap >= 0 && Locale[langMap][deviceLanguage] != null) {
    return Locale[langMap][deviceLanguage] || key;
  }

  return key;
};

export default translator;

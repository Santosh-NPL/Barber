import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './assets/locales/en.json';
import np from './assets/locales/np.json';

const resources = {
  en: { translation: en },
  np: { translation: np },
};

i18n
  .use(initReactI18next)
  .init({
    resources, // Corrected key name
    lng: 'np', // Default language
    fallbackLng: 'en', // Fallback language set to English
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;

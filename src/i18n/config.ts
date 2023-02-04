import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from './en/common.json';

export const defaultNS = 'common';
export const resources = {
  en: {common},
} as const;

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ['common'],
    defaultNS,
    resources,
  });

export default i18n;

import { createI18n } from 'vue-i18n';
import * as StartPageEn from './en/StartPage.json';
import * as StartPageKa from './ka/StartPage.json';



const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'Eng',
  legacy: false,
  messages: {
    en: {
    ...StartPageEn,
    },
    ka: {
      ...StartPageKa
    }
  }
  })
  

  export default i18n 
import { createI18n } from 'vue-i18n'
import StartPageEn from './StartPageEn.json'
import StartPageKa from './StartPageKa.json'



const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'Eng',
  messages: {
    en: StartPageEn ,
    ka: StartPageKa
  }
  })
  

  export default i18n 
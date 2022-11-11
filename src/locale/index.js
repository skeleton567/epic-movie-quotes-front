import { createI18n } from 'vue-i18n';
import * as StartPageEn from './en/StartPage.json';
import * as StartPageKa from './ka/StartPage.json';
import * as authKa from './ka/auth.json';
import * as authEn from './en/auth.json';
import * as errorKa from './ka/error.json';
import * as errorEn from './en/error.json';
import * as newsFeedKa from './ka/NewsFeed.json';
import * as newsFeedEn from './en/NewsFeed.json';
import * as UserProfileKa from './ka/UserProfile.json';
import * as UserProfileEn from './en/UserProfile.json';
import * as notificationsKa from './ka/notifications.json';
import * as notificationsEn from './en/notifications.json';
import * as MovieListKa from './ka/MovieList.json';
import * as MovieListEn from './en/MovieList.json';


const i18n = createI18n({
  locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {
      ...StartPageEn,
      ...authEn,
      ...errorEn,
      ...newsFeedEn,
      ...UserProfileEn,
      ...notificationsEn,
      ...MovieListEn
    },
    ka: {
      ...StartPageKa,
      ...authKa,
      ...errorKa,
      ...newsFeedKa,
      ...UserProfileKa,
      ...notificationsKa,
      ...MovieListKa
    }
  }
  })
  

  export default i18n 
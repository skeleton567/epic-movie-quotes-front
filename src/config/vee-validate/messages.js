
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        georgian: "Only georgian letters are allowed",
        lowercase: "Only lowercase letters are allowed",
      },
      names: {
        quote_ka: 'georgian quote',
        quote_en: 'english quote',
        title_en: 'english title',
        title_ka: 'georgian title',
        director_en: 'director in english',
        director_ka: 'director in georgian',
        description_en: 'english description',
        description_ka: 'georgian description',
        release_year: 'release year',
      }
    },
    ka: {
      messages: {
        ...ka.messages,
        georgian: "მარტო ქართული ასოები დაიშვება",
        lowercase: "მხოლოდ დაბალი რეესტრის ასოები დაიშვება",
        confirmed: 'პაროლები არ ემთხვევა'
      },
      names: {
        quote_ka: 'ქართული ციტატა',
        quote_en: 'ინგლისური ციტატა',
        name: 'სახელი',
        email: 'იმეილი',
        password: 'პაროლი',
        confirmation: 'პაროლის დადასტურება',
        title_en: 'სახელწოდება ინგლისურად',
        title_ka: 'სახელწოდება ქართულად',
        director_en: 'რეჟისორი ინგლისურად',
        director_ka: 'რეჟისორი ქართულად',
        description_en: 'ინგლისური აღწერა',
        description_ka: 'ქართული აღწერა',
        release_year: 'გამოშვების წელი',
        budget: 'ბიუჯეტი',
      }
    },
  }),
});
import { createApp } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from 'vue3-google-login'

import App from "./App.vue";
import router from "./router";
import  i18n from "./locale";

import "@/assets/tailwind.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";
import FormWrap from "@/components/FormWrap.vue";
import TextInput from "@/components/TextInput.vue";
import MovieInput from "@/components/MovieInput.vue";
import TextareaComponent from "@/components/TextareaComponent.vue";
import MailingMessage from "@/components/MailingMessage.vue";
import DashboardWrap from "@/components/DashboardWrap.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
const app = createApp(App);
app.component('form-wrap', FormWrap)
app.component('text-input', TextInput)
app.component('movie-input', MovieInput)
app.component('mailing-message', MailingMessage)
app.component('dashboard-wrap', DashboardWrap)
app.component('profile-picture', ProfilePicture)
app.component('textarea-component', TextareaComponent)


app.use(createPinia());
app.use(router);
app.use(i18n);

const id = import.meta.env.VITE_CLIENT_ID;
app.use(vue3GoogleLogin, {
  clientId: id
})
app.mount("#app");

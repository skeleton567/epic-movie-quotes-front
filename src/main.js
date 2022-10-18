import { createApp } from "vue";
import { createPinia } from "pinia";
import gAuth from 'vue3-google-auth';

import App from "./App.vue";
import router from "./router";

import "@/assets/tailwind.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";
import FormWrap from "@/components/FormWrap.vue";
import TextInput from "@/components/TextInput.vue";
import MailingMessage from "@/components/MailingMessage.vue";
import DashboardWrap from "@/components/DashboardWrap.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
const app = createApp(App);
app.component('form-wrap', FormWrap)
app.component('text-input', TextInput)
app.component('mailing-message', MailingMessage)
app.component('dashboard-wrap', DashboardWrap)
app.component('profile-picture', ProfilePicture)


app.use(createPinia());
app.use(router);
const id = import.meta.env.VITE_CLIENT_ID;
const $gAuth = gAuth.createGAuth({
    clientId: id,
    scope: 'email',
    prompt: 'consent',
    plugin_name: 'Web client 3'
  }); 
app.use($gAuth)
app.mount("#app");

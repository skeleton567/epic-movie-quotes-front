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
import TheHeader from "@/components/TheHeader.vue";
const app = createApp(App);
app.component('form-wrap', FormWrap)
app.component('text-input', TextInput)
app.component('mailing-message', MailingMessage)
app.component('the-header', TheHeader)

app.use(createPinia());
app.use(router);
const id = '220255668074-gs8j0svnk20uk6rbjel10h0bcrcep2le.apps.googleusercontent.com';
const $gAuth = gAuth.createGAuth({
    clientId: id,
    scope: 'email',
    prompt: 'consent',
    plugin_name: 'Web client 3'
  }); 
app.use($gAuth)



app.mount("#app");

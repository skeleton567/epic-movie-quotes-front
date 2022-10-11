import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/tailwind.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";
import FormWrap from "@/components/FormWrap.vue";
import TextInput from "@/components/TextInput.vue";
import MailingMessage from  "@/components/MailingMessage.vue";
const app = createApp(App);
app.component('form-wrap', FormWrap)
app.component('text-input', TextInput)
app.component('mailing-message',  MailingMessage)

app.use(createPinia());
app.use(router);

app.mount("#app");

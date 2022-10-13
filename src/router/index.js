import { createRouter, createWebHistory } from "vue-router";
import StartPage from '@/pages/guest/StartPage.vue'
import RegistrationPage from '@/pages/guest/RegistrationPage.vue'
import LoginPage from '@/pages/guest/LoginPage.vue'
import EmailSent from '@/pages/guest/EmailSent.vue'
import SuccesfullActivation from '@/pages/guest/SuccesfullActivation.vue'
import ForgotPassword from '@/pages/guest/ForgotPassword.vue'
import RecoverInstructions from '@/pages/guest/RecoverInstructions.vue'
import PasswordChanged from '@/pages/guest/PasswordChanged.vue'
import CreatePassword from '@/pages/guest/CreatePassword.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: StartPage,
      children: [
        {
          path: "/register",
          name: "registration",
          component: RegistrationPage,
        },
        {
          path: "/login",
          name: "login",
          component: LoginPage,
        },
        {
          path: "/sent",
          name: "emailSent",
          component: EmailSent,
        },
        {
          path: "/success",
          name: "success",
          component: SuccesfullActivation,
        },
        {
          path: "/forgot-password",
          name: "forgotPassword",
          component: ForgotPassword,
        },
        {
          path: "/recover-instructions",
          name: "recoverInstructions",
          component: RecoverInstructions,
        },
        {
          path: "/password-changed",
          name: "passwordChanged",
          component: PasswordChanged,
        },
        {
          path: "/create-password",
          name: "createPassword",
          component: CreatePassword,
          props: true
        }
      ]
    }
  ]
});

export default router;

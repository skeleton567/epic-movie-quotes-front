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
import NewsFeed from '@/pages/auth/NewsFeed.vue'
import NotFound from "@/pages/error/NotFound.vue";
import NotAuthorized from "@/pages/error/NotAuthorized.vue";
import UserProfile from '@/pages/auth/UserProfile.vue';
import { useUserStore } from "@/stores/user.js";
import { getJwtToken } from "@/helpers/jwt";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: StartPage,
      meta: {guest: true},
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
          meta: {guest: false},
        },
        {
          path: "/success",
          name: "success",
          component: SuccesfullActivation,
          meta: {guest: false},
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
          meta: {guest: true},
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
        }
      ]
    },
    {
      path: "/news-feed",
      name: "newsFeed",
      component: NewsFeed,
      meta: {auth: true}
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
      meta: {auth: true}
    },
    {
      path: "/not-authorized",
      name: "notAuthorized",
      component: NotAuthorized,
    },
    {
      path: "/:notFound(.*)",
      name: "notFound",
      component: NotFound,
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !getJwtToken()) {
    next({ name: 'notAuthorized' })
  } else if (to.name === 'home' && getJwtToken()) {
    next({ name: 'newsFeed' })
  } else if (to.meta.guest && getJwtToken()) {
    next({ name: 'notAuthorized' })
  } else if (to.meta.auth && getJwtToken()) {
    const store = useUserStore();
    if (!store.id) {
      store.getAuthUser();
    }
    next();
  } else {
    next();
  }
})

export default router;

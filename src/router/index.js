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
import EditName from '@/pages/auth/EditName.vue';
import EditPassword from '@/pages/auth/EditPassword.vue';
import EditEmail from '@/pages/auth/EditEmail.vue';
import EmailPage from '@/pages/auth/EmailPage.vue';
import MovieList from '@/pages/auth/MovieList.vue';
import AddMovie from '@/pages/auth/AddMovie.vue';
import EditMovie from  '@/pages/auth/EditMovie.vue';
import YouSure from '@/pages/auth/YouSure.vue';
import ViewMovie from '@/pages/auth/ViewMovie.vue';
import AddQuote from '@/pages/auth/AddQuote.vue';
import ViewQuote from '@/pages/auth/ViewQuote.vue';
import EditQuote from '@/pages/auth/EditQuote.vue';
import WriteQuote from '@/pages/auth/WriteQuote.vue';
import { useUserStore } from "@/stores/user.js";
import isAuthenticated from "./guards";
import { useAuthStore } from "@/stores/auth";


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
      meta: { guest: true },
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
          meta: { guest: false },
        },
        {
          path: "/success",
          name: "success",
          component: SuccesfullActivation,
          meta: { guest: false },
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
          meta: { guest: true },
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
      meta: { auth: true },
      children: [
        {
          path: "/write-quote",
          name: "writeQuote",
          component: WriteQuote,
        },
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
      meta: { auth: true },
      children: [
        {
          path: "/edit-name",
          name: "editName",
          component: EditName,
        },
        {
          path: "/you-sure",
          name: "youSure",
          component: YouSure
        },
        {
          path: "/edit-password",
          name: "editPassword",
          component: EditPassword,
        },
        {
          path: "/edit-email",
          name: "editEmail",
          component: EditEmail,
        },
        {
          path: "/email",
          name: "emailPage",
          component: EmailPage,
        },
      ]
    },
    {
      path: "/movie-list",
      name: "movieList",
      component: MovieList,
      meta: { auth: true },
      children: [
        {
          path: "/add-movie",
          name: "addMovie",
          component: AddMovie,
        },
      ]
    },
    {
      path: "/view-movie/",
      name: "viewMovie",
      component: ViewMovie,
      meta: { auth: true },
      children: [
        {
          path: "/edit-movie",
          name: "editMovie",
          component: EditMovie,
        },
      ]
    },
    {
      path: "/add-quote/",
      name: "addQuote",
      component: AddQuote,
      meta: { auth: true },
    },
    {
      path: "/view-quote/",
      name: "viewQuote",
      component: ViewQuote,
      meta: { auth: true },
    },
    {
      path: "/edit-quote/",
      name: "editQuote",
      component: EditQuote,
      meta: { auth: true },
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const store = useUserStore();
  if (authStore.authenticated === null) {
      await store.getAuthUser(); 
  }

  if (to.meta.auth && !authStore.authenticated) {
    next({ name: 'notAuthorized' })
  } else if (to.name === 'home' && authStore.authenticated) {
    next({ name: 'newsFeed' })
  } else if (to.meta.guest && authStore.authenticated) {
    next({ name: 'notAuthorized' })
  } else {
    next();
  }
})

export default router;

<template>
  <div class="m-0 bg-[#11101a]">
    <header
      class="h-20 px-10 md:px-16 flex justify-between items-center fixed w-full bg-[#22203033] z-10"
    >
      <h2
        class="text-sm uppercase text-[#DDCCAA] font-bold hidden md:block font-[HelveticaEnglish]"
      >
        Movie quotes
      </h2>
      <responsive-button @showEvent="showSide" />
      <nav class="flex items-center space-x-8">
        <search-loop :position="true" @showEvent="showSearch" />
        <div class="relative">
          <notification-icon
            classes="bell"
            @notificationEvent="notificationOpened = !notificationOpened"
            @click.stop
          />
          <span
            class="absolute -top-1 -right-1 rounded-full bg-[#E33812] text-white px-2 py-1 text-[0.6rem] cursor-pointer"
            @click="notificationOpened = !notificationOpened"
            @click.stop
            >{{ counter }}</span
          >
          <div
            v-if="notificationOpened"
            class="absolute top-16 right-0 translate-x-10 w-[100vw] max-h-[80vh] md:w-[500px] md:top-16 md:-right-3 md:rounded-xl notification z-50"
            @click.stop
          >
            <div
              v-if="!notifications.length"
              class="bg-black z-20 w-full block py-5 px-6"
            >
              <p class="text-center">{{ $t("No_Notification") }}</p>
            </div>
            <div
              v-else
              class="bg-black z-20 w-full block py-5 px-6 max-h-[80vh] md:w-[500px] overflow-y-scroll scrollbar"
            >
              <div class="flex justify-between items-center">
                <h1 class="font-bold text-xl">{{ $t("notifications") }}</h1>
                <button class="underline text-sm" @click="markAsRead(false)">
                  {{ $t("Markas_Read") }}
                </button>
              </div>
              <div
                v-for="notification in notifications"
                class="border border-[#6C757D80] p-4 md:pb-6 mt-4 cursor-pointer"
                @click="markAsRead(notification.id)"
              >
                <div class="md:flex justify-between items-center">
                  <div class="flex space-x-5 md:h-10">
                    <profile-picture
                      height="w-12 h-12"
                      :image="notification.user.image"
                      :border="
                        !notification.seen
                          ? 'border border-green-500'
                          : 'border border-black'
                      "
                    />
                    <div>
                      <p
                        class="text-xl text-white break-words md:max-w-[200px] lg:max-w-none mb-1"
                      >
                        {{
                          notification.user?.name
                            ? notification.user.name
                            : notification.user.email
                        }}
                      </p>
                      <p class="my-1 text-sm text-[#CED4DA]">
                        <span
                          v-if="notification.type === 'like'"
                          class="flex items-center text-center space-x-2"
                        >
                          <like-notification />
                          <span class="text-xs md:text-sm">{{
                            $t("reacted")
                          }}</span>
                        </span>
                        <span
                          v-else
                          class="flex items-center text-center space-x-2"
                        >
                          <comment-notification />
                          <span class="text-xs md:text-sm">{{
                            $t("commented")
                          }}</span></span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="flex space-x-5 mt-1 md:flex-col-reverse">
                    <p
                      class="w-12 md:text-right md:w-full md:mt-4 text-sm"
                      :class="
                        !notification.seen ? 'text-[#198754]' : 'text-black'
                      "
                    >
                      {{ $t("New_Post") }}
                    </p>
                    <p class="text-sm">
                      {{ timeSince(notification.created_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <locale-changer class="hidden md:flex" />
        <button
          class="text-white text-sm border border-white py-2 px-3 rounded-[4px] hidden md:inline"
          @click="logOut"
        >
          {{ $t("Log_Out") }}
        </button>
      </nav>
    </header>
    <div class="md:inline-block mt-0">
      <div
        :class="{ hidden: aside }"
        class="h-[60vh] w-[87vw] md:h-fit fixed z-10 md:mt-10 bg-[#11101a] md:bg-none md:block md:fixed md:z-0 md:w-auto md:max-w-sm"
        @click.stop=""
      >
        <div class="flex space-x-5 ml-11 mt-11">
          <profile-picture :image="store.profile" />
          <div>
            <p
              class="text-xl text-white break-words md:max-w-[200px] lg:max-w-sm"
            >
              {{ store?.name ? store.name : store.email }}
            </p>
            <router-link
              class="text-sm text-[#CED4DA]"
              :to="{ name: 'profile' }"
              >{{ $t("Edit_Profile") }}</router-link
            >
          </div>
        </div>
        <router-link :to="{ name: 'newsFeed' }" class="flex space-x-10 ml-11">
          <home-icon />
          <p class="text-xl text-white my-10">{{ $t("News_feed") }}</p>
        </router-link>
        <router-link :to="{ name: 'movieList' }" class="flex space-x-10 ml-11">
          <camera-icon />
          <p class="text-xl text-white">
            {{ $t("Movie_List") }}
          </p>
        </router-link>
        <locale-changer class="md:hidden flex ml-11 my-10" />
        <button
          class="text-white text-sm border border-white py-2 px-3 rounded-[4px] md:hidden inline ml-11"
          @click="logOut"
        >
          {{ $t("Log_Out") }}
        </button>
      </div>
      <div
        v-if="search"
        class="h-[60vh] w-full fixed z-10 bg-[#11101a]"
        @click.stop=""
      >
        <div
          class="flex space-x-5 pl-11 py-5 items-center border-b border-[rgba(239, 239, 239, 0.3)]"
        >
          <arrow-left @hide-event="hideSearch" />
          <input
            v-model="postStore.searchValue"
            class="outline-none w-full bg-inherit text-white py-1 px-1 placeholder-white"
            type="text"
            :placeholder="$t('search')"
          />
        </div>
        <p class="mt-6 text-[#CED4DA] ml-20">
          {{ $t("enter") }}<span class="text-white">@</span>
          {{ $t("Search_Movie") }}
        </p>
        <p class="mt-5 text-[#CED4DA] ml-20">
          {{ $t("enter") }}<span class="text-white">#</span>
          {{ $t("Search_Quote") }}
        </p>
      </div>
    </div>
    <div
      class="w-full md:flex justify-center pt-16 bg-[#11101a]"
      :class="height"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import ResponsiveButton from "@/components/icons/ResponsiveButton.vue";
import SearchLoop from "@/components/icons/SearchLoop.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import CommentNotification from "@/components/icons/CommentNotification.vue";
import LikeNotification from "@/components/icons/LikeNotification.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { usePostStore } from "@/stores/post.js";
import LocaleChanger from "@/components/LocaleChanger.vue";
import { useI18n } from "vue-i18n";
import pusher from "@/config/pusher";
const { t } = useI18n();
const store = useUserStore();
const postStore = usePostStore();
const router = useRouter();
const logOut = async () => {
  try {
    await axios.post("logout");
    store.removeAuthUser();
    postStore.resetPosts();
    router.replace({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
let aside = ref(true);
let search = ref(false);
const showSide = () => {
  return (aside.value = false);
};
const hideSide = () => {
  notificationOpened.value = false;
  aside.value = true;
  search.value = false;
};
const showSearch = () => {
  return (search.value = true);
};
const hideSearch = async () => {
  await postStore.searchPosts();
  return (search.value = false);
};
const props = defineProps({
  height: { type: String, required: false }
});
let counter = ref(0);
const getNotification = async () => {
  try {
    await store.getAuthUser();
    const response = await axios.get("notifications");
    for (let data of response.data) {
      if (!data.seen) {
        counter.value++;
      }
    }
    notifications.value.push(...response.data);
  } catch (error) {
    console.log(error);
  }
};
const notificationOpened = ref(false);
getNotification();
let notifications = ref([]);
let channel = pusher.subscribe("private-notifications." + store.id);
channel.bind("notification", function (data) {
  counter.value++;
  notifications.value.unshift(data.notification);
});
const timeSince = (sqldate) => {
  let date = new Date(sqldate).getTime();
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + t("Years_Ago");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + t("Months_Ago");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + t("Days_Ago");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + t("Hours_Ago");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + t("Min_Ago");
  }
  return Math.floor(seconds) + t("Sec_Ago");
};
const markAsRead = async (id) => {
  try {
    await axios.patch("notifications", {
      id: id,
      user_to_notify: store.id
    });
    const response = await axios.get("notifications");
    counter.value = 0;
    for (let data of response.data) {
      if (!data.seen) {
        counter.value++;
      }
    }
    notifications.value = [...response.data];
  } catch (error) {
    console.log(error);
  }
};
window.addEventListener("click", hideSide);
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
.scrollbar::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.notification::before {
  right: 56px;
  content: "";
  z-index: 100;
  position: absolute;
  top: -30px;
  transform: translateX(50%);
  border: 15px solid;
  border-color: #0000 #0000 #000 #0000;
}
@media screen and (min-width: 768px) {
  .notification::before {
    right: 13.5%;
  }
}
</style>

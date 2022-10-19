<template>
  <div class="m-0 bg-lightBlue-image" @click="hideSide">
    <header
      class="h-20 px-10 md:px-16 flex justify-between items-center fixed w-full bg-[#22203033] z-10"
    >
      <h2 class="text-sm uppercase text-[#DDCCAA] font-bold hidden md:block">
        Movie quotes
      </h2>
      <responsive-button @showEvent="showSide" />
      <nav class="flex items-center space-x-8">
        <search-loop :position="true" @showEvent="showSearch" />
        <div class="relative">
          <notification-icon />
          <span
            class="absolute -top-2 right-0 rounded-full bg-[#E33812] text-white p-1 text-[0.6rem]"
            >3</span
          >
        </div>
        <div class="hidden w-14 md:flex items-center justify-between">
          <select id="" class="selecttxt text-white" name="">
            <option class="text-black" selected value="">Eng</option>
            <option class="text-black" value="">ქარ</option>
          </select>
          <arrow-down />
        </div>
        <button
          class="text-white text-sm border border-white py-2 px-3 rounded-[4px] hidden md:inline"
          @click="logOut"
        >
          Log Out
        </button>
      </nav>
    </header>
    <div class="md:inline-block mt-0">
      <div
        :class="{ hidden: aside }"
        class="h-[60vh] w-[87vw] fixed z-10 md:mt-10 bg-lightBlue-image md:bg-none md:block md:fixed md:z-0 md:h-full md:w-[22%]"
        @click.stop=""
      >
        <div class="flex space-x-5 ml-11 mt-11">
          <profile-picture image="profile.jpg" />
          <div>
            <p
              class="text-xl text-white break-words md:max-w-[200px] lg:max-w-none"
            >
              {{ store?.name ? store.name : store.email }}
            </p>
            <router-link class="text-sm text-[#CED4DA]" :to="{ name: 'home' }"
              >Edit your profile</router-link
            >
          </div>
        </div>
        <div class="flex space-x-10 ml-11">
          <home-icon />
          <router-link
            class="text-xl text-white my-10"
            :to="{ name: 'newsFeed' }"
            >News feed</router-link
          >
        </div>
        <div class="flex space-x-10 ml-11">
          <camera-icon />
          <router-link class="text-xl text-white" :to="{ name: 'home' }"
            >List of movies</router-link
          >
        </div>
        <button
          class="text-white text-sm border border-white py-2 px-3 rounded-[4px] md:hidden inline ml-11 mt-10"
          @click="logOut"
        >
          Log Out
        </button>
      </div>
      <div
        v-if="search"
        class="h-[60vh] w-full fixed z-10 bg-lightBlue-image"
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
            placeholder="Search"
          />
        </div>
        <p class="mt-6 text-[#CED4DA] ml-20">
          Enter <span class="text-white">@</span> to search movies
        </p>
        <p class="mt-5 text-[#CED4DA] ml-20">
          Enter <span class="text-white">#</span> to search quotes
        </p>
      </div>
    </div>
    <div class="w-full md:flex justify-center pt-16 bg-lightBlue-image">
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
import ArrowDown from "@/components/icons/ArrowDown.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { usePostStore } from "@/stores/post.js";
const store = useUserStore();
const postStore = usePostStore();
const router = useRouter();
const logOut = async () => {
  try {
    const response = await axios.post("logout");
    console.log(response);
    document.cookie =
      "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    store.removeAuthUser();
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
  return (aside.value = true);
};
const showSearch = () => {
  return (search.value = true);
};
const hideSearch = () => {
  return (search.value = false);
};
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

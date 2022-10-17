<template>
  <div class="m-0" @click="hideSide">
    <header
      class="h-20 px-10 md:px-16 flex justify-between items-center fixed w-full bg-[#22203033] z-10"
    >
      <h2 class="text-sm uppercase text-[#DDCCAA] font-bold hidden md:block">
        Movie quotes
      </h2>
      <img
        class="block md:hidden"
        src="@/assets/images/responsiveNavButton.svg"
        alt="responsiveNavButton"
        @click="showSide"
        @click.stop=""
      />
      <nav class="flex items-center space-x-8">
        <img
          v-if="$route.name === 'newsFeed'"
          class="md:hidden"
          src="@/assets/images/loop.svg"
          alt="loop"
          @click="showSearch"
          @click.stop=""
        />
        <div class="relative">
          <img src="@/assets/images/notificaton.png" alt="bell" />
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
          <img src="@/assets/images/arrow-down.png" alt="arrow" />
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
        class="h-[60vh] w-[87vw] fixed z-10 md:mt-10 bg-[#11101A] md:block md:fixed md:z-0 md:h-full md:w-[30%]"
        @click.stop=""
      >
        <div class="flex space-x-5 ml-11 mt-11">
          <img
            class="rounded-full h-10"
            src="@/assets/images/profile.jpg"
            alt="profile"
          />
          <div>
            <p class="text-xl text-white">Nino Tabagari</p>
            <router-link class="text-sm text-[#CED4DA]" :to="{ name: 'home' }"
              >Edit your profile</router-link
            >
          </div>
        </div>
        <div class="flex space-x-10 ml-11">
          <img src="@/assets/images/house.svg" alt="house" />
          <router-link
            class="text-xl text-white my-10"
            :to="{ name: 'newsFeed' }"
            >News feed</router-link
          >
        </div>
        <div class="flex space-x-10 ml-11">
          <img src="@/assets/images/camera.svg" alt="camera" />
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
        class="h-[60vh] w-full fixed z-10 bg-[#11101A]"
        @click.stop=""
      >
        <div
          class="flex space-x-5 pl-11 py-5 items-center border-b border-[rgba(239, 239, 239, 0.3)]"
        >
          <img
            class="h-3"
            src="@/assets/images/arrow-left.svg"
            alt="profile"
            @click="hideSearch"
          />
          <input
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
    <div class="w-full flex justify-center pt-16">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const logOut = async () => {
  try {
    const response = await axios.post("logout");
    console.log(response);
    document.cookie =
      "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

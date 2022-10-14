<template>
  <header class="pb-10 flex justify-between fixed md:w-[96%]">
    <h2 class="text-sm uppercase text-[#DDCCAA]">Movie quotes</h2>
    <nav class="flex items-center space-x-8">
      <div class="relative">
        <img src="@/assets/images/notificaton.png" alt="bell" />
        <span
          class="absolute -top-2 right-0 rounded-full bg-[#E33812] text-white p-1 text-[0.6rem]"
          >3</span
        >
      </div>
      <div class="hidden w-14 lg:flex items-center justify-between">
        <select id="" class="selecttxt text-white" name="">
          <option class="text-black" selected value="">Eng</option>
          <option class="text-black" value="">ქარ</option>
        </select>
        <img src="@/assets/images/arrow-down.png" alt="arrow" />
      </div>
      <button
        :to="{ name: 'home' }"
        class="text-white text-sm border border-white py-2 px-3 rounded-[4px]"
        @click="logOut"
      >
        Log Out
      </button>
    </nav>
  </header>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
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
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

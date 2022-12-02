<template>
  <h1 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:mt-14">
    {{ title }}
  </h1>
  <p class="text-[#6C757D] text-center mb-6">{{ text }}</p>
  <slot></slot>
  <button class="text-white py-2 px-3 bg-[#E31221] rounded-md w-full mt-6">
    {{ buttonText }}
  </button>
  <button
    type="button"
    class="text-white py-2 px-3 border border-gray-500 rounded-md w-full mt-6"
    @click="login"
  >
    <span class="relative flex items-center justify-center space-x-1">
      <img
        class="w-6 h-6"
        src="@/assets/images/google-icon.png"
        alt="google sign"
      />
      <span>{{ $t("google") }}</span></span
    >
  </button>

  <p class="text-gray-500 mt-4 lg:mt-8 text-center mb-10">
    {{ account }}
    <router-link :to="{ name: route }" class="text-[#0D6EFD] underline">
      {{ auth }}</router-link
    >
  </p>
</template>

<script setup>
import { defineProps } from "vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { googleTokenLogin } from "vue3-google-login";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
  account: { type: String, required: true },
  route: { type: String, required: true },
  auth: { type: String, required: true }
});
const login = async () => {
  try {
    const response = await googleTokenLogin();
    const resp = await axios.post("google-login", {
      token: response.access_token
    });
    await store.getAuthUser();
    router.replace({ name: "newsFeed" });
  } catch (error) {
    authStore.authenticated = false;
    console.log(error);
  }
};
</script>

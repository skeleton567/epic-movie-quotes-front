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
    @click="googleAuth"
  >
    <span class="relative flex items-center justify-center space-x-1">
      <img
        class="w-6 h-6"
        src="@/assets/images/google-icon.png"
        alt="google sign"
      />
      <span>Sign up with Google</span></span
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
import gAuth from "vue3-google-auth";
import axios from "@/config/axios/index.js";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const $gAuth = gAuth.useGAuth();
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
  account: { type: String, required: true },
  route: { type: String, required: true },
  auth: { type: String, required: true }
});
const googleAuth = async () => {
  try {
    const googleUser = await $gAuth.signIn();
    if (!googleUser) {
      return null;
    }
    const user = googleUser.getBasicProfile().getEmail();
    const response = await axios.post("google-login", { email: user });
    console.log(response);
    setJwtToken(response.data.access_token, response.data.expires_in);
    router.replace({ name: "newsFeed" });
  } catch (error) {
    console.log(error);
    return null;
  }
};
</script>

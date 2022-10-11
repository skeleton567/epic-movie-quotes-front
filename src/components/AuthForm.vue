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
  >
    <span class="relative">
      <img
        class="w-6 h-6 absolute right-[185px] top-[1px]"
        src="@/assets/images/google-icon.png"
        alt="google sign"
      />
      Sign up with Google</span
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

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
  account: { type: String, required: true },
  route: { type: String, required: true },
  auth: { type: String, required: true }
});
</script>

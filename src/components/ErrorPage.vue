<template>
  <div class="h-[100vh] flex flex-col justify-center items-center">
    <slot></slot>
    <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:mt-8">
      {{ title }}
    </h2>
    <p class="text-white text-center mt-6">{{ text }}</p>
    <router-link
      :to="url"
      class="text-white py-2 px-3 bg-[#E31221] rounded-md my-6 lg:my-12 text-sm lg:text-base"
    >
      {{ $t("Go_Home") }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true }
});
const authStore = useAuthStore();
const url = computed(() => {
  if (authStore.authenticated) return { name: "newsFeed" };
  return { name: "home" };
});
</script>

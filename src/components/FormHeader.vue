<template>
  <div class="flex items-center h-20 border-b border-[#EFEFEF33] px-8">
    <h1 class="text-3xl w-full text-center">{{ title }}</h1>
    <router-link :to="link"><x-icon /></router-link>
  </div>
  <div class="px-8 mt-9">
    <div class="flex items-center space-x-5 mb-3">
      <profile-picture :image="store.profile" />
      <h2>{{ store?.name ? store.name : store.email }}</h2>
    </div>
  </div>
</template>

<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const props = defineProps({
  title: { type: String, required: true },
  link: { type: Object, required: true }
});
</script>

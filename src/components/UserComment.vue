<template>
  <div class="py-5 border-y border-[#EFEFEF4D]">
    <div class="flex items-center space-x-4">
      <profile-picture :image="store.profile" />
      <p class="text-white">{{ user }}</p>
    </div>
    <p class="text-white break-words">
      {{ comment }}
    </p>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const props = defineProps({
  user: { type: String, required: true },
  comment: { type: String, required: false }
});
</script>

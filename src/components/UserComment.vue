<template>
  <div class="py-5 border-y border-[#EFEFEF4D]">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <profile-picture :image="image" />
        <p class="text-white">{{ user }}</p>
      </div>
      <x-icon :height="true" @click-event="$emit('delete-event')" />
    </div>
    <p class="text-white break-words mt-1 md:mt-2">
      <span class="w-[90%]">{{ comment }}</span>
    </p>
  </div>
</template>

<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const props = defineProps({
  user: { type: String, required: true },
  comment: { type: String, required: false },
  image: { type: String, required: false }
});
</script>

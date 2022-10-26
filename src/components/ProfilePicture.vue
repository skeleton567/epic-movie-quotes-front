<template>
  <img
    class="rounded-full"
    :class="height"
    :src="profilePicture"
    alt="profile"
  />
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;

const props = defineProps({
  image: { type: String, required: false },
  height: { type: String, required: false, default: "h-10" }
});
const profilePicture = computed(() => {
  return props.image
    ? `${link}${props.image}`
    : "src/assets/images/profile.jpg";
});
</script>

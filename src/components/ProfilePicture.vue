<template>
  <img
    v-if="image"
    class="rounded-full"
    :class="classes"
    :src="`${link}${image}`"
    alt="profile"
  />
  <img
    v-else
    class="rounded-full"
    :class="classes"
    src="@/assets/images/profile.jpg"
    alt="profile"
  />
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;

const props = defineProps({
  image: { type: String, required: false },
  height: { type: String, required: false, default: "h-10 w-10" },
  border: { type: String, required: false, default: "" }
});
const profilePicture = computed(() => {
  return props.image
    ? `${link}${props.image}`
    : "../src/assets/images/profile.jpg";
});
const classes = computed(() => {
  return props.height + " " + props.border;
});
</script>

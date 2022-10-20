<template>
  <img
    class="rounded-full"
    :class="height"
    :src="`src/assets/images/${image}`"
    alt="profile"
  />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  image: { type: String, required: true },
  height: { type: String, required: false, default: "h-10" }
});
</script>

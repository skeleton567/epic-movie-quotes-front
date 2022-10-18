<template>
  <img
    class="rounded-full h-10"
    :src="`src/assets/images/${image}`"
    alt="profile"
  />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  image: { type: String, required: true }
});
</script>

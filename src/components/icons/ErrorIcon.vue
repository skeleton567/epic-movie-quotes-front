<template>
  <div class="relative">
    <img
      v-if="$route.name === 'notAuthorized'"
      class="absolute top-[25%] right-[15%] z-0"
      src="@/assets/images/Union.svg"
      alt="image"
    />
    <img
      class="z-10 relative"
      :src="'src/assets/images/' + image"
      alt="image"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  image: { type: String, required: true }
});
</script>

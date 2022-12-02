<template>
  <div
    class="h-[100vh] fit pt-[50%] pl-[10%] lg:pt-[200px] lg:pl-44"
    :class="paralaxImage"
  >
    <div
      class="max-w-[200px] md:max-w-[500px] lg:max-w-[900px] flex space-x-1"
      :class="margin"
    >
      <div class="flex items-center h-4 lg:h-12">
        <div class="w-3 lg:w-14 h-1 bg-white"></div>
      </div>
      <div>
        <blockquote class="text-white text-sm lg:text-5xl">
          {{ quote }}
        </blockquote>
        <address class="text-white text-xs lg:text-3xl mt-4">
          {{ movie }}
        </address>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  scrolled: { type: Boolean, required: true },
  bg: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true },
  margin: { type: String, required: true }
});
const paralaxImage = computed(() => {
  if (props.scrolled) {
    return `paralax ${props.bg}`;
  }
  return props.bg;
});
</script>

<style scoped>
.fit {
  background-size: 100% 100%;
}
.paralax {
  background-position: center center;
  background-attachment: fixed;
}
</style>

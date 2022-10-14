<template>
  <div class="h-[100vh] flex flex-col justify-center items-center">
    <div class="relative">
      <img
        v-if="$route.name === 'notAuthorized'"
        class="absolute top-[25%] right-[15%] z-0"
        src="@/assets/images/union.png"
        alt="image"
      />
      <img
        class="z-10 relative"
        :src="'src/assets/images/' + image"
        alt="image"
      />
    </div>
    <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:mt-8">
      {{ title }}
    </h2>
    <p class="text-white text-center mt-6">{{ text }}</p>
    <router-link
      :to="url"
      class="text-white py-2 px-3 bg-[#E31221] rounded-md my-6 lg:my-12 text-sm lg:text-base"
    >
      Return Home
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { computed } from "vue";
import { getJwtToken } from "@/helpers/jwt";

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true }
});
const url = computed(() => {
  if (getJwtToken()) return { name: "newsFeed" };
  return { name: "home" };
});
</script>

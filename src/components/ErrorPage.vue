<template>
  <div class="h-[100vh] flex flex-col justify-center items-center">
    <error-icon :image="image" />
    <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:mt-8">
      {{ title }}
    </h2>
    <p class="text-white text-center mt-6">{{ text }}</p>
    <router-link
      :to="url"
      class="text-white py-2 px-3 bg-[#E31221] rounded-md my-6 lg:my-12 text-sm lg:text-base"
    >
      {{ $t("GoHome") }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { computed } from "vue";
import { getJwtToken } from "@/helpers/jwt";
import ErrorIcon from "@/components/icons/ErrorIcon.vue";

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

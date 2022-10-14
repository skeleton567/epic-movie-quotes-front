<template>
  <form-wrap>
    <div
      class="flex flex-col justify-center items-center h-[100vh] lg:h-auto my-10 mx-10"
    >
      <img :src="'src/assets/images/' + image" alt="image" />
      <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:my-8">
        {{ title }}
      </h2>
      <p class="text-[#6C757D] text-center mb-6">{{ text }}</p>
      <router-link
        :to="url"
        class="text-white py-2 px-3 bg-[#E31221] rounded-md w-full my-6"
      >
        {{ buttonText }}
      </router-link>
      <router-link
        v-if="routeName"
        class="text-[#6C757D] text-center block"
        :to="{ name: 'login' }"
        >Skip, I will confirm later</router-link
      >
    </div>
  </form-wrap>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
  image: { type: String, required: true }
});
const route = useRoute();
const routeName = computed(() => {
  return route.name === "emailSent";
});
</script>

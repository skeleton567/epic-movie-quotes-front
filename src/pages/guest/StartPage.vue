<template>
  <router-view></router-view>
  <div :class="{ hidden: routeName }" class="lg:block">
    <div class="h-[80vh] pt-8 px-8 lg:px-16 paralax">
      <the-navigation></the-navigation>
      <div class="h-[60vh] w-full flex justify-center items-center">
        <div
          class="flex flex-col items-center space-y-6 w-[400px] lg:w-[800px]"
        >
          <h1 class="text-[#DDCCAA] text-2xl lg:text-6xl text-center">
            {{ $t("findQuote") }}
          </h1>
          <router-link
            :to="{ name: 'registration' }"
            class="text-white py-2 px-3 bg-[#E31221] rounded-[4px] lg:text-xl"
          >
            Get Started
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-for="quote in store.quotes"
      :key="quote.id"
      class="h-[100vh] fit pt-[50%] pl-[10%] lg:pt-[200px] lg:pl-44"
      :class="{ paralax: scrolled }"
      :style="{ backgroundImage: 'url(' + url(quote) + ')' }"
    >
      <div
        class="max-w-[200px] md:max-w-[500px] lg:max-w-[900px] flex space-x-1"
      >
        <div class="flex items-center h-4 lg:h-12">
          <div class="w-3 lg:w-14 h-1 bg-white"></div>
        </div>
        <div>
          <blockquote class="text-white text-sm lg:text-5xl">
            “{{ quote.quote[$i18n.locale] }}”
          </blockquote>
          <address class="text-white text-xs lg:text-3xl mt-4">
            {{ quote.movie[$i18n.locale] }}
          </address>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuotesStore } from "@/stores/quotes.js";
let scrolled = ref(false);
const store = useQuotesStore();
const route = useRoute();
const routeName = computed(() => {
  return route.name !== "home";
});
window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight * 0.8) {
    scrolled.value = true;
  } else {
    scrolled.value = false;
  }
});
onMounted(() => store.getQuotes());
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const url = (quote) => {
  return quote.image
    ? `${link}${quote.image}`
    : "../src/assets/images/no-image.jpg";
};
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

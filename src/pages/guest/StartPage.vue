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
            {{ $t("find_Quote") }}
          </h1>
          <router-link
            :to="{ name: 'registration' }"
            class="text-white py-2 px-3 bg-[#E31221] rounded-[4px] lg:text-xl"
          >
            {{ $t("Get_Started") }}
          </router-link>
        </div>
      </div>
    </div>
    <quote-compilation
      :scrolled="scrolled"
      bg="bg-[url('@/assets/images/interstelar.png')]"
      :quote="$t('interstellar_quote')"
      :movie="$t('interstellar_title')"
      margin="mt-48"
    />
    <quote-compilation
      :scrolled="scrolled"
      bg="bg-[url('@/assets/images/pair.png')]"
      :quote="$t('tenenbaums_quote')"
      :movie="$t('tenenbaums_title')"
      margin="mt-48"
    />
    <quote-compilation
      :scrolled="scrolled"
      bg="bg-[url('@/assets/images/lord.png')]"
      :quote="$t('lord_quote')"
      :movie="$t('lord_title')"
      margin="mt-72"
    />
  </div>
</template>

<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import QuoteCompilation from "@/components/QuoteCompilation.vue";
let scrolled = ref(false);
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

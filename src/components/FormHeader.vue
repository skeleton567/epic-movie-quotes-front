<template>
  <div class="flex items-center h-20 border-b border-[#EFEFEF33] px-8 w-full">
    <div v-if="correctRoute" class="flex space-x-3 w-20">
      <router-link v-if="route.name === 'viewQuote'" :to="editLink"
        ><pencil-component classes="w-5 h-5"
      /></router-link>
      <div v-if="route.name === 'viewQuote'" class="border-r"></div>
      <div @click="deleteQuote">
        <trash-component classes="w-5 h-5" />
      </div>
    </div>
    <h1 class="text-3xl w-full text-center">{{ title }}</h1>
    <router-link :to="link"><x-icon @click-event="reset" /></router-link>
  </div>
  <div class="px-8 mt-9">
    <div class="flex items-center space-x-5 mb-3">
      <profile-picture :image="store.profile" />
      <h2>{{ store?.name ? store.name : store.email }}</h2>
    </div>
  </div>
</template>

<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import TrashComponent from "@/components/icons/TrashComponent.vue";
import PencilComponent from "@/components/icons/PencilComponent.vue";
import { useUserStore } from "@/stores/user.js";
import { useQuotesStore } from "@/stores/quotes.js";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { useMoviesStore } from "@/stores/movies.js";
const movieStore = useMoviesStore();
const router = useRouter();
const route = useRoute();
const quoteStore = useQuotesStore();
const store = useUserStore();
const props = defineProps({
  title: { type: String, required: true },
  link: { type: Object, required: true },
  editLink: { type: Object, required: false }
});
const deleteQuote = async () => {
  await quoteStore.delete();
  router.push(props.link);
};
const correctRoute = computed(() => {
  return route.name === "editQuote" || route.name === "viewQuote";
});
const reset = () => {
  movieStore.upload = "Upload_Image";
  movieStore.uploadBig = "Dragn_Drop";
};
</script>

<template>
  <div class="flex space-x-3 bg-[#24222F] rounded-xl p-2" :class="classes">
    <router-link :to="{ name: 'editMovie', query: { id: route.query.id } }"
      ><pencil-component classes="h-5 w-5"
    /></router-link>
    <div class="border-r"></div>
    <trash-component classes="h-5 w-5" @click-event="deleteMovie" />
  </div>
</template>

<script setup>
import TrashComponent from "@/components/icons/TrashComponent.vue";
import PencilComponent from "@/components/icons/PencilComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movies.js";
import axios from "@/config/axios/index.js";
const route = useRoute();
const movieStore = useMoviesStore();
const router = useRouter();
const props = defineProps({
  classes: { type: String, required: false }
});
const deleteMovie = async () => {
  try {
    await axios.delete(`movies/${movieStore.movie.id}`);
    router.push({ name: "movieList" });
  } catch (error) {
    console.log(error);
  }
};
</script>

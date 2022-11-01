<template>
  <dashboard-wrap>
    <div class="px-10 mt-8">
      <img
        :src="
          movieStore.movie.image
            ? `${link}${movieStore.movie.image}`
            : '../src/assets/images/no-image.jpg'
        "
        alt="movie"
        class="rounded-xl w-full max-h-60"
      />
      <h1 class="text-2xl text-[#DDCCAA] my-6">
        {{ movieStore.movie.title }} <span>({{ movieStore.movie.year }})</span>
      </h1>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <p
          v-for="category in movieStore.movie.categories"
          class="w-20 text-center bg-[#6C757D] rounded"
        >
          {{ category.category }}
        </p>
      </div>
      <div class="ml-3">
        <p class="my-5">
          <span class="text-[#CED4DA]">Director: </span>
          <span> {{ movieStore.movie.director }}</span>
        </p>
        <p class="mb-5">
          <span class="text-[#CED4DA]">Budget: </span>
          <span> {{ movieStore.movie.budget }}$</span>
        </p>
        <p>{{ movieStore.movie.description }}</p>
      </div>
      <div class="border-b pb-10 border-[#54535A] my-10">
        <router-link
          :to="{ name: 'addQuote', query: { id: movieStore.movie?.id } }"
          class="w-40 text-center border border-white py-2 px-1 rounded flex justify-center items-center space-x-3 bg-[#E31221]"
        >
          <plus-icon /> <span>Add quote</span>
        </router-link>
      </div>
      <div>
        <h2 class="text-2xl">All quotes</h2>
        <p class="mb-8 mt-2">(Total {{ movieStore.movie?.quote?.length }})</p>
      </div>
    </div>
    <movie-quote v-for="quote in movieStore.movie?.quote" :quote="quote" />
  </dashboard-wrap>
</template>

<script setup>
import { useRoute } from "vue-router";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MovieQuote from "@/components/MovieQuote.vue";
import { useMoviesStore } from "@/stores/movies.js";
import { onBeforeMount } from "vue";
const movieStore = useMoviesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const route = useRoute();
onBeforeMount(() => {
  movieStore.getMovie(route.query.id);
});
</script>

<template>
  <dashboard-wrap>
    <quote-crud>
      <new-quote-form
        :movie-id="movieStore.movie.id"
        :link="{ name: 'viewMovie', query: { id: movieStore.movie.id } }"
        title="Add Quote"
      >
        <div class="px-10">
          <div class="bg-black rounded py-4 px-2">
            <div class="flex space-x-4">
              <img
                :src="
                  movieStore.movie.image
                    ? `${link}${movieStore.movie.image}`
                    : '../src/assets/images/no-image.jpg'
                "
                class="w-24 h-24 rounded-xl"
                alt="movie"
              />
              <div>
                <h1 class="text-[#DDCCAA]">
                  {{ movieStore.movie.title }}
                  <span>({{ movieStore.movie.year }})</span>
                </h1>
                <p class="my-2">
                  <span class="text-[#CED4DA]">Director: </span>
                  <span> {{ movieStore.movie.director }}</span>
                </p>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <p
                    v-for="category in movieStore.movie.categories"
                    class="w-[70px] text-center bg-[#6C757D] rounded text-sm"
                  >
                    {{ category.category }}
                  </p>
                </div>
              </div>
              <div class="ml-3"></div>
            </div>
          </div>
        </div>
      </new-quote-form>
    </quote-crud>
  </dashboard-wrap>
</template>

<script setup>
import NewQuoteForm from "@/components/NewQuoteForm.vue";
import { useMoviesStore } from "@/stores/movies.js";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import QuoteCrud from "@/components/QuoteCrud.vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const route = useRoute();
const movieStore = useMoviesStore();
onBeforeMount(() => {
  movieStore.getMovie(route.query.id);
});
</script>

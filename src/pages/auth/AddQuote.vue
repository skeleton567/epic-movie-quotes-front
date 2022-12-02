<template>
  <dashboard-wrap>
    <quote-crud>
      <new-quote-form
        v-if="movieStore.movie.id"
        :id="movieStore.movie.user_id"
        :movie-id="movieStore.movie.id"
        :link="{ name: 'viewMovie', params: { id: movieStore.movie.id } }"
        :title="$t('Add_Quote')"
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
                  {{ movieStore.movie?.title?.[$i18n.locale] }}
                  <span>({{ movieStore.movie.year }})</span>
                </h1>
                <p class="my-2">
                  <span class="text-[#CED4DA]">{{ $t("director") }}: </span>
                  <span> {{ movieStore.movie?.director?.[$i18n.locale] }}</span>
                </p>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <p
                    v-for="category in movieStore.movie.categories"
                    class="w-[100px] text-center bg-[#6C757D] rounded text-sm"
                  >
                    {{ category.category[$i18n.locale] }}
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
  movieStore.getMovie(route.params.id);
});
</script>

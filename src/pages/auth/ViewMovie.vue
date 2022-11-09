<template>
  <dashboard-wrap>
    <div
      class="md:px-0 mt-8 lg:block md:w-full md:pl-96 mb-8"
      :class="{ hidden: $route.name === 'editMovie' }"
    >
      <h1 class="hidden md:block text-2xl">Movie discription</h1>
      <div class="px-10 md:px-0 mt-8 w-full">
        <div class="md:flex md:space-x-10">
          <img
            :src="
              movieStore?.movie?.image
                ? `${link}${movieStore.movie.image}`
                : '../src/assets/images/no-image.jpg'
            "
            alt="movie"
            class="rounded-xl w-full md:w-full md:max-w-[300px] lg:max-w-[800px] lg:w-[full] max-h-60 md:h-[400px] md:max-h-[400px]"
          />
          <div>
            <div
              class="flex justify-between h-10 items-center mt-5 md:mt-0 gap-5"
            >
              <h1 class="text-2xl text-[#DDCCAA] my-6 md:my-0 mb-10 md:h-full">
                {{ movieStore?.movie?.title?.[$i18n.locale] }}
                <span>({{ movieStore?.movie?.year }})</span>
              </h1>
              <edit-delete classes="md:flex hidden" />
            </div>
            <div class="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              <p
                v-for="category in movieStore?.movie?.categories"
                class="w-24 text-center bg-[#6C757D] rounded"
              >
                {{ category.category?.[$i18n.locale] }}
              </p>
            </div>
            <div class="ml-3 md:ml-0">
              <p class="my-5">
                <span class="text-[#CED4DA]">Director: </span>
                <span> {{ movieStore?.movie?.director?.[$i18n.locale] }}</span>
              </p>
              <p class="mb-5">
                <span class="text-[#CED4DA]">Budget: </span>
                <span> {{ movieStore?.movie?.budget }}$</span>
              </p>
              <p class="max-w-xs">
                {{ movieStore?.movie?.description?.[$i18n.locale] }}
              </p>
            </div>
          </div>
        </div>
        <div class="md:w-full md:max-w-[300px] lg:max-w-[800px] lg:w-[full]">
          <div class="md:flex md:flex-row-reverse md:w-full md:gap-6">
            <div
              class="border-b md:border-l md:border-b-0 md:pl-5 md:pb-0 pb-10 border-[#54535A] my-10 md:w-full md:max-w-[300px] lg:max-w-[800px] lg:w-[full] flex justify-between"
            >
              <router-link
                :to="{ name: 'addQuote', query: { id: movieStore.movie?.id } }"
                class="w-40 text-center border border-white py-2 px-1 rounded flex justify-center items-center space-x-3 bg-[#E31221]"
              >
                <plus-icon /> <span>Add quote</span>
              </router-link>
              <edit-delete classes="md:hidden" />
            </div>
            <div class="md:flex md:space-x-3 items-center shrink-0">
              <h2 class="text-2xl">All quotes</h2>
              <p class="mb-8 mt-2 md:m-0 md:text-2xl">
                (Total {{ movieStore.movie?.quote?.length }})
              </p>
            </div>
          </div>
          <movie-quote
            v-for="quote in movieStore?.movie?.quote"
            :key="quote.id"
            :quote="quote"
            :movie_id="movieStore?.movie?.id"
          />
        </div>
      </div>
    </div>
  </dashboard-wrap>
  <router-view></router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MovieQuote from "@/components/MovieQuote.vue";
import { useMoviesStore } from "@/stores/movies.js";
import EditDelete from "@/components/EditDelete.vue";
const movieStore = useMoviesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const route = useRoute();
movieStore.getMovie(route.query.id);
</script>

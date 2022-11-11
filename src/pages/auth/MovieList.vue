<template>
  <router-view></router-view>
  <dashboard-wrap>
    <div
      class="px-10 md:px-0 mt-8 lg:block md:w-full md:ml-96 md:mr-10"
      :class="{ hidden: $route.name === 'addMovie' }"
    >
      <div class="flex justify-between items-center md:h-10 mb-10">
        <div class="md:flex md:space-x-3 md:items-center shrink-2 basis-80">
          <h2 class="text-xl">{{ $t("My_List") }}</h2>
          <p class="mt-5 md:mb-0 md:mt-0">
            ({{ $t("total") }} {{ movieStore?.movies?.length }})
          </p>
        </div>
        <div
          class="flex flex-col justify-end items-end md:flex md:flex-row-reverse space-x-3 md:justify-center md:items-center"
        >
          <router-link
            :to="{ name: 'addMovie' }"
            class="w-24 h-10 text-center border border-white py-2 px-1 rounded flex justify-center items-center space-x-3 bg-[#E31221]"
          >
            <plus-icon />
            <span :class="{ 'text-xs': $i18n.locale === 'ka' }">{{
              $t("add")
            }}</span>
          </router-link>
          <div class="flex space-x-4 mt-3 md:w-40">
            <search-icon @showEvent="openedSearch = !openedSearch" />
            <input
              v-if="openedSearch"
              v-model="searchValue"
              type="text"
              class="outline-none bg-inherit text-white w-full"
              :class="{
                'border-b border-[#EFEFEF4D] md:basis-28 ': openedSearch
              }"
            />
            <p
              v-else
              class="text-sm md:text-base w-full"
              @click="openedSearch = !openedSearch"
            >
              {{ $t("search") }}
            </p>
          </div>
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5">
        <router-link
          v-for="movie in searchesMovies"
          :key="movie.id"
          :to="{ name: 'viewMovie', query: { id: movie.id } }"
        >
          <div class="mb-12">
            <div>
              <img
                :src="
                  movie.image
                    ? `${link}${movie.image}`
                    : 'src/assets/images/no-image.jpg'
                "
                alt="movie"
                class="w-full md:h-96 rounded-xl mb-4"
              />
            </div>

            <p class="mb-5">
              {{ movie.title[$i18n.locale] }} <span>({{ movie.year }})</span>
            </p>
            <p class="flex space-x-4">
              <span>{{ movie?.quote?.length }}</span>
              <comment-notification />
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </dashboard-wrap>
</template>

<script setup>
import CommentNotification from "@/components/icons/CommentNotification.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { computed } from "vue";
import { useMoviesStore } from "@/stores/movies.js";
import { usePostStore } from "@/stores/post.js";
import { onMounted, ref } from "vue";
const postStore = usePostStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const movieStore = useMoviesStore();
let searchValue = ref("");
const searchesMovies = computed(() => {
  return movieStore?.movies?.filter((movie) =>
    movie?.title[postStore.locale]
      ?.toLowerCase()
      .includes(searchValue.value.toLowerCase())
  );
});
const openedSearch = ref(false);
onMounted(async () => {
  await movieStore.getMovies();
});
</script>

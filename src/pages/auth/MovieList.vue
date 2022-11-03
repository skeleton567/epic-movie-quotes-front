<template>
  <dashboard-wrap>
    <div
      class="px-10 md:px-0 mt-8 lg:block md:w-full md:ml-96 md:mr-10"
      :class="{ hidden: $route.name === 'addMovie' }"
    >
      <div class="flex justify-between items-center md:h-10 mb-10">
        <div class="md:flex md:space-x-3 md:items-center shrink-2 basis-80">
          <h2 class="text-xl">My list of movies</h2>
          <p class="mt-5 md:mb-0 md:mt-0">(Total {{ movies.length }})</p>
        </div>
        <div
          class="flex flex-col justify-end items-end md:flex md:flex-row-reverse space-x-3 md:justify-center md:items-center"
        >
          <router-link
            :to="{ name: 'addMovie' }"
            class="w-24 h-10 text-center border border-white py-2 px-1 rounded flex justify-center items-center space-x-3 bg-[#E31221]"
          >
            <plus-icon /> <span>Add</span>
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
              Search
            </p>
          </div>
        </div>
      </div>
      <div class="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5">
        <router-link
          v-for="movie in searchesMovies"
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
              {{ movie.title }} <span>({{ movie.year }})</span>
            </p>
            <p class="flex space-x-4">
              <span>{{ commentLength(movie) }}</span>
              <comment-notification />
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </dashboard-wrap>
</template>

<script setup>
import CommentNotification from "@/components/icons/CommentNotification.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { computed } from "vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const store = useUserStore();
const movies = ref([]);
let searchValue = ref("");
const searchesMovies = computed(() => {
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});
const openedSearch = ref(false);
const getMovies = async () => {
  try {
    await store.getAuthUser();
    const response = await axios.get(`movies`);
    console.log(response);
    movies.value.push(...response.data);
  } catch (error) {
    console.log(error);
  }
};
getMovies();
const commentLength = (movie) => {
  let count = 0;
  for (let quote of movie.quote) {
    count += quote.comment.length;
  }
  return count;
};
</script>

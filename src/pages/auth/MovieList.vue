<template>
  <dashboard-wrap>
    <div
      class="px-10 mt-8 lg:block"
      :class="{ hidden: $route.name === 'addMovie' }"
    >
      <div class="flex justify-between">
        <h2 class="text-xl">My list of movies</h2>
        <router-link
          :to="{ name: 'addMovie' }"
          class="w-24 text-center border border-white py-2 px-1 rounded flex justify-center items-center space-x-3 bg-[#E31221]"
        >
          <plus-icon /> <span>Add</span>
        </router-link>
      </div>
      <p class="mb-8">(Total {{ movies.length }})</p>
      <router-link
        v-for="movie in movies"
        :to="{ name: 'viewMovie', query: { id: movie.id } }"
      >
        <div class="mb-12">
          <img
            :src="
              movie.image
                ? `${link}${movie.image}`
                : 'src/assets/images/no-image.jpg'
            "
            alt="movie"
            class="rounded-xl mb-4"
          />
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
  </dashboard-wrap>
  <router-view></router-view>
</template>

<script setup>
import CommentNotification from "@/components/icons/CommentNotification.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const store = useUserStore();
const movies = ref([]);
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

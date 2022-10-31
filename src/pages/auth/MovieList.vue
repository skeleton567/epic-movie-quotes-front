<template>
  <dashboard-wrap>
    <div class="px-10 mt-8">
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

      <div v-for="movie in movies" class="mb-4">
        <img :src="`${link}${movie.image}`" alt="movie" />
        <p>
          {{ movie.title }} <span>({{ movie.year }})</span>
        </p>
      </div>
    </div>
  </dashboard-wrap>
  <router-view></router-view>
</template>

<script setup>
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
    const response = await axios.get(`movies`, {
      params: {
        user_id: store.id
      }
    });
    console.log(response);
    movies.value.push(...response.data);
  } catch (error) {
    console.log(error);
  }
};
getMovies();
</script>

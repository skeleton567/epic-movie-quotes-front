<template>
  <movie-form
    title="Add Movie"
    :link="{ name: 'movieList' }"
    :categories="[]"
    @submit-event="submit"
  >
    <file-upload />
  </movie-form>
</template>

<script setup>
import MovieForm from "@/components/MovieForm.vue";
import { useUserStore } from "@/stores/user.js";
import FileUpload from "@/components/FileUpload.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movies.js";
const movieStore = useMoviesStore();
movieStore.movie = null;
const router = useRouter();
const store = useUserStore();
const submit = async (values, actions, categories) => {
  try {
    const fd = new FormData();
    for (let value in values) {
      fd.set(value, values[value]);
    }
    if (movieStore.file) fd.set("image", movieStore.file);
    fd.set("user_id", store.id);
    fd.set("categories", JSON.stringify(categories));
    console.log(fd);
    const response = await axios.post("movies", fd);
    await movieStore.getMovies();
    router.push({
      name: "movieList"
    });
    movieStore.upload = "Upload image";
    movieStore.uploadBig = "Drag & drop your image here or";
    movieStore.file = null;
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
</script>

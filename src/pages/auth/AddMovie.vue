<template>
  <movie-form
    :title="$t('Add_Movie')"
    :link="{ name: 'movieList' }"
    :categories="categories"
    @submit-event="submit"
  >
    <file-upload />
  </movie-form>
</template>

<script setup>
import MovieForm from "@/components/MovieForm.vue";
import FileUpload from "@/components/FileUpload.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movies.js";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
const movieStore = useMoviesStore();
movieStore.movie = null;
const categories = ref([]);
const router = useRouter();
const submit = async (values, actions, categories) => {
  try {
    const fd = new FormData();
    for (let value in values) {
      fd.set(value, values[value]);
    }
    if (movieStore.file) fd.set("image", movieStore.file);
    fd.set("categories", JSON.stringify(categories));
    console.log(JSON.stringify(categories));
    const response = await axios.post("movies", fd);
    await movieStore.getMovies();
    router.push({
      name: "movieList"
    });
    movieStore.upload = "Upload_Image";
    movieStore.uploadBig = "Dragn_Drop";
    movieStore.file = null;
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError][0][locale.value]);
    }
  }
};
</script>

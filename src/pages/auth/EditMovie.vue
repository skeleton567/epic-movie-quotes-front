<template>
  <movie-form
    :id="movieStore.movie.user_id"
    :title="$t('Edit_Movie')"
    :link="{ name: 'viewMovie' }"
    @submit-event="submit"
  >
    <image-upload :image="movie" @show-image="showImage" />
  </movie-form>
</template>

<script setup>
import MovieForm from "@/components/MovieForm.vue";
import { useUserStore } from "@/stores/user.js";
import axios from "@/config/axios/index.js";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movies.js";
import ImageUpload from "@/components/ImageUpload.vue";
import { computed, ref } from "vue";
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const movieStore = useMoviesStore();
const router = useRouter();
const store = useUserStore();
const submit = async (values, actions, categories) => {
  try {
    const fd = new FormData();
    fd.append("_method", "PATCH");
    for (let value in values) {
      fd.set(value, values[value]);
    }
    fd.set("categories", JSON.stringify(categories));
    if (movieStore.file) fd.set("image", movieStore.file);
    const response = await axios.post(`movies/${route.params.id}`, fd);
    await movieStore.getMovie(route.params.id);
    router.push({ name: "viewMovie", params: { id: movieStore.movie.id } });
    movieStore.upload = "Upload_Image";
    movieStore.uploadBig = "Dragn_Drop";
    movieStore.file = null;
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
const newImg = ref(null);
const movie = computed(() => {
  if (newImg.value) {
    return newImg.value;
  } else if (movieStore?.movie?.image) {
    return `${link}${movieStore?.movie?.image}`;
  } else {
    ("../src/assets/images/no-image.jpg");
  }
});
const showImage = (event) => {
  newImg.value = URL.createObjectURL(event);
  movieStore.file = event;
};
const route = useRoute();
movieStore.getMovie(route.params.id);
</script>

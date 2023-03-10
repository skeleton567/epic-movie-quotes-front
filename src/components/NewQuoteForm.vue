<template>
  <form-header :link="link" :title="title" />
  <slot></slot>
  <Form class="px-10 mt-8" @submit="submit">
    <textarea-component
      name="quote_en"
      placeholder="Create new quote"
      rule="required|alpha_spaces"
      label="Eng"
    />
    <textarea-component
      name="quote_ka"
      placeholder="ახალი ციტატა"
      rule="required|georgian"
      label="ქარ"
    />
    <file-upload />
    <div
      v-if="$route.name === 'writeQuote'"
      class="flex items-center border border-[#6C757D] px-4 py-5 rounded bg-black mt-5"
    >
      <div class="w-full flex items-center space-x-4">
        <camera-icon />
        <Field
          id=""
          as="select"
          class="selecttxt w-full focus:appearance-none focus:outline-none text-white"
          name="movie_id"
        >
          <option class="bg-black mb-2" selected disabled value="">
            Choose Movie
          </option>
          <option
            v-for="movie in movies"
            class="bg-black mb-2"
            :value="movie.id"
          >
            {{ movie.title[$i18n.locale] }}
          </option>
        </Field>
      </div>
      <arrow-down />
    </div>
    <ErrorMessage
      class="text-red-400 text-xs lg:text-sm px-5"
      name="movie_id"
    />
    <button
      :class="{
        'pointer-events-none': store.id !== id
      }"
      class="w-full bg-[#E31221] rounded text-xl py-3 mt-4 mb-10"
      type="submit"
    >
      {{ $t("Add_Quote") }}
    </button>
  </Form>
</template>

<script setup>
import FormHeader from "@/components/FormHeader.vue";
import FileUpload from "@/components/FileUpload.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useMoviesStore } from "@/stores/movies.js";
import axios from "@/config/axios/index.js";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePostStore } from "@/stores/post.js";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const { locale } = useI18n({ useScope: "global" });
const postStore = usePostStore();
const router = useRouter();
const route = useRoute();
const movieStore = useMoviesStore();
const props = defineProps({
  title: { type: String, required: true },
  link: { type: Object, required: true },
  movieId: { type: Number, required: false },
  id: { type: Number, required: true }
});
const submit = async (values, actions) => {
  try {
    const fd = new FormData();
    for (let value in values) {
      fd.set(value, values[value]);
    }
    if (movieStore.file) fd.set("image", movieStore.file);
    if (props.movieId) {
      fd.set("movie_id", props.movieId);
    }
    const response = await axios.post("quote", fd);
    store.getAuthUser();
    postStore.refreshPosts();
    movieStore.upload = "Upload_Image";
    movieStore.uploadBig = "Dragn_Drop";
    movieStore.file = null;
    if (route.name === "writeQuote") {
      router.push({
        name: "newsFeed"
      });
    } else {
      router.push({
        name: "viewMovie",
        params: { id: props.movieId }
      });
    }
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError][0][locale.value]);
    }
  }
};
const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await axios.get("movies");
    movies.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
getMovies();
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

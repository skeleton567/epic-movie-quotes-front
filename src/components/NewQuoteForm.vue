<template>
  <form-header :link="link" :title="title" />
  <slot></slot>
  <Form class="px-10 mt-8" @submit="submit">
    <textarea-component
      name="quote_en"
      placeholder="Create new quote"
      rule="required"
      label="Eng"
    />
    <textarea-component
      name="quote_ka"
      placeholder="ახალი ციტატა"
      rule="required"
      label="ქარ"
    />
    <file-upload />
    <button class="w-full bg-[#E31221] rounded text-xl py-3 mt-4" type="submit">
      Add Quote
    </button>
  </Form>
</template>

<script setup>
import FormHeader from "@/components/FormHeader.vue";
import FileUpload from "@/components/FileUpload.vue";
import { Form } from "vee-validate";
import { useMoviesStore } from "@/stores/movies.js";
import axios from "@/config/axios/index.js";
const movieStore = useMoviesStore();
const props = defineProps({
  title: { type: String, required: true },
  link: { type: Object, required: true },
  movieId: { type: Number, required: false }
});
const submit = async (values) => {
  try {
    const fd = new FormData();

    fd.set("image", movieStore.file);
    for (let value in values) {
      fd.set(value, values[value]);
    }
    fd.set("movie_id", props.movieId);
    const response = await axios.post("quote", fd);
    router.push({
      name: "viewMovie",
      query: { id: props.movieId }
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
</script>

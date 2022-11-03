<template>
  <div
    class="absolute z-10 bg-[#11101a] lg:bg-opacity-75 lg:h-[200vh] top-0 w-full flex justify-center md:mt-24"
    @click="$router.push({ name: 'movieList' })"
  >
    <div
      class="w-full bg-[#11101a] lg:w-[700px] lg:h-fit"
      @click="openDropdown = false"
      @click.stop
    >
      <form-header :link="{ name: 'movieList' }" title="Add Movie" />
      <Form class="px-8 py-9 mb-5 md:py-2 md:mb-2" @submit="submit">
        <movie-input
          name="title_en"
          label="Eng"
          placeholder="Movie name"
          rule="required"
        />
        <movie-input
          name="title_ka"
          label="ქარ"
          placeholder="ფილმის სახელი"
          rule="required"
        />
        <div class="relative">
          <div
            class="grid grid-cols-4 gap-2 border border-[#6C757D] rounded mb-4 px-3 py-3"
            @click.stop=""
            @click="openDropdown = !openDropdown"
          >
            <p v-if="!categories.length">Category</p>
            <p
              v-for="category in categories"
              v-else
              class="w-[70px] text-center bg-[#6C757D] rounded flex justify-between items-center space-x-1 p-[0.1rem] pr-1"
            >
              <span class="text-xs">{{ category.category }}</span>
              <x-icon :height="true" @click-event="removeCategory(category)" />
            </p>
          </div>
          <div
            v-if="openDropdown"
            class="absolute w-full bg-black z-10 top-[100%] px-2 py-3"
            @click.stop=""
          >
            <p
              v-for="category in allCategories"
              class="hover:bg-gray-500 w-full px-1 py-2"
              @click.once="addCategory(category)"
            >
              {{ category.category }}
            </p>
          </div>
        </div>

        <movie-input
          name="director_en"
          label="Eng"
          placeholder="Director"
          rule="required"
        />
        <movie-input
          name="director_ka"
          label="ქარ"
          placeholder="დირექტორი"
          rule="required"
        />
        <movie-input
          name="release_year"
          placeholder="Release year"
          type="number"
          rule="required|number"
        />
        <movie-input
          name="budget"
          placeholder="Budget"
          type="number"
          rule="required|number"
        />
        <textarea-component
          name="description_en"
          placeholder="Description"
          rule="required"
          label="Eng"
        />
        <textarea-component
          name="description_ka"
          placeholder="აღწერა"
          rule="required"
          label="ქარ"
        />
        <file-upload />
        <button
          class="w-full bg-[#E31221] rounded text-xl py-3 mt-4"
          type="submit"
        >
          Add Movie
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import { Form } from "vee-validate";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import FileUpload from "@/components/FileUpload.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import FormHeader from "@/components/FormHeader.vue";
import { useMoviesStore } from "@/stores/movies.js";
const movieStore = useMoviesStore();
const router = useRouter();
const store = useUserStore();
const categories = ref([]);
const allCategories = ref([]);
const openDropdown = ref(false);
const isCategory = ref(true);
const addCategory = (value) => {
  if (!categories.value.includes(value)) {
    categories.value.push(value);
  }
  isCategory.value = false;
  openDropdown.value = false;
};
const removeCategory = (value) => {
  const index = categories.value.indexOf(value);
  categories.value.splice(index, 1);
};
const submit = async (values, actions) => {
  try {
    const fd = new FormData();
    for (let value in values) {
      fd.set(value, values[value]);
    }
    fd.set("user_id", store.id);
    fd.set("categories", JSON.stringify(categories.value));
    console.log(fd);
    const response = await axios.post("movie", fd);
    router.push({
      name: "movieList"
    });
    movieStore.upload = "Upload image";
    movieStore.uploadBig = "Drag & drop your image here or";
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
const getCategory = async () => {
  const response = await axios.get("categories");
  allCategories.value.push(...response.data);
};
getCategory();
</script>

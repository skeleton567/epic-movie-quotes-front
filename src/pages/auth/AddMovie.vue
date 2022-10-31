<template>
  <div
    class="w-full absolute z-10 bg-[#11101a] top-0"
    @click="openDropdown = false"
  >
    <div class="flex items-center h-20 border-b border-[#EFEFEF33] px-8">
      <h1 class="text-3xl w-full text-center">Add Movie</h1>
      <router-link :to="{ name: 'movieList' }"><x-icon /></router-link>
    </div>
    <div class="px-8 py-9">
      <div class="flex items-center space-x-5 mb-8">
        <profile-picture :image="store.profile" />
        <h2>{{ store?.name ? store.name : store.email }}</h2>
      </div>
      <Form @submit="submit">
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
              <x-icon
                :height="true"
                @click-event.stop="removeCategory(category)"
              />
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
        <div
          class="flex justify-between items-center border border-[#6C757D] rounded mb-4 px-3 py-5"
          @dragover.prevent=""
          @drop.prevent="addfile($event.dataTransfer.files[0])"
        >
          <div class="flex items-center space-x-3">
            <photo-camera />
            <p>{{ upload }}</p>
          </div>
          <div>
            <input
              id="file"
              type="file"
              class="hidden"
              @input="addfile($event.target.files[0])"
            />
            <label
              class="rounded px-2 py-3 bg-[#9747FF66] cursor-pointer"
              for="file"
              >Choose file</label
            >
          </div>
        </div>
        <button class="w-full bg-[#E31221] rounded text-xl py-3" type="submit">
          Add Movie
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import XIcon from "@/components/icons/XIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import PhotoCamera from "@/components/icons/PhotoCamera.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useUserStore();
const categories = ref([]);
const allCategories = ref([]);
const openDropdown = ref(false);
const isCategory = ref(true);
let upload = ref("Upload image");
const file = ref(null);
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
const addfile = (image) => {
  upload.value = "Image Uploaded";
  file.value = image;
};
const submit = async (values, actions) => {
  try {
    const fd = new FormData();
    fd.set("image", file.value);
    for (let value in values) {
      fd.set(value, values[value]);
    }
    fd.set("user_id", store.id);
    fd.set("categories", JSON.stringify(categories.value));
    const response = await axios.post("movie", fd);
    router.push({
      name: "movieList"
    });
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

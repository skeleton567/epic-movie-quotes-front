<template>
  <div
    class="absolute md:fixed z-50 bg-[#11101a] lg:bg-opacity-75 lg:h-[100vh] top-0 w-full flex justify-center md:mt-0"
    @click="goBack"
  >
    <div
      class="w-full bg-black lg:w-[700px] lg:h-fit"
      @click="openDropdown = false"
      @click.stop
    >
      <form-header :link="link" :title="title" />
      <Form
        class="px-8 py-9 mb-5 md:py-2 md:mb-2 md:h-[80vh] md:overflow-y-scroll scrollbar"
        @submit="submit"
      >
        <movie-input
          :value="movieStore?.movie?.title_en"
          name="title_en"
          label="Eng"
          placeholder="Movie name"
          rule="required|alpha_spaces"
        />
        <movie-input
          :value="movieStore?.movie?.title_ka"
          name="title_ka"
          label="ქარ"
          placeholder="ფილმის სახელი"
          rule="required|georgian"
        />
        <div class="relative">
          <div
            class="grid grid-cols-2 md:grid-cols-4 gap-2 border border-[#6C757D] rounded mb-4 px-3 py-3"
            @click.stop=""
            @click="openDropdown = !openDropdown"
          >
            <p v-if="!categories?.length">{{ $t("category") }}</p>
            <p
              v-for="category in categories"
              v-else
              class="w-[150px] text-center bg-[#6C757D] rounded flex justify-between items-center space-x-1 py-1 px-2"
            >
              <span class="text-xs text-center w-full">{{
                category.category?.[$i18n.locale]
              }}</span>
              <x-icon
                :height="true"
                @click.stop=""
                @click-event="removeCategory(category)"
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
              {{ category.category?.[$i18n.locale] }}
            </p>
          </div>
        </div>

        <movie-input
          :value="movieStore?.movie?.director_en"
          name="director_en"
          label="Eng"
          placeholder="Director"
          rule="required|alpha_spaces"
        />
        <movie-input
          :value="movieStore?.movie?.director_ka"
          name="director_ka"
          label="ქარ"
          placeholder="დირექტორი"
          rule="required|georgian"
        />
        <movie-input
          :value="movieStore?.movie?.year"
          name="release_year"
          :placeholder="$t('Release_Year')"
          type="number"
          rule="required|number"
        />
        <movie-input
          :value="movieStore?.movie?.budget"
          name="budget"
          :placeholder="$t('budget')"
          type="text"
          rule="required"
        />
        <textarea-component
          :value="movieStore?.movie?.description_en"
          name="description_en"
          placeholder="Description"
          rule="required|alpha_spaces"
          label="Eng"
        />
        <textarea-component
          :value="movieStore?.movie?.description_ka"
          name="description_ka"
          placeholder="აღწერა"
          rule="required|georgian"
          label="ქარ"
        />
        <slot></slot>
        <button
          class="w-full bg-[#E31221] rounded text-xl py-3 mt-4"
          :class="{
            'pointer-events-none': store.id !== id
          }"
          type="submit"
        >
          {{ title }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import { Form } from "vee-validate";
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import FormHeader from "@/components/FormHeader.vue";
import { useMoviesStore } from "@/stores/movies.js";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const route = useRoute();
const router = useRouter();
const emits = defineEmits(["submit-event"]);
const movieStore = useMoviesStore();
const openDropdown = ref(false);
const allCategories = ref([]);
const props = defineProps({
  title: { type: String, required: true },
  link: { type: Object, required: true },
  id: { type: Number, required: false }
});
const categories = ref([]);
if (route.name === "editMovie") {
  categories.value = movieStore?.movie?.categories;
}
const isCategory = ref(true);
const addCategory = (value) => {
  if (!categories.value.filter((category) => category.id === value.id).length) {
    categories.value.push(value);
    isCategory.value = false;
    openDropdown.value = false;
  }
};
const removeCategory = (value) => {
  const index = categories.value.indexOf(value);
  categories.value.splice(index, 1);
};
const submit = async (values, actions) => {
  emits("submit-event", values, actions, categories.value);
};
const getCategory = async () => {
  const response = await axios.get("categories");
  allCategories.value.push(...response.data);
};
getCategory();
const goBack = () => {
  router.push(props.link);
  movieStore.upload = "Upload_Image";
  movieStore.uploadBig = "Dragn_Drop";
  movieStore.file = null;
};
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>

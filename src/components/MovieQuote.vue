<template>
  <div class="w-full md:rounded-xl bg-[#0a0a12] py-5 my-8 px-10">
    <div
      class="md:relative md:flex pb-6 border-b border-[#EFEFEF33] md:gap-6 md:items-center"
    >
      <img
        class="rounded-lg mt-3 h-40 w-full md:w-1/3"
        :src="
          quote.image
            ? `${link}${quote.image}`
            : '../src/assets/images/no-image.jpg'
        "
        alt="movie"
      />
      <p class="mt-6">“{{ quote?.quote[$i18n.locale] }}”</p>
      <three-dots
        classes="md:block hidden absolute right-2 top-3"
        @click-event="edit = !edit"
        @click.stop
      />
    </div>

    <div class="flex items-center justify-between my-5">
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-3">
          <p class="text-white text-xl">{{ quote?.comment?.length }}</p>
          <comment-icon></comment-icon>
        </div>
        <div class="flex items-center space-x-3">
          <p class="text-white text-xl">{{ quote?.like?.length }}</p>
          <heart-icon></heart-icon>
        </div>
      </div>
      <div class="relative">
        <three-dots classes="md:hidden" @click-event="edit = !edit" />
        <div
          v-if="edit"
          class="w-40 absolute bg-[#24222F] p-8 -bottom-4 right-10 rounded-xl"
          @click.stop
        >
          <router-link
            :to="{
              name: 'viewQuote',
              query: { id: quote.id, movie_id: movieStore.movie.id }
            }"
            class="flex space-x-4"
          >
            <eye-component />
            <p>{{ $t("View_Post") }}</p>
          </router-link>
          <router-link
            :to="{
              name: 'editQuote',
              query: { id: quote.id, movie_id: movieStore.movie.id }
            }"
            class="my-8 flex space-x-4"
          >
            <pencil-component />
            <p>{{ $t("edit") }}</p>
          </router-link>
          <div class="flex space-x-4 cursor-pointer" @click="deleteQuote">
            <trash-component />
            <p>{{ $t("Delete_Post") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import EyeComponent from "@/components/icons/EyeComponent.vue";
import PencilComponent from "@/components/icons/PencilComponent.vue";
import TrashComponent from "@/components/icons/TrashComponent.vue";
import ThreeDots from "@/components/icons/ThreeDots.vue";
import { useMoviesStore } from "@/stores/movies.js";
import { useQuotesStore } from "@/stores/quotes.js";
import { ref } from "vue";
const movieStore = useMoviesStore();
const quoteStore = useQuotesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const edit = ref(false);
const props = defineProps({
  quote: { type: Object, required: true },
  movie_id: { type: Number, required: true }
});
const deleteQuote = async () => {
  await quoteStore.delete(props.quote.id);
  movieStore.getMovie(props.movie_id);
};
window.addEventListener("click", () => (edit.value = false));
</script>

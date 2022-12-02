<template>
  <div
    class="absolute md:fixed z-10 bg-[#11101a] lg:bg-opacity-75 lg:h-[100vh] top-0 w-full lg:w-full flex justify-center md:mt-24"
    @click="goBack"
  >
    <div
      class="fixed top-0 z-10 bg-[#11101a] w-full md:w-[400px] lg:block lg:w-[600px] lg:h-fit md:bg-black md:relative"
      @click.stop
    >
      <new-quote-form
        :id="store.id"
        :link="{ name: 'newsFeed' }"
        :title="$t('Write_Quote')"
      >
      </new-quote-form>
    </div>
  </div>
</template>

<script setup>
import NewQuoteForm from "@/components/NewQuoteForm.vue";
import { useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movies.js";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const movieStore = useMoviesStore();
const router = useRouter();
const goBack = () => {
  router.push({ name: "newsFeed" });
  movieStore.upload = "Upload_Image";
  movieStore.uploadBig = "Dragn_Drop";
  movieStore.file = null;
};
</script>

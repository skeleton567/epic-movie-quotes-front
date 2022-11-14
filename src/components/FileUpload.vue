<template>
  <div
    class="flex justify-between md:justify-start space-x-4 items-center border border-[#6C757D] rounded px-3 py-5"
    @dragover.prevent=""
    @drop.prevent="movieStore.addfile($event.dataTransfer.files[0])"
  >
    <div class="flex items-center space-x-3">
      <photo-camera />
      <p class="md:hidden">{{ $t(movieStore.upload) }}</p>
      <p class="hidden md:block">{{ $t(movieStore.uploadBig) }}</p>
    </div>
    <div>
      <Field
        id="file"
        type="file"
        class="hidden"
        name="image"
        rules="image"
        @input="movieStore.addfile($event.target.files[0])"
      />
      <label
        class="rounded px-2 py-3 bg-[#9747FF66] cursor-pointer text-center"
        for="file"
        >{{ $t("Choose_File") }}</label
      >
    </div>
  </div>
  <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" name="image" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import PhotoCamera from "@/components/icons/PhotoCamera.vue";
import { useMoviesStore } from "@/stores/movies.js";
const movieStore = useMoviesStore();
</script>

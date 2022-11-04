<template>
  <div
    class="flex justify-center items-center h-80 w-full fit"
    :style="{ backgroundImage: 'url(' + image + ')' }"
    @dragover.prevent=""
    @drop.prevent="$emit('showImage', $event.dataTransfer.files[0])"
  >
    <Field
      id="file"
      class="hidden"
      type="file"
      name="image"
      @input="$emit('showImage', $event.target.files[0])"
    />
    <label class="" for="file"><change-photo /></label>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import ChangePhoto from "@/components/icons/ChangePhoto.vue";
import { useMoviesStore } from "@/stores/movies.js";
const movieStore = useMoviesStore();
const props = defineProps({
  image: { type: String, required: false }
});
</script>

<style scoped>
.fit {
  background-size: 100% 100%;
}
</style>

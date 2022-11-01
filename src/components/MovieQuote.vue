<template>
  <div class="w-full md:rounded-xl bg-[#0a0a12] py-5 my-8 px-10">
    <img
      class="rounded-lg mt-3 h-40 w-full"
      :src="
        quote.image
          ? `${link}${quote.image}`
          : '../src/assets/images/no-image.jpg'
      "
      alt="movie"
    />
    <p class="py-6 border-b border-[#EFEFEF33]">“{{ quote.quote }}”</p>
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
        <three-dots @click-event="edit = !edit" />
        <div
          v-if="edit"
          class="w-40 absolute bg-[#24222F] p-8 bottom-0 right-10 rounded-xl"
        >
          <div class="flex space-x-4">
            <eye-component />
            <p>View post</p>
          </div>
          <div class="my-8 flex space-x-4">
            <pencil-component />
            <p>Edit</p>
          </div>
          <div class="flex space-x-4">
            <trash-component />
            <p>Delete</p>
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
import { ref } from "vue";
const edit = ref(false);
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const props = defineProps({
  quote: { type: Object, required: true }
});
</script>

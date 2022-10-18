<template>
  <dashboard-wrap>
    <div class="w-full md:w-[400px] lg:w-[600px] mt-4 md:mt-2">
      <div class="flex items-center h-20 space-x-5">
        <div
          class="flex items-center w-full h-full space-x-4 md:w-80 md:h-12 lg:w-[450px] bg-[#24222F] md:rounded-lg"
        >
          <write-icon></write-icon>
          <p class="text-white inline">Write new quote</p>
        </div>
        <div
          class="hidden md:flex items-center space-x-4"
          :class="{
            'border-b border-[#EFEFEF4D] md:w-[450px] lg:w-[700px] py-4':
              searchActive
          }"
        >
          <search-loop @show-event="toggleSearch" />
          <p v-if="!searchActive" class="text-white inline">Search by</p>
          <input
            v-else
            type="text"
            placeholder="Enter @ to search movies, Enter # to search quotes"
            class="outline-none bg-inherit text-xs text-white w-full"
          />
        </div>
      </div>
      <user-post>
        <user-comment />
      </user-post>
      <user-post>
        <user-comment />
      </user-post>
    </div>
  </dashboard-wrap>
</template>

<script setup>
import SearchLoop from "@/components/icons/SearchLoop.vue";
import WriteIcon from "@/components/icons/WriteIcon.vue";
import UserPost from "@/components/UserPost.vue";
import UserComment from "@/components/UserComment.vue";
import axios from "@/config/axios/index.js";
import { onBeforeMount, onMounted, ref } from "vue";
let searchActive = ref(false);
const toggleSearch = () => {
  return (searchActive.value = !searchActive.value);
};
onMounted(async () => {
  try {
    const response = await axios.get("quote");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
</script>

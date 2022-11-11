<template>
  <dashboard-wrap>
    <router-view></router-view>
    <div class="w-full md:w-[400px] lg:block lg:w-[600px] mt-4 md:mt-2">
      <div class="flex items-center h-20 space-x-5">
        <div
          class="flex items-center w-full h-full space-x-4 md:w-80 md:h-12 lg:w-[450px] bg-[#24222F] md:rounded-lg"
        >
          <router-link
            :to="{ name: 'writeQuote' }"
            class="flex items-center space-x-4"
            ><write-icon></write-icon>
            <p class="text-white inline">
              {{ $t("Write_Quote") }}
            </p></router-link
          >
        </div>
        <div
          class="hidden md:flex items-center space-x-4"
          :class="{
            'border-b border-[#EFEFEF4D] md:w-[450px] lg:w-[700px] py-4':
              searchActive
          }"
        >
          <search-loop @show-event="toggleSearch" />
          <p
            v-if="!searchActive"
            class="text-white inline"
            @click="toggleSearch"
          >
            {{ $t("search") }}
          </p>
          <input
            v-else
            v-model="store.searchValue"
            type="text"
            :placeholder="$t('search_By', ['@', '#'])"
            class="outline-none bg-inherit text-xs text-white w-full"
          />
        </div>
      </div>
      <div v-for="post in store.postSearch" :key="post.id">
        <user-post
          :user="post.user?.name ? post.user.name : post.user.email"
          :image="post.user.image"
          :movie="post.movie.title[$i18n.locale]"
          :qoute="post.quote[$i18n.locale]"
          :comment="post.comment.length"
          :likes="post.like"
          :index="post.id"
          :post="post"
        >
        </user-post>
      </div>
    </div>
  </dashboard-wrap>
</template>

<script setup>
import SearchLoop from "@/components/icons/SearchLoop.vue";
import WriteIcon from "@/components/icons/WriteIcon.vue";
import UserPost from "@/components/UserPost.vue";
import { usePostStore } from "@/stores/post.js";
import { onUnmounted, onMounted, ref } from "vue";
const store = usePostStore();
let searchActive = ref(false);
const toggleSearch = () => {
  return (searchActive.value = !searchActive.value);
};
onMounted(() => store.getPosts());
window.addEventListener("scroll", store.handleScroll);
onUnmounted(() => window.removeEventListener("scroll", store.handleScroll));
</script>

<template>
  <div class="w-full px-12 my-8 bg-[#000000] py-7 md:rounded-xl">
    <div class="flex items-center space-x-4">
      <profile-picture image="profile.jpg" />
      <p class="text-white">Maia Nakashidze</p>
    </div>
    <p class="text-white mt-3 text-sm">
      “Follow your dream.” movie-
      <span class="text-[#DDCCAA]">Billy Elliot.</span> (2000)
    </p>
    <img
      class="rounded-lg mt-3"
      src="@/assets/images/interstellar.png"
      alt="movie"
    />
    <div class="flex items-center space-x-6 my-5">
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">3</p>
        <comment-icon></comment-icon>
      </div>
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">10</p>
        <heart-icon></heart-icon>
      </div>
    </div>
    <slot></slot>
    <div class="flex space-x-2 mt-4 mb-6">
      <profile-picture image="profile.jpg" />
      <textarea
        id=""
        class="utline-none bg-[#24222F] text-white w-full rounded-xl focus:outline-0 focus:border-black pl-1 py-2"
        placeholder="Write a comment"
        name=""
        cols="30"
        rows="1"
        onclick="this.rows = 4;"
        onblur="this.rows = 1;"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
</script>

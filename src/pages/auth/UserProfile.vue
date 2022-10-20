<template>
  <dashboard-wrap>
    <div class="m-6">
      <router-link :to="{ name: 'newsFeed' }"
        ><arrow-left></arrow-left
      ></router-link>
    </div>
    <div class="w-full h-[80vh] bg-[#24222F]">
      <div class="mt-6 h-40 grid place-items-center">
        <profile-picture height="h-24" image="profile.jpg" />
        <p class="text-white text-xl mt-2 text-center">Upload new photo</p>
      </div>
      <p class="text-white mt-20 mx-8">Username</p>
      <div
        class="flex justify-between mt-1 mx-8 border-b border-[#CED4DA80] py-4"
      >
        <p class="text-white">
          {{ store?.name ? store?.name : "No name set yet" }}
        </p>
        <p class="text-white">Edit</p>
      </div>
      <p class="text-white mt-8 mx-8">Email</p>
      <div
        class="flex justify-between mt-1 mx-8 border-b border-[#CED4DA80] py-4"
      >
        <p class="text-white">
          {{ store.email }}
        </p>
        <p class="text-white">Edit</p>
      </div>
    </div>
    <div
      class="px-8 w-full h-[30vh] bg-[#24222F] flex justify-center items-center"
    >
      <text-input
        name="name"
        label="Enter new username"
        rule="required|min:3|max:15|alpha_num|lowercase"
      ></text-input>
    </div>
    <div class="mt-10 flex justify-between px-14">
      <p class="text-white">Cancel</p>
      <button class="text-white py-2 px-3 bg-[#E31221] rounded-[4px]">
        Add
      </button>
    </div>
  </dashboard-wrap>
</template>

<script setup>
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
</script>

<template>
  <div class="px-8 h-[20vh]">
    <div class="w-full h-[30vh] bg-[#24222F]">
      <div
        class="pb-2 mb-5 h-[20vh] border-b w-full border-[#CED4DA33] flex justify-center items-center"
      >
        <p class="text-white">Are you sure to make changes ?</p>
      </div>
      <profile-buttons text="Confirm" @click-event="$emit('clickEvent')" />
    </div>
  </div>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
</script>

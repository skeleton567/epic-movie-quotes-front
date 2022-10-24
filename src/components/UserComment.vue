<template>
  <div class="py-5 border-y border-[#EFEFEF4D]">
    <div class="flex items-center space-x-4">
      <profile-picture image="profile.jpg" />
      <p class="text-white">{{ user }}</p>
    </div>
    <p class="text-white break-words">
      {{ comment }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: String, required: true },
  comment: { type: String, required: false }
});
</script>

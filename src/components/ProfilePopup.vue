<template>
  <div
    class="fixed h-[100vh] w-full bg-black bg-opacity-75 z-1000 cursor-default px-3"
  >
    <div
      class="rounded bg-[#D1E7DD] px-4 py-4 flex items-center justify-between mt-24"
    >
      <div class="flex items-center space-x-2">
        <green-check />
        <p class="text-[#0F5132]">{{ text }}</p>
      </div>
      <x-icon @click-event="$emit('closeEvent')" />
    </div>
  </div>
</template>

<script setup>
import GreenCheck from "@/components/icons/GreenCheck.vue";
import XIcon from "@/components/icons/XIcon.vue";
const props = defineProps({
  text: { type: String, required: true }
});
</script>

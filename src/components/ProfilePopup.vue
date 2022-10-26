<template>
  <div
    class="fixed h-[100vh] w-full bg-opacity-75 z-1000 px-3 md:absolute md:top-10 md:right-5 md:h-40 md:w-96"
  >
    <div class="rounded bg-[#D1E7DD] px-4 py-4 mt-24">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <green-check />
          <p class="text-[#0F5132]">{{ text }}</p>
        </div>
        <x-icon @click-event="$emit('closeEvent')" />
      </div>
      <div class="mt-4">
        <p class="text-black text-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import GreenCheck from "@/components/icons/GreenCheck.vue";
import XIcon from "@/components/icons/XIcon.vue";
const props = defineProps({
  text: { type: String, required: true },
  message: { type: String, required: false, default: "" }
});
</script>

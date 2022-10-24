<template>
  <div class="mt-1 flex justify-between px-10">
    <p class="text-white" @click="$emit('cancelEvent')">Cancel</p>
    <button
      class="text-white py-2 px-3 bg-[#E31221] rounded-[4px]"
      @click="$emit('clickEvent')"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true }
});
</script>

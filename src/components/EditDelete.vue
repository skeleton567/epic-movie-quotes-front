<template>
  <div class="flex space-x-3 bg-[#24222F] rounded-xl p-2" :class="classes">
    <pencil-component classes="h-5 w-5" />
    <div class="border-r"></div>
    <trash-component classes="h-5 w-5" />
  </div>
</template>

<script setup>
import TrashComponent from "@/components/icons/TrashComponent.vue";
import PencilComponent from "@/components/icons/PencilComponent.vue";
const props = defineProps({
  classes: { type: String, required: false }
});
</script>

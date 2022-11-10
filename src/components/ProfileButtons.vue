<template>
  <div
    v-if="$route.name !== 'profile'"
    class="mt-1 flex justify-between items-center md:justify-end md:space-x-7 px-10"
  >
    <a class="text-white cursor-pointer" @click="$router.back()">{{
      $t("cancel")
    }}</a>
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

<template>
  <p class="text-white md:mt-0 mt-4">{{ label }}</p>
  <div
    class="flex justify-between md:justify-start md:items-center mt-1 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
  >
    <div class="md:border-b border-[#CED4DA80] md:pb-12 md:w-52 lg:w-[400px]">
      <p
        class="md:text-black md:bg-[#CED4DA] md:w-full md:rounded md:px-3 md:py-2"
      >
        {{ name }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true }
});
</script>

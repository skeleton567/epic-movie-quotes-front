<template>
  <form-wrap>
    <div
      class="flex flex-col justify-center items-center h-[100vh] lg:h-auto my-10 mx-10"
    >
      <slot></slot>
      <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:my-8">
        {{ title }}
      </h2>
      <p class="text-[#6C757D] text-center mb-6">{{ text }}</p>
      <router-link
        :to="{ name: url }"
        class="text-white py-3 px-4 bg-[#E31221] rounded-md w-full my-6 text-center"
      >
        {{ buttonText }}
      </router-link>
    </div>
  </form-wrap>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
  url: { type: String, required: true }
});
</script>

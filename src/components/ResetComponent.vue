<template>
  <form-wrap
  @submit-event="submit"
    >
    <div
      class="flex flex-col justify-center items-center h-[100vh] lg:h-auto my-10 mx-10 md:block"
    >
    <h2 class="text-white text-2xl lg:text-3xl text-center mt-4 lg:my-8">
      {{ title }}
    </h2>
    <p class="text-[#6C757D] text-center mb-6">{{ text }}</p>
    <slot></slot>
    <button class="text-white py-2 px-3 bg-[#E31221] rounded-md w-full my-6">
      {{ buttonText }}
    </button>
    <router-link class="text-[#6C757D] text-center block" :to="{ name: 'login' }">&#8592 {{$t('Back_Login')}}</router-link>
  </div>
  </form-wrap>
  
</template>

<script setup>
const emit = defineEmits(["submit-event"]);
const submit = (values, actions) => {
  emit("submit-event", values, actions);
};
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, required: true },
});
</script>
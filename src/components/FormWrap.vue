<template>
  <div
    class="lg:fixed lg:h-[100vh] w-full bg-black lg:bg-opacity-75 flex justify-center items-center z-1000 cursor-default"
    @click="$router.push({ name: 'home' })"
  >
    <Form
      class="w-full lg:w-[550px] bg-[#11101A] opacity-100 px-8 lg:px-16 lg:rounded-xl"
      @submit="submit"
      @click.stop
    >
      <slot></slot>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
const emit = defineEmits(["submit-event"]);
const submit = (values, actions) => {
  emit("submit-event", values, actions);
};
</script>

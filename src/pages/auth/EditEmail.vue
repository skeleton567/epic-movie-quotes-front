<template>
  <Form
    :initial-errors="{ email: $route.query.email }"
    class="md:fixed md:h-[100vh] md:w-full bg-black md:bg-opacity-75 md:flex justify-center items-center z-1000 cursor-default"
    @submit="submitEmail"
    @click="router.push({ name: 'profile' })"
  >
    <div class="md:bg-[black] md:rounded-xl md:pt-6 md:pb-10" @click.stop>
      <h1 class="hidden md:block text-2xl px-8 mb-6">{{ $t("AddEmail") }}</h1>
      <hr class="hidden md:block" color="blue" />
      <div
        class="px-8 w-full md:w-[450px] h-[30vh] md:h-fit bg-[#24222F] md:bg-inherit flex justify-center items-center mb-10 md:mt-10"
      >
        <text-input
          name="email"
          :label="$t('AddEmail')"
          type="email"
          rule="required|email"
        ></text-input>
      </div>
      <profile-buttons :text="$t('add')" />
    </div>
  </Form>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
import { Form } from "vee-validate";
import { useRouter } from "vue-router";
const router = useRouter();
const submitEmail = (value) => {
  router.replace({ name: "youSure", query: { email: value.email } });
};
</script>

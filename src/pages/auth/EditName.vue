<template>
  <Form
    :initial-errors="{ name: $route.query.name }"
    class="md:fixed md:h-[100vh] md:w-full bg-black md:bg-opacity-75 md:flex justify-center items-center z-1000 cursor-default"
    @submit="submitName"
    @click="router.push({ name: 'profile' })"
  >
    <div class="md:bg-[black] md:rounded-xl md:pt-6 md:pb-10" @click.stop>
      <h1 class="hidden md:block text-2xl px-8 mb-6">{{ $t("Edit_Name") }}</h1>
      <hr class="hidden md:block" color="blue" />
      <div
        class="px-8 w-full md:w-[450px] h-[30vh] md:h-fit bg-[#24222F] md:bg-inherit flex justify-center items-center mb-10 md:mt-10"
      >
        <text-input
          name="name"
          :label="$t('Enter_Username')"
          rule="required|min:3|max:15|alpha_num|lowercase"
        ></text-input>
      </div>
      <profile-buttons :text="$t('add')" />
    </div>
  </Form>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
import { Form } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";
const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const submitName = (value) => {
  router.replace({ name: "youSure", query: { name: value.name } });
};
</script>

<template>
  <reset-component
    :title="$t('ForgotPassword')"
    :text="$t('InstructionstoReset')"
    :button-text="$t('SendInstructions')"
    @submit-event="submit"
  >
    <text-input
      name="email"
      :label="$t('email')"
      type="email"
      :placeholder="$t('EnterEmail')"
      rule="required|email"
    ></text-input>
  </reset-component>
</template>

<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const submit = async (values, actions) => {
  try {
    const response = await axios.post("forgot-password", values);
    console.log(response);
    router.push({ name: "recoverInstructions" });
  } catch (error) {
    console.log(error);
    actions.setFieldError("email", error.response.data.error);
  }
};
</script>

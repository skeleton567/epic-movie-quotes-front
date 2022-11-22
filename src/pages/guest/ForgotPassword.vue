<template>
  <reset-component
    :title="$t('Forgot_Password')"
    :text="$t('Instructionsto_Reset')"
    :button-text="$t('Send_Instructions')"
    @submit-event="submit"
  >
    <text-input
      name="email"
      :label="$t('email')"
      type="email"
      :placeholder="$t('Enter_Email')"
      rule="required|email"
    ></text-input>
  </reset-component>
</template>

<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
const router = useRouter();
const submit = async (values, actions) => {
  try {
    const response = await axios.post("forgot-password", values);
    router.push({ name: "recoverInstructions" });
  } catch (error) {
    actions.setFieldError(
      "email",
      error.response.data.errors.email[0][locale.value]
    );
  }
};
</script>

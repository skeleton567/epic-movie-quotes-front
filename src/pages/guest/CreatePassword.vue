<template>
  <reset-component
    :title="$t('CreatePassword')"
    :text="$t('DifferentPassword')"
    :button-text="$t('ResetPassword')"
    @submit-event="submit"
  >
    <text-input
      name="password"
      :label="$t('password')"
      type="password"
      :placeholder="$t('password')"
      rule="required|min:8|max:15|alpha_num|lowercase"
    ></text-input>
    <text-input
      name="confirmation"
      :label="$t('ConfirmPassword')"
      type="password"
      :placeholder="$t('ConfirmPassword')"
      rule="confirmed:@password"
    ></text-input>
  </reset-component>
</template>

<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
import axios from "@/config/axios/index.js";
import { useRoute, useRouter } from "vue-router";
const props = defineProps();
const route = useRoute();
const router = useRouter();
const submit = async (values, actions) => {
  try {
    values.email = route.query.email;
    values.token = route.query.token;
    values["password_confirmation"] = values.confirmation;
    const response = await axios.post("reset-password", values);
    console.log(response);
    router.push({ name: "passwordChanged" });
  } catch (error) {
    console.log(error);
    actions.setFieldError("password", error.response.data.error);
  }
};
</script>

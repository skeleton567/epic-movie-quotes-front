<template>
  <form-wrap @submit-event="submit">
    <auth-form
      :title="$t('Create_Account')"
      :text="$t('Start_Journey')"
      :button-text="$t('Get_Started')"
      :account="$t('Already_Have')"
      route="login"
      :auth="$t('Login')"
    >
      <text-input
        name="name"
        :label="$t('name')"
        :placeholder="$t('Enter_Name')"
        rule="required|min:3|max:15|alpha_num|lowercase"
      ></text-input>
      <text-input
        name="email"
        :label="$t('email')"
        type="email"
        :placeholder="$t('Enter_Email')"
        rule="required|email"
      ></text-input>
      <text-input
        name="password"
        :label="$t('password')"
        type="password"
        :placeholder="$t('password')"
        rule="required|min:8|max:15|alpha_num|lowercase"
      ></text-input>
      <text-input
        name="confirmation"
        :label="$t('Confirm_Password')"
        type="password"
        :placeholder="$t('Confirm_Password')"
        rule="confirmed:@password"
      ></text-input>
    </auth-form>
  </form-wrap>
</template>

<script setup>
import axios from "@/config/axios/index.js";
import AuthForm from "@/components/AuthForm.vue";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
const router = useRouter();
const submit = async (values, actions) => {
  values["password_confirmation"] = values.confirmation;
  try {
    const response = await axios.post("register", values);
    setJwtToken(response.data.access_token, response.data.expires_in);
    router.push({
      name: "emailSent"
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError][0][locale.value]);
    }
  }
};
</script>

<template>
  <form-wrap @submit-event="submit">
    <auth-form
      :title="$t('LoginAccount')"
      :text="$t('WelcomeBack')"
      :button-text="$t('LogIn')"
      :account="$t('DontHave')"
      route="registration"
      :auth="$t('SignIn')"
    >
      <text-input
        name="name"
        :label="$t('name')"
        type="text"
        :placeholder="$t('EnterName')"
        rule="required|min:3"
      ></text-input>
      <text-input
        name="password"
        :label="$t('password')"
        type="password"
        :placeholder="$t('password')"
        rule="required|min:8|max:15|alpha_num|lowercase"
      ></text-input>
      <div class="flex justify-between text-xs w-full mt-6 space-x-2">
        <div class="flex items-center space-x-1 md:space-x-2">
          <Field
            id="remember"
            class="block border border-gray-300 rounded"
            type="checkbox"
            name="remember"
            value="true"
          />
          <label class="text-white" for="remember_token">
            {{ $t("remember") }}</label
          >
        </div>
        <router-link
          class="text-blue-700 text-xs underline"
          :to="{
            name: 'forgotPassword'
          }"
          >{{ $t("forgot") }}</router-link
        >
      </div>
    </auth-form>
  </form-wrap>
</template>

<script setup>
import { Field } from "vee-validate";
import axios from "@/config/axios/index.js";
import AuthForm from "@/components/AuthForm.vue";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const submit = async (values, actions) => {
  try {
    const response = await axios.post("login", values);
    console.log(response.data.expires_in);
    setJwtToken(response.data.access_token, response.data.expires_in);
    router.replace({ name: "newsFeed" });
  } catch (error) {
    actions.setFieldError("name", error.response.data.error);
  }
};
</script>

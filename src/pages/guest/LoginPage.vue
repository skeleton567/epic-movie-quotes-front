<template>
  <form-wrap>
    <Form @submit="submit">
      <auth-form
        title="Log in to your account"
        text="Welcome back! Please enter your details."
        button-text="Sign in"
        account="Dont have an account? "
        route="registration"
        auth="Sign up"
      >
        <text-input
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          rule="required|min:3"
        ></text-input>
        <text-input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
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
            <label class="text-white" for="remember_token"> Remember me </label>
          </div>
          <router-link
            class="text-blue-700 text-xs underline"
            :to="{
              name: 'forgotPassword'
            }"
            >Forgot password?</router-link
          >
        </div>
      </auth-form>
    </Form>
  </form-wrap>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axios from "@/config/axios/index.js";
import AuthForm from "@/components/AuthForm.vue";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const submit = async (values, actions) => {
  try {
    const response = await axios.post("login", values);
    console.log(response);
    setJwtToken(response.data.access_token, response.data.expires_in);
    router.replace({ name: "newsFeed" });
  } catch (error) {
    actions.setFieldError("name", error.response.data.error);
  }
};
</script>

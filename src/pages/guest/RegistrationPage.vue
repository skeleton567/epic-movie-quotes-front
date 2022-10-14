<template>
  <form-wrap>
    <Form @submit="submit">
      <auth-form
        title="Create an account"
        text="Start your journey!"
        button-text="Get started"
        account="Already have an account? "
        route="login"
        auth="Log in"
      >
        <text-input
          name="name"
          label="Name"
          placeholder="Enter your name"
          rule="required|min:3|max:15|alpha_num|lowercase"
        ></text-input>
        <text-input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          rule="required|email"
        ></text-input>
        <text-input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          rule="required|min:8|max:15|alpha_num|lowercase"
        ></text-input>
        <text-input
          name="confirmation"
          label="Confirm password"
          type="password"
          placeholder="Enter your name"
          rule="confirmed:@password"
        ></text-input>
      </auth-form>
    </Form>
  </form-wrap>
</template>

<script setup>
import { Form } from "vee-validate";
import axios from "@/config/axios/index.js";
import AuthForm from "@/components/AuthForm.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const submit = async (values, actions) => {
  values["password_confirmation"] = values.confirmation;
  try {
    const response = await axios.post("register", values);
    router.push({
      name: "emailSent",
      params: {
        email: values.email
      }
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
</script>

<template>
  <Form @submit="submit">
    <reset-component
      title="Forgot password?"
      text="Enter the email and we’ll send an email with
instructions to reset your password"
      button-text="Send instructions"
    >
      <text-input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        rule="required|email"
      ></text-input>
    </reset-component>
  </Form>
</template>
<script setup>
import { Form } from "vee-validate";
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
    actions.setFieldError("email", error.response.data.error);
  }
};
</script>

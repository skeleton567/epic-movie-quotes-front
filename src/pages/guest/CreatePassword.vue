<template>
  <Form @submit="submit">
    <reset-component
      title="Create new password"
      text="Your new password must be different from 
    previous used passwords"
      button-text="Reset password"
    >
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
    </reset-component>
  </Form>
</template>

<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
import { Form } from "vee-validate";
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

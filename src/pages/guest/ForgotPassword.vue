<template>
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
</template>
<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
</script>

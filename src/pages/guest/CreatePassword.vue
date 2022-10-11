<template>
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
</template>

<script setup>
import ResetComponent from "@/components/ResetComponent.vue";
</script>

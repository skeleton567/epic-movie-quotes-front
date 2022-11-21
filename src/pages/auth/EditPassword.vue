<template>
  <new-password @submit-event="submitPassword" />
</template>

<script setup>
import NewPassword from "@/components/NewPassword.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const submitPassword = (values) => {
  router.replace({
    name: "youSure",
    query: { password: values.password, confirmation: values.confirmation }
  });
};
</script>

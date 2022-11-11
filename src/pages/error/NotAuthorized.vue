<template>
  <error-page
    :title="$t('Shall_Not_Pass')"
    :text="$t('No_Permission')"
    image="Gandolf.svg"
  ></error-page>
</template>

<script setup>
import ErrorPage from "@/components/ErrorPage.vue";
</script>

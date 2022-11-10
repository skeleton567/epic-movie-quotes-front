<template>
  <error-page
    :title="$t('ShallNotPass')"
    :text="$t('NoPermission')"
    image="Gandolf.svg"
  ></error-page>
</template>

<script setup>
import ErrorPage from "@/components/ErrorPage.vue";
</script>

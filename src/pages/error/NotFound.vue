<template>
  <error-page
    title="Whoops!"
    :text="$t('Not_Found')"
    image="ghost.svg"
  ></error-page>
</template>

<script setup>
import ErrorPage from "@/components/ErrorPage.vue";
</script>

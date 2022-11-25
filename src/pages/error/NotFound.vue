<template>
  <error-page title="Whoops!" :text="$t('Not_Found')">
    <ghost-icon />
  </error-page>
</template>

<script setup>
import ErrorPage from "@/components/ErrorPage.vue";
import GhostIcon from "@/components/icons/GhostIcon.vue";
</script>

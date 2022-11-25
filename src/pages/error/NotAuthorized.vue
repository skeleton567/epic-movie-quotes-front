<template>
  <error-page :title="$t('Shall_Not_Pass')" :text="$t('No_Permission')">
    <div class="relative">
      <back-ground />
      <gandolf-icon /></div
  ></error-page>
</template>

<script setup>
import ErrorPage from "@/components/ErrorPage.vue";
import BackGround from "@/components/icons/BackGround.vue";
import GandolfIcon from "@/components/icons/GandolfIcon.vue";
</script>

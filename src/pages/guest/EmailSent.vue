<template>
  <mailing-message
    :title="$t('Thank_You')"
    :text="$t('Check_Email')"
    :button-text="$t('Go_Feed')"
    url="newsFeed"
    ><up-arrow
  /></mailing-message>
</template>

<script setup>
import UpArrow from "@/components/icons/UpArrow.vue";
</script>

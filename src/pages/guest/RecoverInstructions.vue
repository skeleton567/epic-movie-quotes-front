<template>
  <mailing-message
    :title="$t('Thank_You')"
    :text="$t('Instructions_Sent')"
    :button-text="$t('Go_Home')"
    url="home"
    ><up-arrow
  /></mailing-message>
</template>

<script setup>
import UpArrow from "@/components/icons/UpArrow.vue";
</script>

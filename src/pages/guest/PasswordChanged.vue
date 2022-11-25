<template>
  <mailing-message
    :title="$t('succes')"
    :text="$t('Changed_Successfully')"
    :button-text="$t('Login')"
    url="login"
    ><checked-icon />
  </mailing-message>
</template>

<script setup>
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
</script>

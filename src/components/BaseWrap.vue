<template>
  <main class="box-border m-0 p-0 text-white" :class="font">
    <slot></slot>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
const font = computed(() => {
  return locale.value === "en"
    ? "font-[HelveticaEnglish]"
    : "font-[HelveticaGeorgian]";
});
</script>

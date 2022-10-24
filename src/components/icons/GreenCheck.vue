<template>
  <img src="@/assets/images/greenCheck.svg" alt="checked" :class="classes" />
</template>

<script setup>
const props = defineProps({
  classes: { type: String, required: false }
});
</script>

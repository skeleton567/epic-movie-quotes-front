<template>
  <img
    src="@/assets/images/trash3.svg"
    alt="bell"
    class="cursor-pointer w-8"
    :class="classes"
    @click="$emit('click-event')"
  />
</template>

<script setup>
const props = defineProps({
  classes: { type: String, required: false }
});
</script>

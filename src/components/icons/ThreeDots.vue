<template>
  <img
    class="cursor-pointer"
    src="@/assets/images/three-dots.svg"
    alt="loop"
    :class="classes"
    @click="$emit('clickEvent')"
  />
</template>

<script setup>
const props = defineProps({
  classes: { type: String, required: false }
});
</script>

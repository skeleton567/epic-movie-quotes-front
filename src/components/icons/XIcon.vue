<template>
  <img
    src="@/assets/images/X.svg"
    alt="x"
    class="cursor-pointer"
    :class="{
      white: $route.name !== 'profile' && $route.name !== 'emailPage',
      'h-2': height
    }"
    @click="$emit('clickEvent')"
  />
</template>

<script setup>
const props = defineProps({
  height: { type: Boolean, required: false }
});
</script>

<style>
.white {
  filter: brightness(0) invert(1);
}
</style>

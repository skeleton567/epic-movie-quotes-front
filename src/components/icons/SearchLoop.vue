<template>
  <img
    v-if="$route.name === 'newsFeed'"
    class="cursor-pointer"
    :class="{ 'md:hidden': position }"
    src="@/assets/images/loop.svg"
    alt="loop"
    @click="$emit('showEvent')"
    @click.stop=""
  />
</template>

<script setup>
const props = defineProps({
  position: { type: Boolean, required: false, default: false }
});
</script>

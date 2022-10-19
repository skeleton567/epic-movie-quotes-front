<template>
  <img
    class="h-6 cursor-pointer"
    src="@/assets/images/heart.svg"
    alt="heart"
    :class="{ red: alreadyLiked }"
    @click="$emit('likeEvent')"
  />
</template>

<script setup>
const props = defineProps({
  alreadyLiked: { type: Boolean, required: false }
});
</script>

<style>
.red {
  filter: invert(78%) sepia(73%) saturate(3207%) hue-rotate(0deg)
    brightness(95%) contrast(100%);
}
</style>

<template>
  <img
    src="@/assets/images/camera.svg"
    alt="camera"
    :class="{ red: $route.name === 'movieList' }"
  />
</template>

<style>
.red {
  filter: invert(78%) sepia(73%) saturate(3207%) hue-rotate(0deg)
    brightness(95%) contrast(100%);
}
</style>

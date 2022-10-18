<template>
  <img
    :class="{ red: $route.name === 'newsFeed' }"
    src="@/assets/images/house.svg"
    alt="house"
  />
</template>

<style>
.red {
  filter: invert(78%) sepia(73%) saturate(3207%) hue-rotate(0deg)
    brightness(95%) contrast(100%);
}
</style>

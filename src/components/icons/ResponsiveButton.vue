<template>
  <img
    class="block cursor-pointer md:hidden"
    src="@/assets/images/responsiveNavButton.svg"
    alt="responsiveNavButton"
    @click="$emit('showEvent')"
    @click.stop=""
  />
</template>

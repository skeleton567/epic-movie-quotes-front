<template>
  <img
    v-if="$route.name === 'editQuote' || $route.name === 'editMovie'"
    src="@/assets/images/changePhoto.svg"
    alt="bell"
    class="cursor-pointer"
    @click="$emit('click-event')"
  />
</template>

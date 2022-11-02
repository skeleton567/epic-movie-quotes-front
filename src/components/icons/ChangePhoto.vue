<template>
  <img
    v-if="$route.name === 'editQuote'"
    src="@/assets/images/changePhoto.svg"
    alt="bell"
    class="cursor-pointer absolute top-[30%] right-[30%] z-10"
    @click="$emit('click-event')"
  />
</template>

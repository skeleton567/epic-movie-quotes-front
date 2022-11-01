<template>
  <img
    src="@/assets/images/eye.svg"
    alt="bell"
    class="cursor-pointer w-8"
    @click="$emit('notificationEvent')"
  />
</template>

<template>
  <img
    src="@/assets/images/notificaiton.svg"
    alt="bell"
    class="cursor-pointer w-8"
    @click="$emit('notificationEvent')"
  />
</template>

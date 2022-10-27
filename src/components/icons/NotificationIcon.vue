<template>
  <img
    src="@/assets/images/notificaiton.svg"
    alt="bell"
    class="cursor-pointer"
    @click="$emit('notificationEvent')"
  />
</template>

<template>
  <img
    src="@/assets/images/trash3.svg"
    alt="bell"
    class="cursor-pointer w-8"
    @click="$emit('notificationEvent')"
  />
</template>

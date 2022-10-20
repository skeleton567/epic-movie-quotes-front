<template>
  <mailing-message
    title="Thank you!"
    text="Your account has been activated."
    button-text="Go to my news feed"
    image="checked.png"
    url="newsFeed"
  ></mailing-message>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "@/config/axios/index.js";
import { useRoute } from "vue-router";
const route = useRoute();
onMounted(() => axios.get(route.query.verify_url));
</script>

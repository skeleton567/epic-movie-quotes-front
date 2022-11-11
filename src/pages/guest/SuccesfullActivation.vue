<template>
  <mailing-message
    :title="$t('Thank_You')"
    :text="$t('activated')"
    :button-text="$t('Go_Feed')"
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

<template>
  <mailing-message
    :title="$t('Thank_You')"
    :text="$t('activated')"
    :button-text="$t('Go_Feed')"
    url="newsFeed"
    ><checked-icon
  /></mailing-message>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "@/config/axios/index.js";
import { useRoute } from "vue-router";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
const route = useRoute();
onMounted(() => axios.get(route.query.verify_url));
</script>

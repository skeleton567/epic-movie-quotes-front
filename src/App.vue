<template>
  <base-wrap>
    <router-view></router-view>
  </base-wrap>
</template>

<script setup>
import "@/assets/tailwind.css";
import BaseWrap from "@/components/BaseWrap.vue";
</script>

<style>
@font-face {
  font-family: "HelveticaGeorgian";
  src: local("HelveticaGeorgian"),
    url(@/assets/fonts/Helvetica-Georgian/Helvetica-Medium.ttf)
      format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "HelveticaGeorgian";
  src: local("HelveticaGeorgian"),
    url(@/assets/fonts/Helvetica-Georgian/Helvetica-Bold.ttf) format("truetype");
  font-weight: bold;
}
@font-face {
  font-family: "HelveticaEnglish";
  src: local("HelveticaEnglish"),
    url(@/assets/fonts/Helvetica-English/Helvetica-Medium.ttf)
      format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "HelveticaEnglish";
  src: local("HelveticaEnglish"),
    url(@/assets/fonts/Helvetica-English/Helvetica-Obl.ttf) format("truetype");
  font-weight: bold;
}
body {
  background: #11101a;
}
</style>

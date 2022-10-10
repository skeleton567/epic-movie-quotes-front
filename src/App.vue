<template>
  <base-wrap>
    <router-view></router-view>
  </base-wrap>
</template>

<script>
import "@/assets/tailwind.css";
import BaseWrap from "@/components/BaseWrap.vue";
export default {
  components: { BaseWrap }
};
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
</style>

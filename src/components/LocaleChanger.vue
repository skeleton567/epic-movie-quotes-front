<template>
  <div class="w-14 flex items-center justify-between" :class="classes">
    <select
      id=""
      v-model="$i18n.locale"
      class="selecttxt text-white"
      name="locale"
      @change="changeLocale"
    >
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        class="text-black"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
    <arrow-down />
  </div>
</template>

<script setup>
import ArrowDown from "@/components/icons/ArrowDown.vue";
import axios from "@/config/axios/index.js";
const props = defineProps({
  classes: { type: String, required: false }
});
const changeLocale = async (event) => {
  try {
    const response = await axios.post("locale", { locale: event.target.value });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

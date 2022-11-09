<template>
  <div class="w-14 flex items-center justify-between" :class="classes">
    <select
      v-model="$i18n.locale"
      class="selecttxt text-white"
      name="locale"
      @change="changeLocale"
    >
      <option class="text-black" value="en">Eng</option>
      <option class="text-black" value="ka">ქარ</option>
    </select>
    <arrow-down />
  </div>
</template>

<script setup>
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { setLocale } from "@vee-validate/i18n";
const props = defineProps({
  classes: { type: String, required: false }
});
const changeLocale = (event) => {
  setLocale(event.target.value);
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

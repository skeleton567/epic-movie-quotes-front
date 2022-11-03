<template>
  <div class="px-10 w-[100vw] md:w-full">
    <textarea-component
      name="quote_en"
      placeholder="Create new quote"
      rule="required"
      label="Eng"
      :value="quoteStore?.quote?.quote_en"
    />
    <textarea-component
      name="quote_ka"
      placeholder="ახალი ციტატა"
      rule="required"
      label="ქარ"
      :value="quoteStore?.quote?.quote_ka"
    />
    <div
      class="flex justify-center items-center h-80 w-full fit"
      :style="{ backgroundImage: 'url(' + quote + ')' }"
    >
      <Field id="file" class="hidden" type="file" name="image" />
      <label class="" for="file"><change-photo /></label>
    </div>
    <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" name="image" />
    <slot></slot>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { useQuotesStore } from "@/stores/quotes.js";
import ChangePhoto from "@/components/icons/ChangePhoto.vue";
import { computed } from "vue";
const quoteStore = useQuotesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const quote = computed(() => {
  return quoteStore?.quote?.image
    ? `${link}${quoteStore?.quote?.image}`
    : "../src/assets/images/no-image.jpg";
});
</script>

<style scoped>
.fit {
  background-size: 100% 100%;
}
</style>

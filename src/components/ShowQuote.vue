<template>
  <div class="px-10 w-[100vw] md:w-full">
    <textarea-component
      v-if="quoteStore?.quote?.quote_en"
      name="quote_en"
      placeholder="Create new quote"
      rule="required|alpha_spaces"
      label="Eng"
      :value="quoteStore.quote.quote_en"
    />
    <textarea-component
      v-if="quoteStore?.quote?.quote_ka"
      name="quote_ka"
      placeholder="ახალი ციტატა"
      rule="required|georgian"
      label="ქარ"
      :value="quoteStore.quote.quote_ka"
    />
    <image-upload :image="quote" @show-image="showImage" />
    <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" name="image" />
    <slot></slot>
  </div>
</template>

<script setup>
import ImageUpload from "@/components/ImageUpload.vue";
import { ErrorMessage } from "vee-validate";
import { useQuotesStore } from "@/stores/quotes.js";
import { computed, ref } from "vue";
const quoteStore = useQuotesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const newImg = ref(null);
const quote = computed(() => {
  if (newImg.value) {
    return newImg.value;
  } else if (quoteStore?.quote?.image) {
    return `${link}${quoteStore?.quote?.image}`;
  } else {
    ("../src/assets/images/no-image.jpg");
  }
});
const showImage = (event) => {
  newImg.value = URL.createObjectURL(event);
  quoteStore.file = event;
};
</script>

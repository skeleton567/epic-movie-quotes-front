<template>
  <div class="px-10">
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
    <div class="relative">
      <img
        class="rounded-lg mt-3"
        :src="
          quoteStore?.quote?.image
            ? `${link}${quoteStore?.quote?.image}`
            : '../src/assets/images/no-image.jpg'
        "
        alt="movie"
      />
      <Field id="file" class="hidden" type="file" name="image" />
      <label for="file"><change-photo /></label>
    </div>
    <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" name="image" />
    <slot></slot>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { useQuotesStore } from "@/stores/quotes.js";
import ChangePhoto from "@/components/icons/ChangePhoto.vue";
const quoteStore = useQuotesStore();
const link = import.meta.env.VITE_IMAGE_BASE_URL;
</script>

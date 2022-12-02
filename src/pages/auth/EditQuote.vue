<template>
  <dashboard-wrap>
    <quote-crud>
      <Form @submit="submit">
        <form-header
          v-if="quoteStore?.quote?.movie_id"
          :id="quoteStore?.quote?.user.id"
          :link="{
            name: 'viewMovie',
            params: { id: quoteStore.quote.movie_id }
          }"
          :title="$t('Edit_Quote')"
        />
        <show-quote>
          <button
            class="w-full bg-[#E31221] rounded text-xl py-3 mt-4 mb-10"
            type="submit"
          >
            {{ $t("Save_Changes") }}
          </button>
        </show-quote>
      </Form>
    </quote-crud>
  </dashboard-wrap>
</template>

<script setup>
import { Form } from "vee-validate";
import FormHeader from "@/components/FormHeader.vue";
import { useQuotesStore } from "@/stores/quotes.js";
import ShowQuote from "@/components/ShowQuote.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import QuoteCrud from "@/components/QuoteCrud.vue";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const route = useRoute();
const router = useRouter();
const quoteStore = useQuotesStore();
quoteStore.getQuote(route.params.id);
const submit = async (values, actions) => {
  try {
    const fd = new FormData();
    fd.append("_method", "PATCH");
    for (let value in values) {
      fd.set(value, values[value]);
    }
    fd.set("user_id", store.id);
    if (quoteStore.file) fd.set("image", quoteStore.file);
    const response = await axios.post(`quote/${route.params.id}`, fd);
    router.push({
      name: "viewMovie",
      params: { id: quoteStore?.quote?.movie_id }
    });
    quoteStore.file = null;
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
</script>

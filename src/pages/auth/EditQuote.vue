<template>
  <dashboard-wrap>
    <quote-crud>
      <Form @submit="submit">
        <form-header
          :link="{ name: 'viewMovie', query: { id: route.query.movie_id } }"
          title="Edit Quote"
        />
        <show-quote>
          <button
            class="w-full bg-[#E31221] rounded text-xl py-3 mt-4 mb-10"
            type="submit"
          >
            Save changes
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
const route = useRoute();
const router = useRouter();
const quoteStore = useQuotesStore();
quoteStore.getQuote(route.query.id);
const submit = async (values, actions) => {
  try {
    const fd = new FormData();
    fd.append("_method", "PATCH");
    for (let value in values) {
      fd.set(value, values[value]);
    }
    if (quoteStore.file) fd.set("image", quoteStore.file);
    const response = await axios.post(`quote/${route.query.id}`, fd);
    quoteStore.file = null;
    router.push({
      name: "viewMovie",
      query: { id: route.query.movie_id }
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error);
    for (const loopError in errors) {
      actions.setFieldError(loopError, errors[loopError]);
    }
  }
};
</script>

<template>
  <div class="mb-4">
    <div
      class="flex items-center space-x-1 border border-[#6C757D] px-3 py-3 rounded"
    >
      <Field
        v-slot="{ field }"
        :name="name"
        :rules="rule"
        :validate-on-input="true"
      >
        <textarea
          :id="name"
          v-bind="field"
          class="outline-none w-full bg-inherit placeholder-white px-1 focus:outline-0 focus:border-none"
          :placeholder="placeholder"
          rows="2"
        ></textarea>
      </Field>
      <label :for="name" class="text-[#6C757D]">{{ label }}</label>
    </div>
    <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  rule: { type: String, required: true },
  label: { type: String, required: false },
  name: { type: String, required: true },
  placeholder: { type: String, required: false }
});
</script>

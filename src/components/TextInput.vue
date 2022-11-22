<template>
  <div class="mt-4 relative text-black">
    <label class="w-full text-white lg:text-xl" :for="name"
      >{{ label }}<span class="text-red-500"> *</span></label
    >
    <Field
      v-slot="{ field, errors }"
      :name="name"
      :rules="rule"
      :validate-on-input="true"
    >
      <input
        :id="name"
        v-bind="field"
        class="outline-none w-full px-5 py-2 bg-[#CED4DA] mt-3 placeholder-gray-500 rounded-sm"
        :class="{ 'border-2 border-red-500': !!errors?.length }"
        :type="textType"
        :placeholder="placeholder"
      />
    </Field>
    <ErrorMessage class="text-red-400 text-xs lg:text-sm px-5" :name="name" />
    <img
      v-if="type === 'password'"
      class="w-6 absolute top-12 right-5 cursor-pointer"
      src="@/assets/images/eye.png"
      alt="eye"
      @click="showHide"
    />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { defineProps, ref } from "vue";

const props = defineProps({
  rule: { type: String, required: true },
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, required: false },
  type: { type: String, required: false }
});
const textType = ref(props.type);
const showHide = () => {
  return textType.value === "password"
    ? (textType.value = "text")
    : (textType.value = "password");
};
</script>

<template>
  <Form
    v-slot="{ errors, values }"
    class="md:w-52 lg:w-[400px]"
    :initial-errors="{
      password: $route.query.password
    }"
    @submit="submit"
  >
    <div
      class="px-8 md:px-0 w-full h-[60vh] bg-[#24222F] md:h-fit md:bg-inherit flex justify-center items-center mb-10 md:block"
    >
      <div class="md:bg-inherit">
        <div class="bg-[#11101A] w-full p-6 rounded mb-8">
          <h2 class="text-white mb-4">{{ $t("Passwords_Contain") }}</h2>
          <ul>
            <li
              :class="
                values?.password ? more(errors?.password) : 'text-[#9C9A9A]'
              "
            >
              <span
                :class="
                  values?.password
                    ? moreSpan(errors?.password)
                    : 'text-[#9C9A9A]'
                "
                >&#x2022;</span
              >
              {{ $t("Eeght_Ormore") }}
            </li>
            <li
              :class="
                values?.password ? less(errors?.password) : 'text-[#9C9A9A]'
              "
            >
              <span
                :class="
                  values?.password
                    ? lessSpan(errors?.password)
                    : 'text-[#9C9A9A]'
                "
                >&#x2022;</span
              >
              {{ $t("fifteen_Orless") }}
            </li>
          </ul>
        </div>
        <text-input
          name="password"
          :label="$t('password')"
          type="password"
          :placeholder="$t('password')"
          rule="required|min:8|max:15|alpha_num|lowercase"
        ></text-input>
        <text-input
          name="confirmation"
          :label="$t('Confirm_Password')"
          type="password"
          :placeholder="$t('Confirm_Password')"
          rule="confirmed:@password"
        ></text-input>
      </div>
    </div>
    <input id="submit" type="submit" value="" class="hidden" />
    <profile-buttons :text="$t('add')" />
  </Form>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
import { Form } from "vee-validate";
import { defineEmits } from "vue";
import { useProfileStore } from "@/stores/profile.js";
const profileStore = useProfileStore();
const emit = defineEmits(["submit-event"]);
const more = (errors) => {
  return !errors?.includes(8) && !errors?.includes("required")
    ? "text-white"
    : "text-[#9C9A9A]";
};
const moreSpan = (errors) => {
  return !errors?.includes(8) && !errors?.includes("required")
    ? "text-[#198754]"
    : "text-[#9C9A9A]";
};

const less = (errors) => {
  return !errors?.includes(15) &&
    !errors?.includes("lowercase") &&
    !errors?.includes("დაბალი")
    ? "text-white"
    : "text-[#9C9A9A]";
};
const lessSpan = (errors) => {
  return !errors?.includes(15) &&
    !errors?.includes("lowercase") &&
    !errors?.includes("დაბალი")
    ? "text-[#198754]"
    : "text-[#9C9A9A]";
};
const submit = (values, actions) => {
  emit("submit-event", values, actions);
};
</script>

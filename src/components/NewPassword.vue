<template>
  <Form
    v-slot="{ errors, values }"
    class="md:w-52 lg:w-[400px]"
    @submit="submitPassword"
  >
    <div
      class="px-8 md:mx-8 md:px-0 w-full h-[60vh] bg-[#24222F] md:h-fit md:bg-inherit flex justify-center items-center mb-10 md:block"
    >
      <div class="md:bg-inherit">
        <div class="bg-[#11101A] w-full p-6 rounded mb-8">
          <h2 class="text-white mb-4">Passwords should contain:</h2>
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
              8 or more characters
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
              less than 15 lowercase character
            </li>
          </ul>
        </div>
        <text-input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          rule="required|min:8|max:15|alpha_num|lowercase"
        ></text-input>
        <text-input
          name="confirmation"
          label="Confirm password"
          type="password"
          placeholder="Enter your name"
          rule="confirmed:@password"
        ></text-input>
      </div>
    </div>
    <profile-buttons text="Add" link="profile" />
  </Form>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
import { Form } from "vee-validate";
import { useRouter } from "vue-router";
const router = useRouter();
const submitPassword = () => {
  router.push({ name: "youSure" });
};
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
  return !errors?.includes(15) && !errors?.includes("lowercase")
    ? "text-white"
    : "text-[#9C9A9A]";
};
const lessSpan = (errors) => {
  return !errors?.includes(15) && !errors?.includes("lowercase")
    ? "text-[#198754]"
    : "text-[#9C9A9A]";
};
</script>

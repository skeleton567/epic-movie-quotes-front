<template>
  <profile-popup v-if="popup" :text="popupText" @close-event="popup = false" />
  <dashboard-wrap height=" h-[100vh] md:h-[97vh]">
    <div class="m-6 md:hidden">
      <router-link :to="{ name: 'newsFeed' }"
        ><arrow-left></arrow-left
      ></router-link>
    </div>
    <div>
      <div class="hidden md:block pl-20 mb-24">
        <h1 class="text-2xl">My Profile</h1>
      </div>
      <div
        class="w-full h-[80vh] md:h-fit md:w-[450px] lg:w-[650px] bg-[#24222F] md:bg-[#0a0a12] md:pb-20 md:px-16 md:rounded-xl"
        :class="{ hidden: beganEdit }"
      >
        <div
          class="mt-6 md:mt-0 md:p-0 h-40 grid place-items-center md:-translate-y-12"
        >
          <profile-picture height="h-24 md:m-0" image="profile.jpg" />
          <p class="text-white text-xl mt-2 md:m-0 text-center">
            Upload new photo
          </p>
        </div>
        <profile-data
          label="Username"
          :name="store?.name ? store?.name : 'No name set yet'"
        />
        <div v-if="gAuth">
          <profile-data label="Email" :name="store.email" />
        </div>
        <div v-else>
          <div
            class="flex justify-between mx-8 border-b border-[#CED4DA80] py-4 mt-8"
          >
            <p class="text-white">Password</p>
            <p class="text-white cursor-pointer" @click="editPassword">Edit</p>
          </div>
          <div class="flex justify-between mx-8 py-4 mt-8">
            <p class="text-white">Email</p>
            <arrow-right @click-event="editEmail" />
          </div>
        </div>
      </div>
      <Form v-if="beginEditName" @submit="submitName">
        <div
          class="px-8 w-full h-[30vh] bg-[#24222F] flex justify-center items-center mb-10"
        >
          <text-input
            name="name"
            label="Enter new username"
            rule="required|min:3|max:15|alpha_num|lowercase"
          ></text-input>
        </div>
        <profile-buttons text="Add" />
      </Form>
      <Form
        v-if="beginEditPassword"
        v-slot="{ errors, values }"
        @submit="submitPassword"
      >
        <div
          class="px-8 w-full h-[60vh] bg-[#24222F] flex justify-center items-center mb-10"
        >
          <div>
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
        <profile-buttons text="Add" />
      </Form>
      <div v-if="beginEditEmail">
        <div class="p-8 w-full bg-[#24222F] mb-10">
          <div class="pb-6 border-b border-[#CED4DA80]">
            <h2 class="mb-6">Primary Email</h2>
            <p
              class="relative px-4 py-2 bg-[#19875433] border border-[#198754] rounded"
            >
              {{ store.email }}
              <green-check classes="w-4 absolute top-3 right-3" />
            </p>
          </div>
          <div class="mt-12 pb-6 border-b border-[#CED4DA80]">
            <h2 class="mb-6">ninotabagari12345@gmail.com</h2>
            <div class="flex justify-between">
              <button class="border border-white py-2 px-3 rounded">
                Make this primary
              </button>
              <button class="text-[#CED4DA]">Remove</button>
            </div>
          </div>
          <div class="mt-12 pb-6 border-b border-[#CED4DA80]">
            <h2 class="mb-6">ninotabagari12345@gmail.com</h2>
            <div class="flex justify-between">
              <button class="border border-white py-2 px-3 rounded">
                Make this primary
              </button>
              <button class="text-[#CED4DA]">Remove</button>
            </div>
          </div>
          <h2 class="uppercase mt-12 mb-5">Add new email</h2>
          <button
            class="w-full text-center border border-white py-2 px-3 rounded flex justify-center items-center space-x-3"
            @click="addEmail"
          >
            <plus-icon /> <span>Add</span>
          </button>
        </div>
        <profile-buttons text="Add" />
      </div>
      <you-sure v-if="nameConfrimation" @click-event="confirmName" />
      <you-sure v-if="passwordConfrimation" @click-event="confirmPassword" />
      <you-sure v-if="emailConfrimation" @click-event="confirmEmail" />
    </div>
  </dashboard-wrap>
</template>

<script setup>
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import ProfileButtons from "@/components/ProfileButtons.vue";
import YouSure from "@/components/YouSure.vue";
import ProfilePopup from "@/components/ProfilePopup.vue";
import GreenCheck from "@/components/icons/GreenCheck.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import ProfileData from "@/components/ProfileData.vue";
import { Form } from "vee-validate";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
const store = useUserStore();
let beginEditName = ref(false);
let beginEditPassword = ref(false);
let beginEditEmail = ref(false);
let beganEdit = ref(false);
let nameConfrimation = ref(false);
let passwordConfrimation = ref(false);
let emailConfrimation = ref(false);
let popup = ref(false);
let gAuth = ref(false);
let newEmail = ref(false);
let popupText = ref("Username changed succsessfully");
const editName = () => {
  beginEditName.value = true;
  beganEdit.value = true;
};
const editPassword = () => {
  beginEditPassword.value = true;
  beganEdit.value = true;
};
const editEmail = () => {
  beginEditEmail.value = true;
  beganEdit.value = true;
};
const submitName = () => {
  beginEditName.value = false;
  nameConfrimation.value = true;
};
const confirmName = () => {
  beganEdit.value = false;
  nameConfrimation.value = false;
  popup.value = true;
};
const submitPassword = () => {
  beginEditPassword.value = false;
  passwordConfrimation.value = true;
};
const confirmPassword = () => {
  popupText.value = "New password updated succsessfully";
  popup.value = true;
  beganEdit.value = false;
  passwordConfrimation.value = false;
};
const addEmail = () => {
  beginEditEmail.value = false;
  newEmail.value = true;
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

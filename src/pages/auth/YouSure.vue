<template>
  <div
    class="px-8 h-[40vh] md:fixed md:h-[100vh] md:w-full bg-black md:bg-opacity-75 md:flex justify-center items-center z-1000 cursor-default"
  >
    <div class="w-full h-[30vh] bg-[#24222F] md:bg-[black] md:w-[450px]">
      <div
        class="pb-2 mb-5 h-[20vh] border-b w-full md:w-[450px] border-[#CED4DA33] md:bg-inherit flex justify-center items-center"
      >
        <p class="text-white">Are you sure to make changes ?</p>
      </div>
      <profile-buttons text="Confirm" @click-event="add" />
    </div>
  </div>
</template>

<script setup>
import ProfileButtons from "@/components/ProfileButtons.vue";
import { useRoute, useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();
const add = async () => {
  if (route.query.name) {
    try {
      const response = await axios.patch("update-name", {
        name: route.query.name,
        id: store.id
      });
      profileStore.popup = true;
      profileStore.popupText = "Username changed succsessfully";
      profileStore.message = "";
      store.getAuthUser();
      router.replace({ name: "profile" });
    } catch (error) {
      router.replace({
        name: "editName",
        query: { name: error.response.data.errors?.name[0] }
      });
    }
  } else if (route.query.email) {
    try {
      const response = await axios.post("add-email", {
        email: route.query.email,
        user_id: store.id
      });
      profileStore.popup = true;
      profileStore.popupText = "Email addded succsessfully";
      profileStore.message = "Please check email to verify new address";
      store.getAuthUser();
      router.replace({ name: "profile" });
    } catch (error) {
      router.replace({
        name: "editEmail",
        query: { email: error.response.data.errors?.email[0] }
      });
    }
  } else if (route.query.password) {
    try {
      const response = await axios.patch("update-password", {
        password: route.query.password,
        password_confirmation: route.query.confirmation,
        id: store.id
      });
      console.log(response);
      profileStore.popup = true;
      profileStore.popupText = "Password updated successfully";
      profileStore.message = "";
      router.replace({ name: "profile" });
    } catch (error) {
      console.log(error);
      router.replace({
        name: "editPassword",
        query: { password: error.response.data.errors?.password[0] }
      });
    }
  }
};
</script>

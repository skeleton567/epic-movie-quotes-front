<template>
  <profile-popup
    v-if="profileStore.popup"
    :text="profileStore.popupText"
    :message = 'profileStore.message'
    @close-event="profileStore.popup = false"
  />
  <dashboard-wrap >
    <div class="m-6 md:hidden">
      <a class="text-white cursor-pointer" @click="$router.back()"><arrow-left/></a>
    </div>
    <div class="mb-10">
      <div class="hidden md:block pl-20 mb-16">
        <h1 class="text-2xl">My Profile</h1>
      </div>
      <div
        class="w-full h-[80vh] md:h-fit md:w-[550px] lg:w-[750px] bg-[#24222F] md:bg-[#0a0a12] md:pb-10 md:px-8 md:rounded-xl md:block"
        :class="{ hidden: $route.name !== 'profile' }"
      >
        <div
          class="mt-6 md:mb-0 mb-20 md:mt-0 md:p-0 h-40 grid place-items-center md:-translate-y-12"
        >
          <profile-picture height="h-24 md:m-0" :image="store.profile" />
          <label class="text-white text-xl mt-2 md:m-0 text-center cursor-pointer" for="file">
            Upload new photo
            <input v-show="false" id="file" type="file" @input="uploadImage($event.target.files[0])">
          </label>
        </div>
        <div class="mx-8">
        <profile-data
          label="Username"
          :name="store?.name ? store?.name : 'No name set yet'"
        >
          <router-link
            :to="{ name: 'editName' }"
            class="text-white cursor-pointer md:pb-12"
          >
            Edit
          </router-link></profile-data
        >
        
        <div v-if="store.gAuth">
          <profile-data label="Email" :name="store.email" />
        </div>
        <div v-else>
          <div
            class="hidden md:flex justify-between md:justify-start md:items-center mt-8 md:mt-1 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
          >
            <div>
              <p
                class="relative px-4 py-2 md:px-3 bg-[#19875433] border border-[#198754] rounded md:w-52 lg:w-[400px]"
              >
                {{ store.email }}
                <green-check classes="w-4 absolute top-3 right-3" />
              </p>
            </div>
            <p>Primary Email</p>
          </div>

          <div
          v-for="email in store.secondaryEmails"
            class="hidden md:flex justify-between md:justify-start md:items-center mt-8 md:mt-1 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
          >
            <div class="md:w-52 lg:w-[400px]">
              <p
                :class="[
                  email?.email_verified_at
                    ? 'md:bg-[#CED4DA] md:text-black'
                    :  'text-white md:bg-[#EC952433] md:border border-[#EC9524]'
                ]"
                class="md:rounded md:px-3 md:py-2 relative"
              >
                {{ email.email }}
                <div  v-if="!email.email_verified_at" class="absolute top-3 right-3">
                  <span class="relative tooltip"><p class="absolute left-[50%] top-0 translate-x-[-50%] w-80 bg-white z-10 text-black rounded tooltipText flex space-x-3 px-2 py-4"> <green-check class="w-4"/> <span>Please verify new email address</span> </p><warning-icon /></span>
                </div>
                
              </p>
            </div>
            <button  v-if="email.email_verified_at" @click="profileStore.makePrimary(email.email, store.id, email.email_verified_at)">Make Primary</button>
            <button  v-else >Not Verified</button>
            <button  @click="profileStore.deleteEmail(email.id)">Remove</button>
          </div>
          <div
            class="border-b border-[#CED4DA80] pb-10 md:w-52 lg:w-[400px] hidden md:block"
          >
            <router-link
              :to="{ name: 'editEmail' }"
              class="w-48 text-center border border-white py-2 px-3 rounded md:flex justify-center items-center space-x-3 mt-10"
            >
              <plus-icon /> <span>Add New Email</span>
            </router-link>
          </div>
          <div
            class="flex justify-between md:justify-start md:items-center mt-8 md:mt-4 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
          >
            <div class="md:w-52 lg:w-[400px]">
              <p class="text-white md:w-52">Password</p>
            </div>
            <router-link
              class="cursor-pointer block md:hidden"
              :to="{ name: 'editPassword' }"
              >Edit</router-link
            >
            <button
              v-if="!changePassword"
              class="hidden md:block"
              @click="editPassword"
            >
              Edit
            </button>
          </div>
          <div v-if="changePassword">
            <new-password/>
          </div>
          <div class="flex justify-between py-4 mt-8 md:hidden">
            <p class="text-white">Email</p>
            <router-link :to="{ name: 'emailPage' }"
              ><arrow-right
            /></router-link>
          </div>
        </div>
        </div>
      </div>
      <div
      v-if="changePassword"
    class="mt-12 flex justify-between items-center md:justify-end md:space-x-7 px-10"
  >
    <a class="text-white cursor-pointer" @click="cancelPasswordChange">Cancel</a>
    <button
      class="text-white py-2 px-3 bg-[#E31221] rounded-[4px]"
      @click="submitPassword"
    >
      Save changes
    </button>
  </div>
    </div>
    <router-view></router-view>
  </dashboard-wrap>
</template>

<script setup>
import GreenCheck from "@/components/icons/GreenCheck.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import ProfilePopup from "@/components/ProfilePopup.vue";
import ProfileData from "@/components/ProfileData.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import NewPassword from "@/components/NewPassword.vue";
import axios from "@/config/axios/index.js";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { useProfileStore } from "@/stores/profile.js";
import { ref } from "vue";
const store = useUserStore();
const profileStore = useProfileStore();
let changePassword = ref(false);
const cancelPasswordChange = () => {
  changePassword.value = false;
}
const editPassword = () => {
  changePassword.value = true;
};
const submitPassword = async (values) => {
  try {
      const response = await axios.patch("update-password", {
        password: profileStore.password,
        password_confirmation: profileStore.password_confirmation,
        id: store.id
      });
      console.log(response);
      profileStore.popup = true;
      profileStore.popupText = "Password updated successfully";
      profileStore.message = "";
      changePassword = false;
    } catch (error) {
    console.log(error);
    }
 
};
const uploadImage = async (file) => {
  try {
    const fd = new FormData();
    fd.set('image', file );
    const response = await axios.post("profile-image", fd);
    store.getAuthUser();
  } catch (error) {
    console.log(error);
  }
}
</script>


<style scoped>
.tooltipText {
  visibility: hidden;
}
.tooltipText::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border: 9px solid;
  border-color: #FFF #0000 #0000 #0000;
}

.tooltip:hover  .tooltipText {
  top: -600%;
  visibility: visible;
}
</style>
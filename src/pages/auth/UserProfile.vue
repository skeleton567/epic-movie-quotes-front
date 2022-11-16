<template>
  <profile-popup
    v-if="profileStore.popup"
    :text="$t(profileStore.popupText)"
    :message="profileStore.message ? $t(profileStore.message) : ''"
    @close-event="profileStore.popup = false"
  />
  <dashboard-wrap>
    <div class="m-6 md:hidden">
      <arrow-left @hide-event="$router.back()"/>
    </div>
    <div class="mb-10">
      <div class="hidden md:block pl-20 mb-16">
        <h1 class="text-2xl">{{$t('profile')}}</h1>
      </div>
      <div
        class="w-full h-[80vh] md:h-fit md:w-[550px] lg:w-[750px] bg-[#24222F] md:bg-[#0a0a12] md:pb-10 md:px-8 md:rounded-xl md:block"
        :class="{ hidden: $route.name !== 'profile' }"
      >
        <div
          class="mt-6 md:mb-0 mb-20 md:mt-0 md:p-0 h-40 grid place-items-center md:-translate-y-12"
        >
          <profile-picture height="h-24 w-24 md:m-0" :image="store.profile" />
          <label class="text-white text-xl mt-2 md:m-0 text-center cursor-pointer" for="file">
            {{$t('Upload_Photo')}}
            <input v-show="false" id="file" type="file" @input="uploadImage($event.target.files[0])">
          </label>
        </div>
        <div class="mx-8">
        <profile-data
          :label="$t('name')"
          :name="store?.name ? store?.name : 'No name set yet'"
        >
          <router-link
            :to="{ name: 'editName' }"
            class="text-white cursor-pointer md:pb-12"
          >
          {{$t("edit")}}
          </router-link></profile-data
        >
        
        <div v-if="store.gAuth">
          <profile-data :label="$t('email')" :name="store.email" />
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
            <p>{{$t("Primary_Email")}}</p>
          </div>

          <div
          v-for="email in store.secondaryEmails"
          :key="email?.id"
            class="hidden md:flex justify-between md:justify-start md:items-center mt-8 md:mt-1 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
          >
            <div class="md:w-52 lg:w-[400px]">
              <p
                :class="[
                  email?.email_verified_at
                    ? 'md:bg-[#CED4DA] md:text-black'
                    :  'text-white md:bg-[#EC952433] md:border border-[#EC9524]'
                ]"
                class="md:rounded md:px-3 md:py-2 relative md:w-[400px] flex-shrink-0"
              >
                {{ email.email }}
                <div  v-if="!email.email_verified_at" class="absolute top-3 right-3">
                  <span class="relative tooltip"><p class="absolute left-[50%] top-0 translate-x-[-50%] w-80 bg-white z-10 text-black rounded tooltipText flex space-x-3 px-2 py-4"> <green-check class="w-4"/> <span>{{$t("Please_Verify")}}</span> </p><warning-icon /></span>
                </div>
                
              </p>
            </div>
            <button  v-if="email.email_verified_at" @click="profileStore.makePrimary(email.email, email.email_verified_at)" :class="{'text-sm': $i18n.locale === 'ka'}">{{$t('Make_Primary')}}</button>
            <button class="flex-shrink-2"  v-else >{{$t("Not_Verified")}}</button>
            <button  @click="profileStore.deleteEmail(email.id)">{{$t('remove')}}</button>
          </div>
          <div
            class="border-b border-[#CED4DA80] pb-10 md:w-52 lg:w-[400px] hidden md:block"
          >
            <router-link
              :to="{ name: 'editEmail' }"
              class="max-w-[208px] text-center border border-white py-2 px-3 rounded md:flex justify-center items-center space-x-3 mt-10"
            >
              <plus-icon /> <span :class="{'text-sm': $i18n.locale === 'ka'}">{{$t('Add_Email')}}</span>
            </router-link>
          </div>
          <div
            class="flex justify-between md:justify-start md:items-center mt-8 md:mt-4 border-b border-[#CED4DA80] py-4 md:border-0 md:space-x-6"
          >
            <div class="md:w-52 lg:w-[400px]">
              <p class="text-white md:w-52">{{$t('password')}}</p>
            </div>
            <router-link
              class="cursor-pointer block md:hidden"
              :to="{ name: 'editPassword' }"
              >{{$t("edit")}}</router-link
            >
            <button
              v-if="!changePassword"
              class="hidden md:block"
              @click="editPassword"
            >
            {{$t("edit")}}
            </button>
          </div>
          <div v-if="changePassword">
            <new-password @submit-event="submitPassword"/>
          </div>
          <div class="flex justify-between py-4 mt-8 md:hidden">
            <p class="text-white">{{$t("email")}}</p>
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
    <a class="text-white cursor-pointer" @click="cancelPasswordChange">{{$t("cancel")}}</a>
    <label for="submit"
      class="text-white py-2 px-3 bg-[#E31221] rounded-[4px] cursor-pointer"
    >
      {{$t("Save_Changes")}}
    </label >
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
import { onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useUserStore();
const profileStore = useProfileStore();
let changePassword = ref(false);
const cancelPasswordChange = () => {
  changePassword.value = false;
}
const editPassword = () => {
  changePassword.value = true;
};
const submitPassword = async (values, actions) => {
  try {
      const response = await axios.patch("password", {
        password: values.password,
        password_confirmation: values.confirmation,
        id: store.id
      });
      console.log(response);
      profileStore.popup = true;
      profileStore.popupText = 'Password_Updated';
      profileStore.message = "";
      changePassword.value = false;
  } catch (error) {
    console.log(error);
      actions.setFieldError("password", error.response.data.message);
    }
 
};
const uploadImage = async (file) => {
  try {
    const fd = new FormData();
    fd.set('image', file);
    const response = await axios.post("profile-image", fd);
    store.getAuthUser();
  } catch (error) {
    console.log(error);
  }
}
onUnmounted(() => {
  profileStore.popup = false;
})
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
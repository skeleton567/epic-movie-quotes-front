<template>
  <div class="p-8 w-full bg-[#24222F] mb-10">
    <div class="pb-6 border-b border-[#CED4DA80]">
      <h2 class="mb-6">{{ $t("PrimaryEmail") }}</h2>
      <p
        class="relative px-4 py-2 bg-[#19875433] border border-[#198754] rounded"
      >
        {{ store.email }}
        <green-check classes="w-4 absolute top-3 right-3" />
      </p>
    </div>
    <div
      v-for="email in store.secondaryEmails"
      :key="email.id"
      class="mt-12 pb-6 border-b border-[#CED4DA80]"
    >
      <h2 class="mb-6">{{ email.email }}</h2>
      <div class="flex justify-between">
        <button
          v-if="email.email_verified_at"
          class="border border-white py-2 px-3 rounded"
          @click="
            profileStore.makePrimary(
              email.email,
              store.id,
              email.email_verified_at
            )
          "
        >
          {{ $t("MakePrimary") }}
        </button>
        <button v-else class="border border-white py-2 px-3 rounded">
          {{ $t("NotVerified") }}
        </button>
        <button
          class="text-[#CED4DA]"
          @click="profileStore.deleteEmail(email.id)"
        >
          {{ $t("remove") }}
        </button>
      </div>
    </div>
    <h2 class="uppercase mt-12 mb-5">{{ $t("AddEmail") }}</h2>
    <router-link
      :to="{ name: 'editEmail' }"
      class="w-full text-center border border-white py-2 px-3 rounded flex justify-center items-center space-x-3"
    >
      <plus-icon /> <span>{{ $t("add") }}</span>
    </router-link>
  </div>
</template>

<script setup>
import GreenCheck from "@/components/icons/GreenCheck.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";
const profileStore = useProfileStore();
const store = useUserStore();
const router = useRouter();
</script>

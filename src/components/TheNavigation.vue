<template>
  <header class="pb-10 flex justify-between items-center">
    <h2 class="text-sm uppercase text-[#DDCCAA] font-bold">Movie quotes</h2>
    <nav class="flex items-center space-x-4">
      <locale-changer />
      <router-link
        :to="{ name: 'registration' }"
        class="hidden lg:inline text-white py-2 px-3 bg-[#E31221] rounded-[4px]"
      >
        {{ $t("SignIn") }}
      </router-link>
      <router-link
        :to="{ name: 'login' }"
        class="text-white text-sm border border-white py-2 px-3 rounded-[4px]"
      >
        {{ $t("LogIn") }}
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import LocaleChanger from "@/components/LocaleChanger.vue";
</script>

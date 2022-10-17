<template>
  <header class="pb-10 flex justify-between">
    <h2 class="text-sm uppercase text-[#DDCCAA] font-bold">Movie quotes</h2>
    <nav class="flex items-center space-x-4">
      <div class="hidden w-14 lg:flex items-center justify-between">
        <select id="" class="selecttxt text-white" name="">
          <option class="text-black" selected value="">Eng</option>
          <option class="text-black" value="">ქარ</option>
        </select>
        <img src="@/assets/images/arrow-down.png" alt="arrow" />
      </div>
      <router-link
        :to="{ name: 'registration' }"
        class="hidden lg:inline text-white py-2 px-3 bg-[#E31221] rounded-[4px]"
      >
        Sign up
      </router-link>
      <router-link
        :to="{ name: 'login' }"
        class="text-white text-sm border border-white py-2 px-3 rounded-[4px]"
      >
        Log In
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

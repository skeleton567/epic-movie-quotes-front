<template>
  <header class="pb-10 flex justify-between">
    <h2 class="text-sm uppercase text-[#DDCCAA]">Movie quotes</h2>
    <nav class="flex items-center space-x-4">
      <div class="hidden w-14 lg:flex items-center justify-between">
        <select id="" class="inputtxt text-white" name="">
          <option class="text-black" selected value="">Eng</option>
          <option class="text-black" value="">ქარ</option>
        </select>
        <img src="@/assets/images/arrow-down.png" alt="arrow" />
      </div>
      <button
        class="hidden lg:inline text-white py-2 px-3 bg-[#E31221] rounded-[4px]"
      >
        Sign up
      </button>
      <button
        class="text-white text-sm border border-white py-2 px-3 rounded-[4px]"
      >
        Log In
      </button>
    </nav>
  </header>
</template>

<style scoped>
.inputtxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>

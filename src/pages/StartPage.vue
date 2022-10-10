<template>
  <div class="h-[80vh] pt-8 px-8 lg:px-16">
    <the-navigation></the-navigation>
    <div class="h-[60vh] w-full flex justify-center items-center">
      <div class="flex flex-col items-center space-y-6 w-[400px] lg:w-[800px]">
        <h1 class="text-[#DDCCAA] text-2xl lg:text-6xl text-center">
          Find any quote in millions of movie lines
        </h1>
        <button
          class="text-white py-2 px-3 bg-[#E31221] rounded-[4px] lg:text-xl"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
  <div
    class="h-[100vh] bg-[url('@/assets/images/interstellar.png')] fit pt-[50%] pl-[10%] lg:pt-[200px] lg:pl-44"
  >
    <div class="max-w-[200px] md:max-w-[500px] lg:max-w-[900px] flex space-x-1">
      <div class="flex items-center h-4 lg:h-12">
        <div class="w-3 lg:w-14 h-1 bg-white"></div>
      </div>
      <div>
        <blockquote class="text-white text-sm lg:text-5xl">
          “You have to leave somethig behind to go forward”
        </blockquote>
        <address class="text-white text-xs lg:text-3xl mt-4">
          Interstellar, 2014
        </address>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
export default {
  components: {
    TheNavigation
  }
};
</script>

<style scoped>
.fit {
  background-size: 100% 100%;
}
</style>

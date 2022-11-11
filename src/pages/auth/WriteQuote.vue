<template>
  <div
    class="absolute md:fixed z-10 bg-[#11101a] lg:bg-opacity-75 lg:h-[100vh] top-0 w-full lg:w-full flex justify-center md:mt-24"
    @click="$router.push({ name: 'newsFeed' })"
  >
    <div
      class="fixed top-0 z-10 bg-[#11101a] w-full md:w-[400px] lg:block lg:w-[600px] lg:h-fit md:bg-black md:relative"
      @click.stop
    >
      <new-quote-form :link="{ name: 'newsFeed' }" :title="$t('Write_Quote')">
      </new-quote-form>
    </div>
  </div>
</template>

<script setup>
import NewQuoteForm from "@/components/NewQuoteForm.vue";
</script>

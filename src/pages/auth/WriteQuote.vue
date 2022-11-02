<template>
  <div class="fixed top-0 z-10 bg-[#11101a] w-full">
    <new-quote-form :link="{ name: 'newsFeed' }" title="Write new quote">
    </new-quote-form>
  </div>
</template>

<script setup>
import NewQuoteForm from "@/components/NewQuoteForm.vue";
</script>

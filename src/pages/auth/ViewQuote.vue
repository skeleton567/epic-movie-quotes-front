<template>
  <dashboard-wrap>
    <quote-crud>
      <form-header
        :link="{ name: 'viewMovie', query: { id: route.query.movie_id } }"
        :title="$t('View_Post')"
        :edit-link="{
          name: 'editQuote',
          query: { id: quoteStore?.quote?.id, movie_id: route.query.movie_id }
        }"
      />

      <show-quote>
        <div class="flex items-center space-x-6 my-5">
          <div class="flex items-center space-x-3">
            <p class="text-white text-xl">
              {{ quoteStore?.quote?.comment?.length }}
            </p>
            <comment-icon></comment-icon>
          </div>
          <div class="flex items-center space-x-3">
            <p class="text-white text-xl">
              {{ quoteStore?.quote?.like?.length }}
            </p>
            <heart-icon></heart-icon>
          </div>
        </div>
        <user-comment
          v-for="comment in quoteStore?.quote?.comment"
          :user="
            comment?.user?.name ? comment?.user?.name : comment?.user?.email
          "
          :comment="comment?.comment"
          :image="comment?.user?.image"
        />
        <div class="flex space-x-2 mt-4 mb-6">
          <profile-picture :image="store.profile" />
          <textarea
            disabled
            class="utline-none bg-[#24222F] text-white w-full rounded-xl focus:outline-0 focus:border-black pl-1 py-2"
            :placeholder="$t('Write_Comment')"
            name=""
            cols="30"
            rows="1"
          ></textarea>
        </div>
      </show-quote>
    </quote-crud>
  </dashboard-wrap>
</template>

<script setup>
import FormHeader from "@/components/FormHeader.vue";
import { useQuotesStore } from "@/stores/quotes.js";
import { useMoviesStore } from "@/stores/movies.js";
import UserComment from "@/components/UserComment.vue";
import { useRoute } from "vue-router";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import { useUserStore } from "@/stores/user.js";
import ShowQuote from "@/components/ShowQuote.vue";
import QuoteCrud from "@/components/QuoteCrud.vue";
const store = useUserStore();
const route = useRoute();
const movieStore = useMoviesStore();
const quoteStore = useQuotesStore();

quoteStore.getQuote(route.query.id);
</script>

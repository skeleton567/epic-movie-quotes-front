<template>
  <dashboard-wrap>
    <quote-crud>
      <form-header
        :id="quoteStore?.quote?.user.id"
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
            <comment-icon
              @click-event="showComment = !showComment"
            ></comment-icon>
          </div>
          <div class="flex items-center space-x-3">
            <p class="text-white text-xl">
              {{ quoteStore?.quote?.like?.length }}
            </p>
            <heart-icon :already-liked="liked" @like-event="like"></heart-icon>
          </div>
        </div>
        <user-comment
          v-for="comment in quoteStore?.quote?.comment"
          v-if="showComment"
          :id="comment.user.id"
          :user="
            comment?.user?.name ? comment?.user?.name : comment?.user?.email
          "
          :comment="comment?.comment"
          :image="comment?.user?.image"
          @delete-event="
            notificationStore.deleteComment(comment.id, store.id, true)
          "
        />
        <div class="flex space-x-2 mt-4 mb-6">
          <profile-picture :image="store.profile" />
          <textarea
            class="outline-none bg-[#24222F] text-white w-full rounded-xl focus:outline-0 focus:border-black pl-1 py-2"
            :placeholder="$t('Write_Comment')"
            name=""
            cols="30"
            rows="1"
            @keyup.enter="
              notificationStore.addComment(
                $event.target,
                store.id,
                quoteStore?.quote?.id,
                quoteStore?.quote?.user?.id,
                true
              )
            "
          ></textarea>
        </div>
      </show-quote>
    </quote-crud>
  </dashboard-wrap>
</template>

<script setup>
import FormHeader from "@/components/FormHeader.vue";
import { useQuotesStore } from "@/stores/quotes.js";
import UserComment from "@/components/UserComment.vue";
import { useRoute } from "vue-router";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import { useUserStore } from "@/stores/user.js";
import ShowQuote from "@/components/ShowQuote.vue";
import QuoteCrud from "@/components/QuoteCrud.vue";
import { computed, ref, onUnmounted } from "vue";
import channel from "@/config/pusher";
import { useNotificationStore } from "@/stores/notification.js";
import axios from "@/config/axios/index.js";
import { usePostStore } from "@/stores/post.js";
const postStore = usePostStore();
const notificationStore = useNotificationStore();
const route = useRoute();
const quoteStore = useQuotesStore();
quoteStore.getQuote(route.query.id);
const store = useUserStore();
const showComment = ref(false);
let liked = computed(() => {
  return !!quoteStore?.quote?.like.filter((like) => like.user.id === store.id)
    .length;
});
channel.bind("notification", function (data) {
  if (data.notification) {
    if (data?.data?.comment) {
      quoteStore?.quote.comment.push(data.data);
    } else {
      quoteStore?.quote.like.push(data.data);
    }
  } else {
    if (data?.data?.comment) {
      quoteStore.quote.comment = quoteStore?.quote.comment.filter(
        (comment) => comment.id !== data.data.id
      );
    } else {
      quoteStore.quote.like = quoteStore.quote.like.filter(
        (filterLike) => data.data.id !== filterLike.id
      );
    }
  }
});
const newLike = ref(false);
const like = async () => {
  if (liked.value || newLike.value) {
    const like = quoteStore?.quote.like.filter(
      (like) => like.user.id === store.id
    )[0];
    await axios.delete(`likes/${like.id}`);
    newLike.value = false;
  } else {
    newLike.value = true;
    const response = await axios.post("likes", {
      user_id: store.id,
      quote_id: quoteStore?.quote.id,
      user_to_notify: quoteStore?.quote.user.id
    });
  }
  postStore.refreshPosts();
  store.getAuthUser();
};
</script>

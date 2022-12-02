<template>
  <div class="w-full px-12 my-8 py-7 md:rounded-xl" :class="bgStyle">
    <div class="flex items-center space-x-4">
      <profile-picture :image="image" />
      <p class="text-white">{{ user }}</p>
    </div>
    <p class="text-white mt-3 text-sm">
      “{{ qoute }}” {{ $t("movie") }}-
      <span class="text-[#DDCCAA]">{{ movie }} ({{ post.year }})</span>
    </p>
    <img
      class="rounded-lg mt-3"
      :src="
        post.image
          ? `${link}${post.image}`
          : '../src/assets/images/no-image.jpg'
      "
      alt="movie"
    />
    <div class="flex items-center space-x-6 my-5">
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">{{ comment }}</p>
        <comment-icon @click-event="showComment = !showComment"></comment-icon>
      </div>
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">{{ likes.length }}</p>
        <heart-icon :already-liked="liked" @like-event="like"></heart-icon>
      </div>
    </div>
    <user-comment
      v-for="comment in post.comment"
      v-if="showComment"
      :id="comment.user.id"
      :key="comment.id"
      :user="comment.user?.name ? comment.user.name : comment.user.email"
      :comment="comment.comment"
      :image="comment.user.image"
      @delete-event="
        notificationStore.deleteComment(comment.id, store.id, false)
      "
    />
    <div class="flex space-x-2 mt-4 mb-6">
      <profile-picture :image="store.profile" />
      <textarea
        id=""
        class="utline-none bg-[#24222F] text-white w-full rounded-xl focus:outline-0 focus:border-black pl-1 py-2"
        :placeholder="$t('Write_Comment')"
        name=""
        cols="30"
        rows="1"
        onclick="this.rows = 4;"
        onblur="this.rows = 1;"
        @keyup.enter="
          notificationStore.addComment(
            $event.target,
            store.id,
            index,
            post.user.id,
            false
          )
        "
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { computed, ref } from "vue";
import UserComment from "@/components/UserComment.vue";
import { useNotificationStore } from "@/stores/notification.js";
import axios from "@/config/axios/index.js";
const notificationStore = useNotificationStore();
const store = useUserStore();
const props = defineProps({
  user: { type: String, required: true },
  movie: { type: String, required: true },
  qoute: { type: String, required: true },
  comment: { type: Number, required: false },
  likes: { type: Array, required: false },
  index: { type: Number, required: true },
  post: { type: Object, required: true },
  image: { type: String, required: false }
});
const showComment = ref(false);
const link = import.meta.env.VITE_IMAGE_BASE_URL;
const bgStyle = computed(() => {
  if (props.index % 2 === 0) {
    return "bg-black";
  } else {
    return "bg-[#0a0a12]";
  }
});

let liked = computed(() => {
  return !!props.likes.filter((like) => like.user.id === store.id).length;
});

const newLike = ref(false);
const like = async () => {
  if (liked.value || newLike.value) {
    const like = props.likes.filter((like) => like.user.id === store.id)[0];
    await axios.delete(`likes/${like.id}`);
    newLike.value = false;
  } else {
    newLike.value = true;
    const response = await axios.post("likes", {
      user_id: store.id,
      quote_id: props.index,
      user_to_notify: props.post.user.id
    });
  }
};
</script>

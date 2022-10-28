<template>
  <div class="w-full px-12 my-8 py-7 md:rounded-xl" :class="bgStyle">
    <div class="flex items-center space-x-4">
      <profile-picture :image="image" />
      <p class="text-white">{{ user }}</p>
    </div>
    <p class="text-white mt-3 text-sm">
      “{{ qoute }}” movie-
      <span class="text-[#DDCCAA]">{{ movie }}</span>
    </p>
    <img
      class="rounded-lg mt-3"
      src="@/assets/images/interstellar.png"
      alt="movie"
    />
    <div class="flex items-center space-x-6 my-5">
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">{{ comment }}</p>
        <comment-icon></comment-icon>
      </div>
      <div class="flex items-center space-x-3">
        <p class="text-white text-xl">{{ likes.length }}</p>
        <heart-icon :already-liked="liked" @like-event="like"></heart-icon>
      </div>
    </div>
    <slot></slot>
    <div class="flex space-x-2 mt-4 mb-6">
      <profile-picture :image="store.profile" />
      <textarea
        id=""
        v-model="commentValue"
        class="utline-none bg-[#24222F] text-white w-full rounded-xl focus:outline-0 focus:border-black pl-1 py-2"
        placeholder="Write a comment"
        name=""
        cols="30"
        rows="1"
        onclick="this.rows = 4;"
        onblur="this.rows = 1;"
        @keyup.enter="addComment($event.target)"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import { useUserStore } from "@/stores/user.js";
import { computed, ref, watch } from "vue";
import axios from "@/config/axios/index.js";
import { usePostStore } from "@/stores/post.js";
const postStore = usePostStore();
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
let commentValue = ref("");
const bgStyle = computed(() => {
  if (props.index % 2 === 0) {
    return "bg-black";
  } else {
    return "bg-[#0a0a12]";
  }
});
const store = useUserStore();
const likes = ref(props.likes);
const commentArray = ref(props.post.comment);
let liked = computed(() => {
  return !!likes.value.filter((like) => like.user.id === store.id).length;
});

const like = async () => {
  if (liked.value) {
    const like = likes.value.filter((like) => like.user.id === store.id)[0];
    await axios.delete("likes", { data: { id: like.id } });
    likes.value = likes.value.filter((filterLike) => like.id !== filterLike.id);
  } else {
    const response = await axios.post("likes", {
      user_id: store.id,
      quote_id: props.index,
      user_to_notify: props.post.user.id
    });
    likes.value.push(response.data);
  }
};
const addComment = async (e) => {
  const response = await axios.post("comment", {
    user_id: store.id,
    quote_id: props.index,
    comment: commentValue.value,
    user_to_notify: props.post.user.id
  });
  commentArray.value.push(response.data);
  commentValue.value = "";
  e.blur();
};
</script>

import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useI18n } from 'vue-i18n'


export const useNotificationStore = defineStore("notification", {
    state: () => ({
        newLike: false
    }),
    actions: {
        async like(liked, post, id) {
            if (liked || this.newLike) {
              const like = post.like.filter(
                (like) => like.user.id === id
              )[0];
              await axios.delete(`likes/${like.id}`);
              this.newLike = false;
            } else {
                this.newLike = true;
              const response = await axios.post("likes", {
                user_id: id,
                quote_id: post.id,
                user_to_notify: post.user.id
              });
            }
        },
        async addComment(e, id, index, user_id) {
            const response = await axios.post("comment", {
              user_id: id,
              quote_id: index,
              comment: e.value,
              user_to_notify: user_id
            });
            e.value = '';
            e.blur();
        },
        async deleteComment(id, user_id)  {
            await axios.delete(`comment/${id}`, { data: { user_id } });
          }
    }
});
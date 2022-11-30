import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { usePostStore } from "@/stores/post.js";



export const useNotificationStore = defineStore("notification", {
    state: () => ({
    newLike: false,
    postStore: usePostStore(),
    }),
    actions: {
        async addComment(e, id, index, user_id, refresh) {
            const response = await axios.post("comment", {
              user_id: id,
              quote_id: index,
              comment: e.value,
              user_to_notify: user_id
            });
            e.value = '';
        e.blur();
        if (refresh) {
          this.postStore.refreshPosts();
            }
        },
        async deleteComment(id, user_id, refresh)  {
          await axios.delete(`comment/${id}`, { data: { user_id } });
          if (refresh) {
            this.postStore.refreshPosts();
              }
        }
      
    }
});
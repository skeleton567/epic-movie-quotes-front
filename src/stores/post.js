import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        page: 1,
        searchValue: ''
    }),
    getters: {
        postSearch(state) {
            if (state.searchValue.indexOf('@') === 0) {
                let value = state.searchValue.slice(1);
                return state.posts.filter(post => post.movie.title.toLowerCase().includes(value.toLowerCase()));
            } else if (state.searchValue.indexOf('#') === 0) {
                let value = state.searchValue.slice(1);
                return state.posts.filter(post => post.quote.toLowerCase().includes(value.toLowerCase()));
            }
            return state.posts.filter(post => post.quote.toLowerCase().includes(state.searchValue.toLowerCase()) || post.movie.title.toLowerCase().includes(state.searchValue.toLowerCase()));
        },
    },
    actions: {
        async getPosts() {
            try {
                const response = await axios.get(`post?page=${this.page}`);
                if (response.data.length) {
                    this.page++;
                }
                this.posts.push(...response.data)
                console.log(response);
                console.log(this.posts);
            } catch (error) {
                console.log(error);
            }
        },
        handleScroll() {
            if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
                this.getPosts();
            }
        },
    }
});
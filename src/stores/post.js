import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useI18n } from 'vue-i18n'


export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        page: 1,
        searchValue: '',
        locale: useI18n({ useScope: 'global' })['locale']
    }),
    getters: {
        postSearch(state) {
            if (state.searchValue.indexOf('@') === 0) {
                let value = state.searchValue.slice(1);
                return state.posts.filter(post => post.movie.title[state.locale].toLowerCase().includes(value.toLowerCase()));
            } else if (state.searchValue.indexOf('#') === 0) {
                let value = state.searchValue.slice(1);
                return state.posts.filter(post => post.quote[state.locale].toLowerCase().includes(value.toLowerCase()));
            }
            return state.posts.filter(post => post.quote[state.locale].toLowerCase().includes(state.searchValue.toLowerCase()) || post.movie.title[state.locale].toLowerCase().includes(state.searchValue.toLowerCase()));
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
        async refreshPosts() {
            try {
                const response = await axios.get(`post?page=1`);
                if (response.data.length) {
                    this.page = 2;
                }
                this.posts = response.data;
                console.log(response);
                console.log(this.posts);
            } catch (error) {
                console.log(error);
            }
        }
    }
});
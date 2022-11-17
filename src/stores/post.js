import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useI18n } from 'vue-i18n'


export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        page: 1,
        searchPage: 2,
        searchValue: '',
        locale: useI18n({ useScope: 'global' })['locale']
    }),
    actions: {
        async getPosts() {
            if (this.searchValue) {
                const response = await axios.get(`search-post?page=${this.searchPage}`, {
                    params: {
                        search: this.searchValue
                    }
                });
                this.searchPage++;
                this.posts.push(...response.data);
                console.log(response);
            } else {
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
        },
        async searchPosts() {
            if (this.searchValue === '') {
                this.refreshPosts();
            } else {
                try {
                    const response = await axios.get(`search-post?page=1`, {
                        params: {
                            search: this.searchValue
                        }
                    });
                    this.searchPage = 2;
                    this.posts = response.data;
                    console.log(response);
                    console.log(this.posts);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        resetPosts() {
            this.posts = [];
            this.page = 1;
            this.searchPage = 2;
            this.searchValue = '';
        }
    }
});
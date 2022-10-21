import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useQuotesStore = defineStore("quotes", {
    state: () => ({
        quotes: [],
    }),
    actions: {
        async getQuotes() {
            try {
                const response = await axios.get(`quote`);
                this.quotes.push(...response.data)
                console.log(response);
                console.log(this.posts);
            } catch (error) {
                console.log(error);
            }
        },
    }
});
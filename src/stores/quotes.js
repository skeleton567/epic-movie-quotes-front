import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useQuotesStore = defineStore("quotes", {
    state: () => ({
        quotes: [],
        quote: null,
        file: null,
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
        async getQuote(id) {
            try {
                const response = await axios.get(`quote/${id}`);
                this.quote = response.data
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
        async delete(id = this.quote.id) {
            try {
                const response = await axios.delete(`quote/${id}`);
               
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    }
});
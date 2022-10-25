import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";


export const useProfileStore = defineStore("profile", {
    state: () => ({
        store: useUserStore(),
        popup: false,
        popupText: '',
        errors: {}
    }),
    getters: {
    },
    actions: {    
        async makePrimary(email, id) {
            const response = await axios.post('make-primary', { email: email, id: id });
            this.store.getAuthUser();
        }
    }
});
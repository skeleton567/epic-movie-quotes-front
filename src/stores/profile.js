import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";


export const useProfileStore = defineStore("profile", {
    state: () => ({
        store: useUserStore(),
        popup: false,
        popupText: '',
        errors: {},
        message: ''
    }),
    actions: {
        async makePrimary(email, id, verified) {
            try {
                const response = await axios.post('make-primary', { email: email, id: id, verified: verified });
                this.store.getAuthUser();
            } catch (error) {
                console.log(error);
            }

        },
        async deleteEmail(id) {
            try {
                const response = await axios.delete('destroy-email', { data: { id: id } });
                this.store.getAuthUser();
            } catch (error) {
                console.log(error);
            }

        }
    }
});
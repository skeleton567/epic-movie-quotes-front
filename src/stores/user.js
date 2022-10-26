import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";


export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    id: null,
    email: "",
    email_verified_at: "",
    gAuth: false,
    secondaryEmails: [],
    profile: '',
  }),
  actions: {
    async getAuthUser() {
      try {
        const response = await axios.post("authorized-user");
        this.id = response.data.id;
        await this.getUserEmails();
        this.name = response.data?.name;
        this.email = response.data.email;
        this.email_verified_at = response.data.email_verified_at;
        this.gAuth = response.data?.google_auth;
        this.profile = response.data?.profile_picture;
      } catch (error) {
        console.log(error);
      }
    },
    removeAuthUser() {
      this.name = "";
      this.email = "";
      this.id = null;
      this.email_verified_at = "";
    },
    async getUserEmails() {
      try {
        const response = await axios.get('secondary-email', {
          params: {
            id: this.id
          }
        });
        this.secondaryEmails = response.data.secondary_emails;
      } catch (error) {
        console.log(error);
      }
    }
  }

});

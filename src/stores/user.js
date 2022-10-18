import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    id: null,
    email: "",
    email_verified_at: ""
  }),
  actions: {
    async getAuthUser() {
      try {
        const response = await axios.post("authorized-user");
        this.name = response.data?.name;
        this.email = response.data.email;
        this.id = response.data.id;
        this.email_verified_at = response.data.email_verified_at;
      } catch (error) {
        console.log(error);
      }
    },
    removeAuthUser() {
      this.name = "";
      this.email = "";
      this.id = null;
      this.email_verified_at = "";
    }
  }
});

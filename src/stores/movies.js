import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMoviesStore = defineStore("movies", {
    state: () => ({
        movie: [],
        upload: "Upload image",
        file: null
    }),
    getters: {
    },
    actions: {
        async getMovie(id) {
            try {
              const response = await axios.get(`movies/${id}`);
              this.movie = response.data;
            } catch (error) {
              console.log(error);
            }
        },
        addfile(image) {
            this.upload = "Image Uploaded";
            this.file = image;
          }
    }
});
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";


export const useMoviesStore = defineStore("movies", {
  state: () => ({
        movie: [],
        movies: [],
        upload: "Upload image",
        uploadBig: 'Drag & drop your image here or',
        file: null,
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
            this.uploadBig = "Image Uploaded";
            this.file = image;
      },
      async getMovies () {
        try {
          const response = await axios.get(`movies`);
          console.log(response);
          this.movies = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    }
});
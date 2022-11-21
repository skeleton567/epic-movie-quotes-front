import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";


export const useMoviesStore = defineStore("movies", {
  state: () => ({
        movie: [],
        movies: [],
        upload: "Upload_Image",
        uploadBig: 'Dragn_Drop',
        file: null,
    }),
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
            this.upload = "Image_Uploaded";
            this.uploadBig = "Image_Uploaded";
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
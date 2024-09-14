import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies = createAsyncThunk(
  "movie/getAllMovies",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_MOVIES_API_ACCESS_TOKEN
          }`,
        },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovieById = createAsyncThunk(
  "movie/getMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_MOVIES_API_ACCESS_TOKEN
          }`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../logic/movieThunk";

const initialState = {
  moviesData: [],
  loading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesData = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;

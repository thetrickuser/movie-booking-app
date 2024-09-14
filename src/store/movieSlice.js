import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../logic/movieThunk";

const initialState = {
  moviesData: JSON.parse(localStorage.getItem('moviesData')),
  currentMovie: {},
  selectedSeats: [],
  bookingAmount: 0,
  loading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    addBookingDetails: (state, action) => {
      state.selectedSeats = action.payload.selectedSeats;
      state.bookingAmount = action.payload.bookingAmount;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesData = action.payload;
        localStorage.setItem("moviesData", JSON.stringify(state.moviesData))
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentMovie, addBookingDetails } = movieSlice.actions;

export default movieSlice.reducer;

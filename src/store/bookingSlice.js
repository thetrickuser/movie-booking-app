import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: null,
    seats: [],
    amount: 0,
    theater: null,
    screen: null,
    showtime: null,
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setCurrentMovie: (state, action) => {
            state.movie = action.payload
        },
        resetBooking: (state) => {
            state.currentMovie = null
            state.seats = []
            state.amount = 0
        },
        setOrderSummary: (state, action) => {
            state.seats = action.payload.seats
            state.amount = action.payload.amount
        }
    }
})

export const { setCurrentMovie, setOrderSummary } = bookingSlice.actions

export default bookingSlice
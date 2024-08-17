import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../logic/loginThunk";
import { registerUser } from "../logic/registerThunk";

const initialState = {
    isAuthenticated: false,
    userDetails: {},
    loading: false,
    error: null,
    registrationSuccess: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.userDetails = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userDetails = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registrationSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registrationSuccess = true;
                state.isAuthenticated = true;
                state.userDetails = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.registrationSuccess = false;
            });
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
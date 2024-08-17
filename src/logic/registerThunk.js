import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUrl = import.meta.env.VITE_BACKEND_URL + "/users/register";

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(registerUrl, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

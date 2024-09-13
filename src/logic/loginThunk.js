import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const loginUrl = import.meta.env.VITE_BACKEND_URL + "/users/login";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(loginUrl, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
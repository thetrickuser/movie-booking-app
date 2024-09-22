import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
}

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
        },
        resetUserDetails: (state) => {
            state.name = ''
            state.email = ''
            state.phoneNumber = ''
        }
    }
})

export const { setUserDetails, resetUserDetails } = userDetailsSlice.actions
export default userDetailsSlice
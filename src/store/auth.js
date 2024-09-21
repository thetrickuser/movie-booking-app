import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const initialState = {
    authenticated: false,
    user: null,
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      async queryFn({email, password, name, phoneNumber}) {
        console.log(email, password);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          if (userCredential.user.uid) {
            const docRef = await setDoc(doc(db, 'users', userCredential.user.uid), {
              name,
              email,
              phoneNumber
            })
            console.log(docRef);
          }
          return { data: userCredential.user };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    loginUser: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = await getDoc(doc(db, 'users', userCredential.user.uid));
          console.log(user.data());
          return { data: user.data() };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    logoutUser: builder.mutation({
      async queryFn() {
        try {
          await signOut(auth);
          return { data: 'Logout successful' };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = authApi;
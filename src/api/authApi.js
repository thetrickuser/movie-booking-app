import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setUserDetails, resetUserDetails } from '../store/userDetailsSlice';

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
            await setDoc(doc(db, 'users', userCredential.user.uid), {
              name,
              email,
              phoneNumber
            })
            return { data: {code: 201, status: 'SUCCESS', message: 'User created successfully'} };
          }
        } catch (err) {
          if (err.code === 'auth/email-already-in-use') {
            return { error: { code: 400, message: 'Email already exists', status: 'BAD_REQUEST' } };
          }
        }
      },
    }),
    loginUser: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          if (userCredential?.user?.uid) {
            const userRef = await getDoc(doc(db, 'users', userCredential.user.uid));
            return { data: {code: 200, status: 'SUCCESS', message: 'Login successful', userData: userRef.data() }};
          }
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
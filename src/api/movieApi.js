import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIES_API_ACCESS_TOKEN}`,
    }
  }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => "movie/now_playing?language=en-US&page=1",
      transformResponse: (response) => response.results,
    }),
    getMovieById: builder.query({
      query: (id) => `movie/${id}`,
    })
  })
})

export const { useGetAllMoviesQuery, useGetMovieByIdQuery } = movieApi

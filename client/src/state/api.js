import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/client/qahoaxnews" }),
  reducerPath: "adminApi",
    tagTypes: [
        "Hoax"
    ],
    endpoints:(build) => ({
        getQAHoaxNews: build.query({
            query: () => "",
            providesTags: ["Hoax"],
        })
    })
})
export const {
    useGetQAHoaxNewsQuery,
} = api;
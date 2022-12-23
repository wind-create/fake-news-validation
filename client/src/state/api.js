import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
    tagTypes: [
        "Hoax",
        "FAQ",
        "add"
    ],
    endpoints:(build) => ({
        getQAHoaxNews: build.query({
            query: () => "client/qahoaxnews",
            providesTags: ["Hoax"],
        }),
        getFaq: build.query({
            query: () => "client/faq",
            providesTags: ["FAQ"],
        }),
        postaddData: build.query({
            query: () => ({
                url: "client/add",
                method: "POST"
            }),
            providesTags: ["add"],
        })
    })
})
export const {
    useGetQAHoaxNewsQuery,
    useGetFaqQuery,
    usePostaddDataQuery
} = api;
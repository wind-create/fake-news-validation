import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const dataAdapter = createEntityAdapter({});

const initialState = dataAdapter.getInitialState()

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
        addDataFAQ: build.mutation({
            query: initialFAQData => ({
                url: "client/add",
                method: "POST",
                body: {
                    ...initialFAQData,
                }
            }),
            providesTags: ["add"],
        })
    })
})
export const {
    useGetQAHoaxNewsQuery,
    useGetFaqQuery,
    useAddDataFAQMutation
} = api;
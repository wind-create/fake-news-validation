import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { buildQueries } from "@testing-library/react";

const dataAdapter = createEntityAdapter({});

const initialState = dataAdapter.getInitialState()

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Managers",
        "Hoax",
        "FAQ",
        "add",
        "addHoax"
    ],
    endpoints:(build) => ({
        getUser: build.query({
            query: (id) => `users/${id}`,
            providesTags: ["User"],
          }),
        getManagers: build.query({
            query: () => "users/managers",
            providesTags: ["Managers"]
        }),
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
        }),
        addDataQAHoaxNews: build.mutation({
            query: initialQAHoaxNewsData => ({
                url: "client/addHoax",
                method: "POST",
                body: {
                    ...initialQAHoaxNewsData,
                }
            }),
            providesTags: ["addHoax"],
        })
    })
})
export const {
    useGetUserQuery,
    useGetManagersQuery,
    useGetQAHoaxNewsQuery,
    useGetFaqQuery,
    useAddDataFAQMutation,
    useAddDataQAHoaxNewsMutation
} = api;
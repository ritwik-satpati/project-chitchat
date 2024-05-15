import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["Conversations", "Users", "User", "Messages"],

  endpoints: (builder) => ({
    conversations: builder.query({
      query: () => ({
        url: "/conversation/",
        credentials: "include",
      }),
      providesTags: ["Conversations"],
    }),

    searchUsers: builder.query({
      query: (input) => ({
        url: `/user/?search=${input}`,
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),

    getUserByMobileNumber: builder.query({
      query: (mobileNumber) => ({
        url: `/user/mobile-number/${mobileNumber}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    getUserByConversationId: builder.query({
      query: (conversationId) => ({
        url: `/user/conversation/${conversationId}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFirstMessage: builder.mutation({
      query: ({ message, sendToUserId }) => ({
        url: `/message/send/${sendToUserId}`,
        method: "POST",
        credentials: "include",
        body: { message },
      }),
      invalidatesTags: ["Conversations", "Messages", "Users"],
    }),

    // sendMessage: builder.mutation({
    //   query: (data) => ({
    //     url: "/message/send/:sendToUserId",
    //     method: "POST",
    //     credentials: "include",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Messages", "Users"],
    // }),
  }),
});

export default api;
export const {
  useConversationsQuery,
  useLazySearchUsersQuery,
  useLazyGetUserByMobileNumberQuery,
  useLazyGetUserByConversationIdQuery,
  useSendFirstMessageMutation,
} = api;

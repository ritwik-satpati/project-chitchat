import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchUsersSidebar: false,
  // isSearchConversationsSidebar: false,
  isSearchingConversations: false,
  isSearchingUsers: false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsSearchUsersSidebar: (state, action) => {
      state.isSearchUsersSidebar = action.payload;
    },
    // setIsSearchConversationsSidebar: (state, action) => {
    //   state.isSearchConversationsSidebar = action.payload;
    // },
    setIsSearchingConversations: (state, action) => {
      state.isSearchingUsers = action.payload;
    },
    setIsSearcinghUsers: (state, action) => {
      state.isSearchingUsers = action.payload;
    },
  },
});

export default miscSlice;
export const {
  setIsSearchUsersSidebar,
  // setIsSearchConversationsSidebar,
  setIsSearchingConversations,
  setIsSearchingUsers,
} = miscSlice.actions;

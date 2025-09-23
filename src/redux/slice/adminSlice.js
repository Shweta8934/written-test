// src/redux/slices/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizData: [],
  usersList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    logoutAdmin: (state) => {
      // Reset the admin state on logout
      state.quizData = [];
      state.usersList = [];
    },
  },
});

export const { setQuizData, setUsersList, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

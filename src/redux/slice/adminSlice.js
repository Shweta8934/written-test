// src/redux/slices/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizData: [],
  usersList: [],
  // और भी बहुत कुछ
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
  },
});

export const { setQuizData, setUsersList } = adminSlice.actions;
export default adminSlice.reducer;
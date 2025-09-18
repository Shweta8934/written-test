// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice'; // Assuming this is your user slice
import adminReducer from './slice/adminSlice'; // Assuming this is your admin slice
import quizReducer from './slice/quizSlice'; // You'll need to create this

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    quiz: quizReducer, // Add your new quiz slice here
  },
});
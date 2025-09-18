// src/redux/slice/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [],
  currentQuiz: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    addQuestionToQuiz: (state, action) => {
      const { quizId, question } = action.payload;
      const quiz = state.quizzes.find((q) => q.id === quizId);
      if (quiz) {
        quiz.questions.push(question);
      }
    },
    // Add other reducers as needed (e.g., removeQuestion, updateQuestion)
  },
});

export const { setQuizzes, setCurrentQuiz, addQuestionToQuiz } = quizSlice.actions;

export default quizSlice.reducer;
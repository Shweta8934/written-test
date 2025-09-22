import { createSlice } from "@reduxjs/toolkit";

// const userFromStorage = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   isLoggedIn: !!userFromStorage,
//   user: userFromStorage || null,
// };
const userFromStorage = JSON.parse(localStorage.getItem("user"));
const initialState = {
  isLoggedIn: !!userFromStorage,
  user: userFromStorage || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

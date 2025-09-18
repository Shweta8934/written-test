// src/redux/actions/adminActions.js

export const SET_ADMIN_LOGIN = "SET_ADMIN_LOGIN";

export const setAdminLogin = (status) => ({
  type: SET_ADMIN_LOGIN,
  payload: status,
});

// src/redux/reducers/adminReducer.js
import { SET_ADMIN_LOGIN } from "../actions/adminActions";

const initialState = {
  isAdminLoggedIn: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_LOGIN:
      return {
        ...state,
        isAdminLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;

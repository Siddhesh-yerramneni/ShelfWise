import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInStart: (state) => {
      state.error = null; // Clear any previous errors on start
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload; // Save the user data
      state.error = null; // Clear any errors on success
    },
    logInFailure: (state, action) => {
      state.error = action.payload; // Save the error message
    },
    updateStart: (state) => {
      state.error = null;
      // Do not modify currentUser here, just clearing errors
    },
    updateSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload, // Merge updated user data with existing state
      };
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload; // Save the error message
    },
    deleteUserStart: (state) => {
      state.error = null; // Clear any previous errors on start
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null; // User successfully deleted, set to null
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload; // Save the error message
    }
  },
});

export const { logInStart, logInSuccess, logInFailure, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } = userSlice.actions;
export default userSlice.reducer;

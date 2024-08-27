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
  },
});

export const { logInStart, logInSuccess, logInFailure } = userSlice.actions;
export default userSlice.reducer;

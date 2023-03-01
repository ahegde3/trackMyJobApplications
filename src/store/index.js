import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"
import jobReducer from "../slices/jobSlice"

export const store = configureStore({
    reducer: {
        user:userReducer,
        jobProfile:jobReducer

    },
  });
  
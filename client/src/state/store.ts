import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import loaderSlice from "./slices/loaderSlice"

export const store = configureStore({
    reducer: { currentUser: userSlice.reducer, loader: loaderSlice.reducer }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
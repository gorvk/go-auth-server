import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const setLoader = (state: boolean, action: PayloadAction<boolean>): boolean => {
    return action.payload;
}

const slice = createSlice({
    name: "loader",
    initialState,
    reducers: { setLoader }
})

const reducerActions = { actions: slice.actions, reducer: slice.reducer };
export default reducerActions;  
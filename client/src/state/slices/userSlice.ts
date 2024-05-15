import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/models";


const initialState: IUser | null = null as IUser | null;

const setCurrentUser = (_: IUser | null, action: PayloadAction<IUser | null>) => {
    return action.payload;
}

const removeCurrentUser = () => {
    return {} as IUser;
}

const slice = createSlice({
    name: "currentUser",
    initialState,
    reducers: { setCurrentUser, removeCurrentUser }
});

const reducerActions = { actions: slice.actions, reducer: slice.reducer };
export default reducerActions;  

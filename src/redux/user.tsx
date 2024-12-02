import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../interfaces/User";

type UserState = User | null;

const initialState = null as UserState;

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = slice.actions;
export default slice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = number | null;

const initialState = null as UserState;

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (_, action: PayloadAction<number>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = slice.actions;
export default slice.reducer;

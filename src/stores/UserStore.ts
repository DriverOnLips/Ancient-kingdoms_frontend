import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../Interfaces/UserInterface"

interface UserState {
  user: User | null,
  isAuthorized: boolean,
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthorized = state.user ? true : false;
    },
    DeleteUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
    },
  }
});

export const userReducer = UserSlice.reducer;
export const {
  SetUser,
  DeleteUser,
} = UserSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './userInterfaces';

const initialState: UserState = {
  username: localStorage.getItem('username'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
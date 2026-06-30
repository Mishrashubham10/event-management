import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/redux/api/authApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
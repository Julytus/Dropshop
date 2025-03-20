import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../services/api';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  userProfile: {
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
    role: ""
  }
};

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchProfile();
      console.log("fetch", response);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue({ error: 'Unauthorized', status: 401 });
      }
      return rejectWithValue({ error: 'An error occurred', status: error.response?.status });
    }
  }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
      doLoginAction: (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userProfile = action.payload;
      },
      doGetAccountAction: (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userProfile = action.payload;
      },
      doLogoutAction: (state) => {
        
        state.isAuthenticated = false;
        state.userProfile = {
          id: "",
          full_name: "",
          email: "",
          phone_number: "",
          avatar_url: "",
          role: ""
        };
        
        localStorage.removeItem('token');

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAccount.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAccount.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.userProfile = action.payload;
        })
        .addCase(fetchAccount.rejected, (state, action) => {
          state.isLoading = false;
          if (action.payload?.status === 401) {
            state.isAuthenticated = false;
            state.userProfile = null;
          }
        });
    },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
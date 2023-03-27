
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { 
  API_URL, 
  AUTH_REGISTER,
  AUTH_USER, 
  AUTH_LOGIN, 
  AUTH_LOGOUT, 
  PASSWORD_FORGOT, 
  PASSWORD_RESET
} from '../constants';
import { requestWrapper, setTokens, clearTokens } from '../utils';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_REGISTER}`, {method: 'POST', payload});
    return data;
  }
);

export const logIn = createAsyncThunk(
  'user/logIn',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_LOGIN}`, {method: 'POST', payload});
    return data;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_USER}`, {method: 'GET', payload});
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_USER}`, {method: 'PATCH', payload});
    return data;
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_LOGOUT}`, {method: 'POST', payload});
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${PASSWORD_FORGOT}`, {method: 'POST', payload});
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (payload) => {
    const data = await requestWrapper(`${API_URL}${PASSWORD_RESET}`, {method: 'POST', payload});
    return data;
  }
);


const initialState = {
  user: {
    name: null,
    email: null,
  },
  forgotPasswordEmailSend: false,
  resetPasswordSuccessful: false,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {   
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null   
      })
      .addCase(signIn.fulfilled, (state, {payload}) => {
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
        state.isLoggedIn = true
        state.user = payload.user
        state.loading = false
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = action.error
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.user = payload.user
        state.isLoggedIn = true
        state.loading = false
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = action.error
      })

      .addCase(logIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logIn.fulfilled, (state, {payload}) => {
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
        state.user = payload.user
        state.isLoggedIn = true
        state.loading = false
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })


      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        state.user = payload.user
        state.loading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

      .addCase(logOut.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user
        state.isLoggedIn = false
        clearTokens()
        state.loading = false
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordEmailSend = true
        state.loading = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordSuccessful = true
        state.loading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export default userSlice

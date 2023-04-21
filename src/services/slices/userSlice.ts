
import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit'
import { 
  API_URL, 
  AUTH_REGISTER,
  AUTH_USER, 
  AUTH_LOGIN, 
  AUTH_LOGOUT, 
  PASSWORD_FORGOT, 
  PASSWORD_RESET
} from '../../constants';
import { requestWrapper, setTokens, clearTokens } from '../../utils';

export type SignInPayload = {
  name: string,
  email: string,
  password: string,
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (payload: SignInPayload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_REGISTER}`, {method: 'POST', payload});
    return data;
  }
);

export type LogInPayload = {
  email: string,
  password: string
}

export const logIn = createAsyncThunk(
  'user/logIn',
  async (payload: LogInPayload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_LOGIN}`, {method: 'POST', payload});
    return data;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const data = await requestWrapper(`${API_URL}${AUTH_USER}`, {method: 'GET'});
    return data;
  }
);

export type UpdateUserPayload = {
  email?: string,
  name?: string,
  password?: string
}

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: UpdateUserPayload) => {
    const data = await requestWrapper(`${API_URL}${AUTH_USER}`, {method: 'PATCH', payload});
    return data;
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (payload: { token: string | null}) => {
    const data = await requestWrapper(`${API_URL}${AUTH_LOGOUT}`, {method: 'POST', payload});
    return data;
  }
);

export type ForgotPasswordPayload = {
  email: string 
}

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (payload: ForgotPasswordPayload) => {
    const data = await requestWrapper(`${API_URL}${PASSWORD_FORGOT}`, {method: 'POST', payload});
    return data;
  }
);

export type ResetPasswordPayload = {
  password: string,
  token: string
}

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (payload: ResetPasswordPayload) => {
    const data = await requestWrapper(`${API_URL}${PASSWORD_RESET}`, {method: 'POST', payload});
    return data;
  }
);

export type User = {
  name: string,
  email: string,
}

type UserState = {
  user: User,
  forgotPasswordEmailSend: boolean,
  resetPasswordSuccessful: boolean,
  isLoggedIn: boolean,
  loading: boolean,
  error: null | SerializedError
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
  },
  forgotPasswordEmailSend: false,
  resetPasswordSuccessful: false,
  isLoggedIn: false,
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

export type UserActionTypes =
  | ReturnType<typeof signIn>
  | ReturnType<typeof getUser>
  | ReturnType<typeof logIn>
  | ReturnType<typeof updateUser>
  | ReturnType<typeof logOut>
  | ReturnType<typeof forgotPassword>
  | ReturnType<typeof resetPassword>;


export default userSlice

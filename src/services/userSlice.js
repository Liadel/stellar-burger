
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { API_URL } from '../constants';
import { requestWrapper } from '../utils';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (payload) => {
    // const data = await requestWrapper({url: `${API_URL}/orders`, payload});
    // return data;
  }
);

export const logIn = createAsyncThunk(
  'user/logIn',
  async (payload) => {
    // const data = await requestWrapper({url: `${API_URL}/orders`, payload});
    // return data;
  }
);

export const getUser = createAsyncThunk(
  'user/logIn',
  async (payload) => {
    // const data = await requestWrapper({url: `${API_URL}/orders`, payload});
    // return data;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (payload) => {
    // const data = await requestWrapper({url: `${API_URL}/orders`, payload});
    // return data;
  }
);

export const updatePassword = createAsyncThunk(
  'user/forgotPassword',
  async (payload) => {
    // const data = await requestWrapper({url: `${API_URL}/orders`, payload});
    // return data;
  }
);



const initialState = {
  name: null,
  email: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearOrder: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.number = payload.order.number
        state.name = payload.name
        state.loading = false
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.number = initialState.number
        state.name = initialState.name
      });
  },
})

export const {clearOrder, clearIngredient} = userSlice.actions

export default userSlice

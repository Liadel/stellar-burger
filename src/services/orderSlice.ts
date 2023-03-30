
import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit'
import { API_URL } from '../constants';
import { requestWrapper } from '../utils';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (payload: {ingredients: string[] | null}) => {
    const data = await requestWrapper(`${API_URL}/orders`, { method: 'POST', payload});
    return data;
  }
);

type OrderState = {
  number: number | null,
  name: string,
  loading: boolean,
  error: null | SerializedError
}

const initialState: OrderState = {
  number: null,
  name: '',
  loading: false,
  error: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendOrder.fulfilled, (state, {payload}) => {
        state.number = payload.order.number
        state.name = payload.name
        state.loading = false
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.number = initialState.number
        state.name = initialState.name
      });
  },
})

export const { clearOrder } = orderSlice.actions

export default orderSlice

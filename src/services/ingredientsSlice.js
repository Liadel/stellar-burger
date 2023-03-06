
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { API_URL } from '../constants';
import { requestWrapper } from '../utils';


export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const { data } = await requestWrapper({url: `${API_URL}/ingredients`});
    return data;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.items = initialState.items
      });
  },
})


export default ingredientsSlice


import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit'
import { API_URL } from '../../constants';
import { Ingredient } from '../../types/IngredientTypes';
import { requestWrapper } from '../../utils';


export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const { data } = await requestWrapper(`${API_URL}/ingredients`, {method: 'GET'});
    return data;
  }
);

export type IngredientsState = {
  items: Ingredient[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState:IngredientsState = {
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
        console.log(action)
        state.loading = false
        state.error = action.error
        state.items = initialState.items
      });
  },
})

export type IngredientsActionsTypes = ReturnType<typeof fetchIngredients>


export default ingredientsSlice

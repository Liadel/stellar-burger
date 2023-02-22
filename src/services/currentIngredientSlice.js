
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  item: null,
}

export const currentIngredientsSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.item = action.payload
    },
    clearIngredient: () => {
      return initialState
    }
  },
  
})

export const { setIngredient, clearIngredient } = currentIngredientsSlice.actions

export default currentIngredientsSlice


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredients: [],
  bun: null
}

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: (state, { payload }) => {
      if (payload.type === 'bun') {
        state.bun = payload
      } else {
        state.ingredients = [...state.ingredients, payload]
      }
    },
    removeIngredient: ({ingredients}, {payload: id}) => {
      return ingredients.filter(ingredient => ingredient.id !== id)
    }
  },
  
})

export const { addIngredient, removeIngredient } = constructorItemsSlice.actions

export default constructorItemsSlice


import { createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '../types/IngredientTypes'

type DraggableIngredient = Ingredient & {dragId: string}

type constructorItemsState = {
  ingredients: DraggableIngredient[],
  bun: Ingredient | null
}

const initialState: constructorItemsState = {
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
    removeIngredient: (state, {payload: id}) => {
      state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== id)
    },
    updateIngredients: (state, {payload}) => {
      state.ingredients = payload
    }
  },
  
})

export const { addIngredient, removeIngredient, updateIngredients } = constructorItemsSlice.actions

export default constructorItemsSlice

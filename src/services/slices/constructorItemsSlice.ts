
import { createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '../../types/IngredientTypes'

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
    removeIngredient: (state, {payload: index}) => {
      state.ingredients.splice(index, 1)
    },
    updateIngredients: (state, {payload}) => {
      state.ingredients = payload
    },
    clearConstructor: () => {
      return initialState
    }
  },
  
})

export const { addIngredient, removeIngredient, updateIngredients, clearConstructor } = constructorItemsSlice.actions

export type ConstructorActionsTypes = 
  | ReturnType<typeof addIngredient> 
  | ReturnType<typeof removeIngredient>
  | ReturnType<typeof updateIngredients>
  | ReturnType<typeof clearConstructor>

export default constructorItemsSlice

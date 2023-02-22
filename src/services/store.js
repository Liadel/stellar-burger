import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredientsSlice'
import currentIngredientsSlice from './currentIngredientSlice'
import constructorSlice from './burgerConstructorSlice'
import orderSlice from './orderSlice'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    currentIngredient: currentIngredientsSlice.reducer,
    burgerConstructor: constructorSlice.reducer,
    order: orderSlice.reducer
  },
})
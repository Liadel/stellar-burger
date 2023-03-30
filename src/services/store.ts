import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorItemsSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    constructorItems: constructorSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer
  },
})
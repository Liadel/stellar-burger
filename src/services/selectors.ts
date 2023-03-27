import { RootState } from './store';

export const selectUser = (state: RootState) => state.user
export const selectIngredients = (state: RootState) => state.ingredients
export const selectCurrentIngredient = (state: RootState) => state.currentIngredient
export const selectConstructorItems = (state: RootState) => state.constructorItems
export const selectOrder = (state: RootState) => state.order
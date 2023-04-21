import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice, { IngredientsActionsTypes} from '../slices/ingredientsSlice'
import constructorSlice, {ConstructorActionsTypes} from '../slices/constructorItemsSlice'
import orderSlice, {OrderActionsTypes} from '../slices/orderSlice'
import userSlice, {UserActionTypes} from '../slices/userSlice'
import { wsReducer } from './wsReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorItems: constructorSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer,
  feed: wsReducer
});

export type TApplicationActions = 
  | IngredientsActionsTypes 
  | ConstructorActionsTypes 
  | OrderActionsTypes 
  | UserActionTypes

export default rootReducer;
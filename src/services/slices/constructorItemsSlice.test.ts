import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import constructorItemsSlice, {
  constructorItemsState, 
  addIngredient, 
  removeIngredient, 
  updateIngredients, 
  clearConstructor 
} from './constructorItemsSlice';


const bun = {
  _id: '1',
  type: 'bun',
}

const mainIngredient = {
  _id: '2',
  type: 'main',
}

const sauceIngredient = {
  _id: '3',
  type: 'sauce',
}

const ingredients = [sauceIngredient, mainIngredient, sauceIngredient]

describe.skip('Constructor items slice', () => {
  let store:  EnhancedStore<{ ingredients: constructorItemsState }>; 

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: constructorItemsSlice.reducer,
      },
    });
  });

  it('it should be possible to add ingredient', () => {
    store.dispatch(addIngredient(mainIngredient));
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual([mainIngredient]);
  });

  it('should add bun to separate field', () => {
    store.dispatch(addIngredient(bun));
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual([]);
    expect(state.bun).toEqual(bun);
  });

  it('should update list of ingredients', () => {
    store.dispatch(updateIngredients(ingredients));
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual(ingredients);
    
  });

  it('should remove ingredient', () => {
    store.dispatch(updateIngredients(ingredients));
    store.dispatch(removeIngredient(0));
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual([mainIngredient, sauceIngredient]);
  });

  it('should clear constructor', () => {
    store.dispatch(clearConstructor());
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual([]);
    expect(state.bun).toEqual(null);
  });
});
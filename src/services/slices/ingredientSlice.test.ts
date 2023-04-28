import ingredientsSlice, { fetchIngredients, IngredientsState } from './ingredientsSlice'
import { configureStore, EnhancedStore, PayloadAction } from '@reduxjs/toolkit'

const ingredients = [{id: '1', name: '11'}, {id: '2', name: '22'}]

describe('ingredient Slice', () => {
  let store: EnhancedStore<{ ingredients: IngredientsState }>

  const mockFetch = jest.spyOn(global, 'fetch');
  beforeEach(() => {  
    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer,
      },
    });
  })

  afterEach(() => {
    mockFetch.mockRestore();
    jest.clearAllMocks()

  })

  it('should successfully fetch ingredients ', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({data: ingredients}),
      ok: true,
    } as unknown as Promise<Response>)
    await store.dispatch(fetchIngredients() as unknown as PayloadAction<void>)
    const state = store.getState().ingredients;
    expect(state.items).toEqual(ingredients)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

})

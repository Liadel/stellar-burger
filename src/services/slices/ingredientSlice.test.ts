/* eslint-disable no-undef */
import ingredientsSlice, { fetchIngredients, IngredientsState } from './ingredientsSlice'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'

const ingredients = [{id: '1', name: '11'}, {id: '2', name: '22'}]

describe.skip('ingredient Slice', () => {
  let store: EnhancedStore<{ ingredients: IngredientsState }>; 


  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({data: ingredients}),
      ok: true,
    } as unknown as Response)

    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer,
      },
    });
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should successfully fetch ingredients ', async () => {
    await store.dispatch(fetchIngredients())
    const state = store.getState().ingredients;
    expect(state.items).toEqual(ingredients)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Request should be failed', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'error' }),
        status: 500,
      })
    )

    await store.dispatch(fetchIngredients())

    const state = store.getState().ingredients;

    expect(state.error?.name).toEqual('Error')
    expect(state.items).toEqual([])
    expect(fetch).toHaveBeenCalledTimes(1)
  })

})

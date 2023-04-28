/* eslint-disable no-undef */
import orderSlice, { sendOrder, OrderState } from './orderSlice'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'

describe.skip('order Slice', () => {
  let store: EnhancedStore<{order: OrderState}>

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ order: {number: '123'} }),
      ok: true,
    } as unknown as Response)

    store = configureStore({
      reducer: {
        order: orderSlice.reducer,
      },
    });
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should successfully complete request', async () => {
    await store.dispatch(sendOrder({ ingredients: ['1', '2'] }))
    
    const state = store.getState().order;
    expect(state.number).toEqual('123')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it.skip('request should be failed', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error' }),
        status: 500,
      })
    )

    await store.dispatch(
      sendOrder({ ingredients: ['1', '2'] })
    )

    const state = store.getState().order;
    expect(state.error?.name).toEqual('Error')
    expect(state.number).toEqual(null)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

})

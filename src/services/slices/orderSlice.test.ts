/* eslint-disable no-undef */
import orderSlice, { sendOrder, OrderState } from './orderSlice'
import { configureStore, EnhancedStore, PayloadAction } from '@reduxjs/toolkit'

describe('order Slice', () => {
  let store: EnhancedStore<{order: OrderState}>
  const mockFetch = jest.spyOn(window, 'fetch');

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ order: { number: '123' } }),
      ok: true,
    } as unknown as Promise<Response>)

    store = configureStore({
      reducer: {
        order: orderSlice.reducer,
      },
    });
  })

  afterEach(() => {
    mockFetch.mockRestore();
  })

  it('should successfully complete request', async () => {
    await store.dispatch(sendOrder({ ingredients: ['1', '2'] }) as unknown as PayloadAction<void>)
    
    const state = store.getState().order;
    expect(state.number).toEqual('123')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('request should be failed', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error' }),
        status: 500,
      }) as Promise<Response>
    )

    await store.dispatch(
      sendOrder({ ingredients: ['1', '2'] }) as unknown as PayloadAction<void>
    )

    const state = store.getState().order;
    expect(state.error?.name).toEqual('Error')
    expect(state.number).toEqual(null)
  })

})

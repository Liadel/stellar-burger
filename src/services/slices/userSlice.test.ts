import userSlice, { signIn, logIn, logOut, getUser, updateUser, UserState } from './userSlice'
import { configureStore, EnhancedStore, PayloadAction } from '@reduxjs/toolkit'

const user = {name: 'John Doe', email: 'johnDoe@email.com'}

describe('userSlice', () => {
  let store: EnhancedStore<{user: UserState}>

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ user, accessToken: '123 456', refreshToken: '654 321' }),
      ok: true,
    } as unknown as Response)

    store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should signIn', async () => {
    await store.dispatch(
      signIn( {...user, password: '***'} ) as unknown as PayloadAction<void>
    )
    const state = store.getState().user;
    expect(state.user).toEqual(user)
    expect(state.isLoggedIn).toEqual(true)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should logIn', async () => {
    await store.dispatch(
      logIn( {...user, password: '***'} ) as unknown as PayloadAction<void>
    )
    const state = store.getState().user;
    expect(state.user).toEqual(user)
    expect(state.isLoggedIn).toEqual(true)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should get user info', async () => {
    await store.dispatch(
      getUser() as unknown as PayloadAction<void>
    )
    const state = store.getState().user;
    expect(state.user).toEqual(user)
    expect(state.isLoggedIn).toEqual(true)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should get logout', async () => {
    await store.dispatch(logOut({token: '123'}) as unknown as PayloadAction<void>)
    const state = store.getState().user;
    expect(state.user).toEqual({
      name: '',
      email: '',
    })
    expect(state.isLoggedIn).toEqual(false)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should update user info', async () => {
    await store.dispatch(
      updateUser(user) as unknown as PayloadAction<void>
    )
    const state = store.getState().user;
    expect(state.user).toEqual(user)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

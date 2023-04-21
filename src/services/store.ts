import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import rootReducer from './reduces';
import { socketMiddleware } from './middleware/socket-middleware'
import  { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";

const wsActions = {
  connect, disconnect, wsConnecting, wsError, wsClose, wsMessage, wsOpen
}

const wsMiddleware = socketMiddleware(wsActions)

export type RootState = ReturnType<typeof rootReducer>;
export type TDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddleware)
  }
})

export const useDispatch = () => dispatchHook<TDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
import { configureStore, Action } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import rootReducer, {TApplicationActions} from './reduces';
import { socketMiddleware } from './middleware/socket-middleware'
import  { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen, TWSActions} from "./actions";

const wsActions = {
  connect, disconnect, wsConnecting, wsError, wsClose, wsMessage, wsOpen
}

const wsMiddleware = socketMiddleware(wsActions)

export type RootState = ReturnType<typeof rootReducer>;
export type TDispatch = ThunkDispatch<RootState, never, TWSActions | Action>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddleware)
  }
})

export const useDispatch = () => dispatchHook<TDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
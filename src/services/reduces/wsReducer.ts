import { createReducer } from "@reduxjs/toolkit"
 import { WebsocketStatus } from "../../types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions";

import { Order } from "../../types/Order";

export type wsStore = {
  status: WebsocketStatus;
  connectionError: string;
  orders: Order[],
  total: number,
  totalToday: number
}

export const initialState: wsStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
}

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    })
})
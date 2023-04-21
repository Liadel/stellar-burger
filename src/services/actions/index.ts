/* eslint-disable @typescript-eslint/prefer-as-const */
import { createAction } from "@reduxjs/toolkit";
import { TwsMessage } from "../../types/Order";

export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_CONNECTING: 'WS_CONNECTING' = 'WS_CONNECTING';
export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';

export const connect = createAction<string, 'WS_CONNECT'>(WS_CONNECT)
export const disconnect = createAction(WS_DISCONNECT);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsOpen = createAction(WS_OPEN);
export const wsClose = createAction(WS_CLOSE);
export const wsMessage = createAction<TwsMessage, 'WS_MESSAGE'>(WS_MESSAGE);
export const wsError = createAction<string, 'WS_ERROR'>(WS_ERROR);

export type TWSActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect> 
                                | ReturnType<typeof wsConnecting> 
                                | ReturnType<typeof wsOpen> 
                                | ReturnType<typeof wsClose> 
                                | ReturnType<typeof wsMessage> 
                                | ReturnType<typeof wsError>;
  
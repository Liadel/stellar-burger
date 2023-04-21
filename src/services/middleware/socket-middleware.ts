import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { Middleware } from 'redux';
import { RootState, useDispatch } from '../store';
import { TwsMessage } from "../../types/Order";
import { getUser } from "../slices/userSlice";

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  wsOpen: ActionCreatorWithoutPayload,
  wsClose: ActionCreatorWithoutPayload,
  wsError: ActionCreatorWithPayload<string>,
  wsMessage: ActionCreatorWithPayload<TwsMessage>,
}


export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<object, RootState> => {
    return (store) => {
      let socket: WebSocket | null = null;
      let isConnected = false;
      let reconnectTimer = 0;
      let url = '';

      return next => action => {
        const  {dispatch} = store;
        
        const { connect, disconnect, wsOpen, 
          wsClose, wsError, wsMessage, wsConnecting } = wsActions;
          if (connect.match(action)) {
            console.log('Websocket connecting')
            url = action.payload
            socket = new WebSocket(url)
            isConnected = true
            window.clearTimeout(reconnectTimer)
            reconnectTimer = 0
            dispatch(wsConnecting())
          }
  
          if (socket) {
            socket.onopen = () => {
              dispatch(wsOpen())
            }
  
            socket.onerror = () => {
              dispatch(wsError('Websocket error'))
            }
  
            socket.onmessage = (event: MessageEvent) => {
              const { data } = event
              const parsedData: TwsMessage = JSON.parse(data)
              dispatch(wsMessage(parsedData))
            }
  
            socket.onclose = (event: CloseEvent) => {
              if (event.code !== 1000) {
                console.log('event',event)
                console.log('error')
                dispatch(wsError(event.code.toString()))
              }
              if (isConnected) {
                dispatch(wsConnecting())
                reconnectTimer = window.setTimeout(() => {
                  dispatch(connect(url))
                }, 3000)
              }
            }
          }
  
          if (socket && disconnect.match(action)) {
            console.log('Websocket disconnect')
            window.clearTimeout(reconnectTimer)
            isConnected = false
            reconnectTimer = 0
            dispatch(wsClose())
            socket.close(1000)
          }
  
          next(action)
        }
      }
  }
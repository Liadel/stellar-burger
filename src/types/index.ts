import { store } from "../services/store";

export type RootState = ReturnType<typeof store.getState>;

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}
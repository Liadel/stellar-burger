import { ORDER_STATUSES } from "../constants";

export type StatusType = keyof typeof ORDER_STATUSES;

export type Order = {
  _id: string,
  ingredients: string[],
  status: StatusType
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}

export type TwsMessage = {
  success: boolean,
  orders: Order[],
  total: number,
  totalToday: number
}
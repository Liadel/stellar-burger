import { wsReducer } from './wsReducer';
import { WebsocketStatus } from '../../types';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from '../actions';

import { Order, TwsMessage } from '../../types/Order';

describe('wsReducer', () => {
  it('should handle wsConnecting', () => {
    const state = wsReducer(undefined, wsConnecting());
    expect(state.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('should handle wsOpen', () => {
    const state = wsReducer(undefined, wsOpen());
    expect(state.status).toEqual(WebsocketStatus.ONLINE);
  });

  it('should handle wsError', () => {
    const error = 'Connection error';
    const state = wsReducer(undefined, wsError(error));
    expect(state.connectionError).toEqual(error);
  });

  it('should handle wsClose', () => {
    const state = wsReducer(undefined, wsClose());
    expect(state.status).toEqual(WebsocketStatus.OFFLINE);
  });

  it('should handle wsMessage', () => {
    const orders = [{ id: 1, price: 100 }, { id: 2, price: 200 }] as unknown as Order[];
    const total = 300;
    const totalToday = 500;
    const message: TwsMessage = { orders, total, totalToday, success: true };
    const state = wsReducer(undefined, wsMessage(message));
    expect(state.orders).toEqual(orders);
    expect(state.total).toEqual(total);
    expect(state.totalToday).toEqual(totalToday);
  });
});

import { CommentsType } from './lib/types';
import { socket } from './socket';
import { AppDispatch } from './store';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

export const connectSocket = () => ({
  type: CONNECT_SOCKET,
});

export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET,
});

export const receiveComment = (comment: CommentsType) => ({
  type: RECEIVE_COMMENT,
  payload: comment,
});

export const startListening = () => (dispatch: AppDispatch) => {
  dispatch(connectSocket());

  socket.on('connect', () => {
    console.log('Соединение установлено');
  });

  socket.on('disconnect', () => {
    dispatch(disconnectSocket());
    console.log('Соединение закрыто');
  });
};

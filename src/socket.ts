import { io, Socket } from 'socket.io-client';
import { CommentsType } from './lib/types';

interface ServerToClientEvents {
  newComment: (data: CommentsType[]) => void;
}

const URL = 'http://127.0.0.1:4000';
export const socket: Socket<ServerToClientEvents> = io(URL, {
  autoConnect: false,
});

import { io, Socket } from 'socket.io-client';
import { CommentsType } from './lib/types';

interface ServerToClientEvents {
  newComment: (data: CommentsType) => void;
}

interface ClientToServerEvents {
  joinRoom: (payload: { bookId: number }) => void;
  addComment: (payload: { bookId: number; comment: string }) => void;
}

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(URL);

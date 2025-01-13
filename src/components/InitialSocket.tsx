import { useEffect } from 'react';
import { socket } from '../socket';

const InitialSocket: React.FC = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', () => {
      console.log('connected to socket');
    });

    socket.on('disconnect', () => {
      console.log('disconnected to socket');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);
  return null;
};

export default InitialSocket;

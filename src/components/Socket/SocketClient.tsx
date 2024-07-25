import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketComponentProps {
    onMessage: (message: string) => void;
}

const SocketComponent: React.FC<SocketComponentProps> = ({ onMessage }) => {
    useEffect(() => {
        const socket: Socket = io('http://127.0.0.1:5000', {
            transports: ['websocket', 'polling'], // Ensure 'websocket' is included
            reconnectionAttempts: 5, // Number of reconnection attempts
            timeout: 10000, // Connection timeout
        }); // Update with your server URL if needed

        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });

        socket.on('message', (message: string) => {
            onMessage(message)
        });

        return () => {
            socket.disconnect();
        };
    }, [onMessage]);

    return null;
};

export default SocketComponent;
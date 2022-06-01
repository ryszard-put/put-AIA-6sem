import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Input from './Input';
const socket = io('http://localhost:4000', { withCredentials: true });
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
    socket.on('message', (data) => {
      if (loggedIn) setMessages((m) => [...m, data]);
    });

    socket.on('user-joined', (nick, users) => {
      if (loggedIn) {
        setActiveUsers(users);
        setMessages((m) => [...m, `${nick} has joined the chat!`]);
      }
    });

    socket.on('user-left', (nick, users) => {
      if (loggedIn) {
        setActiveUsers(users);
        setMessages((m) => [...m, `${nick} has left the chat :(`]);
      }
    });

    return () => socket.removeAllListeners();
  }, [loggedIn]);

  const send = (message) => {
    socket.emit('message', message);
  };

  const handleLogin = (nick) => {
    socket.emit('login', nick, (response) => {
      if (response.status === 'OK') {
        setLoggedIn(true);
        setActiveUsers(response.users);
      }
    });
  };

  return (
    <div>
      {!loggedIn ? (
        <Input send={handleLogin} buttonText='Login' />
      ) : (
        <>
          <ul>
            {activeUsers.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <ul>
            {messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <Input send={send} buttonText='Send' />
        </>
      )}
    </div>
  );
}

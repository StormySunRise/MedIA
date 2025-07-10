import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/Login';
import ChatDashboard from './components/ChatDashboard';
import { User, Chat } from './models/types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  const handleLogin = (user: User) => {
    setUser(user);
    // Crear un chat inicial
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Consulta ${new Date().toLocaleDateString()}`,
      messages: [
        {
          id: '1',
          text: `¡Hola ${user.name}! Soy tu asistente médico virtual. ¿Qué síntomas estás experimentando hoy?`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([newChat]);
  };

  const handleLogout = () => {
    setUser(null);
    setChats([]);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Consulta ${new Date().toLocaleDateString()}`,
      messages: [
        {
          id: '1',
          text: `¡Hola ${user?.name}! ¿En qué puedo ayudarte hoy?`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([...chats, newChat]);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Asistente Médico - {user.name}
          </Typography>
          <Button color="inherit" onClick={handleNewChat}>
            Nuevo Chat
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <ChatDashboard chats={chats} setChats={setChats} user={user} />
    </Box>
  );
};

export default App;
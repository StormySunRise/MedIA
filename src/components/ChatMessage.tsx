import React from 'react';
import { Box, Typography, Paper, Avatar, useTheme } from '@mui/material';
import { Message, User } from '../models/types';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  user: User;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser, user }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          maxWidth: '80%',
        }}
      >
        <Avatar
          sx={{
            bgcolor: isCurrentUser ? theme.palette.primary.main : theme.palette.secondary.main,
            ml: isCurrentUser ? 1 : 0,
            mr: !isCurrentUser ? 1 : 0,
            width: 32,
            height: 32,
          }}
        >
          {isCurrentUser ? user.name.charAt(0) : 'AI'}
        </Avatar>
        <Paper
          elevation={2}
          sx={{
            p: 1.5,
            backgroundColor: isCurrentUser 
              ? theme.palette.primary.light 
              : theme.palette.secondary.light,
            borderRadius: isCurrentUser
              ? '18px 18px 0 18px'
              : '18px 18px 18px 0',
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{
              textAlign: 'right',
              color: 'text.secondary',
              mt: 0.5,
            }}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatMessage;
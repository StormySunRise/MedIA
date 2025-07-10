import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Describe tus síntomas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
      />
      <IconButton color="primary" onClick={onSubmit} disabled={!value.trim()}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatInput; 
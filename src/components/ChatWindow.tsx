import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  List,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import { Message, User } from "../models/types";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  user: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  user,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <List sx={{ width: "100%" }}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.sender === "user"}
              user={user}
            />
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Paper
        component="form"
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Describe tus síntomas..."
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          sx={{ ml: 1 }}
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatWindow;

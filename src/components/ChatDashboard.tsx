import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ChatWindow from "./ChatWindow";
import { Chat, User } from "../models/types";
export { default as medicalTheme } from "../medicalTheme";

// Componente estilizado para el botón médico
const MedicalButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.medical.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.medical.dark,
  },
}));

// Extender la paleta de colores para el tema médico
declare module "@mui/material/styles" {
  interface Palette {
    medical: Palette["primary"];
  }
  interface PaletteOptions {
    medical?: PaletteOptions["primary"];
  }
}

interface ChatDashboardProps {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  user: User;
}

const ChatDashboard: React.FC<ChatDashboardProps> = ({
  chats,
  setChats,
  user,
}) => {
  const theme = useTheme();
  const [currentChatId, setCurrentChatId] = useState<string>(chats[0]?.id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    setMobileOpen(false);
  };

  const handleSendMessage = (text: string, chatId: string) => {
    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        const newUserMessage = {
          id: Date.now().toString(),
          text,
          sender: "user" as const,
          timestamp: new Date(),
        };

        let updatedTitle = chat.title;
        if (chat.messages.length === 1) {
          updatedTitle =
            text.length > 30 ? `${text.substring(0, 30)}...` : text;
        }

        setTimeout(() => {
          const botResponse = {
            id: Date.now().toString(),
            text: `He analizado: "${text}". ¿Podrías describir más detalles sobre tus síntomas?`,
            sender: "bot" as const,
            timestamp: new Date(),
          };
          setChats(
            chats.map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    messages: [...c.messages, botResponse],
                    updatedAt: new Date(),
                  }
                : c
            )
          );
        }, 1000);

        return {
          ...chat,
          title: updatedTitle,
          messages: [...chat.messages, newUserMessage],
          updatedAt: new Date(),
        };
      }
      return chat;
    });

    setChats(updatedChats);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Nueva Consulta Médica",
      messages: [
        {
          id: "1",
          text: `¡Buen día ${user.name}! Soy el Dr. IA. ¿Qué síntomas presenta hoy?`,
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)",
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <MedicalServicesIcon
          sx={{
            color: theme.palette.medical.main,
            mr: 1,
            fontSize: 30,
          }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, color: theme.palette.medical.dark }}
        >
          Dr. {user.name}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.palette.medical.light }} />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                selected={chat.id === currentChatId}
                onClick={() => handleChatSelect(chat.id)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.medical.light,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.medical.light,
                  },
                }}
              >
                <LocalHospitalIcon
                  sx={{
                    color: theme.palette.medical.main,
                    mr: 1,
                  }}
                />
                <ListItemText
                  primary={chat.title}
                  secondary={chat.updatedAt.toLocaleDateString()}
                  primaryTypographyProps={{
                    noWrap: true,
                    color: "text.primary",
                  }}
                  secondaryTypographyProps={{
                    color: "text.secondary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Tooltip title="Nueva Consulta">
          <MedicalButton
            onClick={handleNewChat}
            sx={{
              width: "100%",
              border: "1px dashed",
              borderColor: theme.palette.medical.main,
              borderRadius: 1,
            }}
          >
            <AddIcon />
            <Typography sx={{ ml: 1 }}>Nueva Consulta</Typography>
          </MedicalButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        backgroundColor: "#f5faf5",
      }}
    >
      {/* Botón de control de sidebar */}
      <Box
        sx={{
          width: "auto",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          px: 0.5,
          backgroundColor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          zIndex: 1,
        }}
      >
        <MedicalButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="small"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 1,
          }}
        >
          <ChevronLeftIcon
            fontSize="small"
            sx={{
              transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s",
            }}
          />
        </MedicalButton>
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 250 : 0,
          flexShrink: 0,
          transition: "width 0.3s",
          overflow: "hidden",
          display: { xs: "none", md: "block" },
          backgroundColor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          boxShadow: 2,
        }}
      >
        {drawerContent}
      </Box>

      {/* Chat principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyMzAsMjQ1LDIzNSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0id2hpdGUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48cmVjdCBmaWxsPSJ1cmwoI3BhdHRlcm4pIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')",
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Botón hamburguesa para móvil */}
          <MedicalButton
            onClick={handleDrawerToggle}
            sx={{ m: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </MedicalButton>

          <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {currentChat && (
              <ChatWindow
                messages={currentChat.messages}
                onSendMessage={(text) =>
                  handleSendMessage(text, currentChat.id)
                }
                user={user}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            background: "linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)",
          },
          display: { xs: "block", md: "none" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default ChatDashboard;

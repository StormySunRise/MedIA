import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    medical: {
      main: "#2e7d32",
      light: "#81c784",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    primary: {
       main: "#2e7d32",
      light: "#81c784",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    secondary: {
     main: "#2e7d32",
      light: "#81c784",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// src/theme/medicalTheme.ts
import { createTheme } from '@mui/material/styles';

// Importar la fuente Nunito
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';

const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Verde médico principal
      light: '#81c784',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00796b', // Verde azulado
      light: '#48a999',
      dark: '#004c40',
    },
    medical: {
      main: '#2e7d32',
      light: '#81c784',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5faf5',
      paper: '#ffffff',
    },
    text: {
      primary: '#263238',
      secondary: '#455a64',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#2e7d32',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#2e7d32',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    medical: Palette['primary'];
  }
  interface PaletteOptions {
    medical?: PaletteOptions['primary'];
  }
}

export default medicalTheme;
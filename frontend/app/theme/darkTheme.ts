import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#00BFA5', 
    },
    secondary: {
      main: '#FF6F61', 
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFC107', 
    },
    info: {
      main: '#2196F3', 
    },
    success: {
      main: '#4CAF50', 
    },
    background: {
      default: '#121212', 
      paper: '#1E1E1E', 
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#CCCCCC', 
    },
    divider: '#424242',
  },
});

export default darkTheme;
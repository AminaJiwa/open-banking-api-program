import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#4B4A54', 
    },
    secondary: {
      main: '#82A0AA', 
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
      default: '#2A272A', 
      paper: '#000000', 
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#CCCCCC', 
    },
    divider: '#A3CFCD',
  },
});

export default darkTheme;
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#673AB7', // Deep purple
    },
    secondary: {
      main: '#00BCD4', // Cyan
    },
    error: {
      main: '#FF5252', // Bright red
    },
    warning: {
      main: '#FFC107', // Golden yellow
    },
    info: {
      main: '#2196F3', // Bright blue
    },
    success: {
      main: '#4CAF50', // Green
    },
    background: {
      default: '#1E1E1E', // Dark gray
      paper: '#121212', // Very dark gray
    },
    text: {
      primary: '#F5F5F5', // Soft white
      secondary: '#B0B0B0', // Light gray
    },
    divider: '#424242', // Dark gray
  },
});
export default darkTheme;
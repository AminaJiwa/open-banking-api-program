import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box, IconButton, useTheme } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger icon

interface HeaderProps {
  onMenuToggle: () => void; // Callback function to toggle the side menu
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
        margin: 0,
        padding: 0,
        height: 64, // Set a fixed height for the header
      }}
    >
      <Toolbar
        sx={{
          padding: 0,
          minHeight: "64px !important", // Ensure the Toolbar has a fixed height
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Hamburger Icon to toggle the side menu */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuToggle}
          edge="start"
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo replaced with a bank icon */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <AccountBalanceIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main, marginRight: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            Open Banking Dashboard
          </Typography>
        </Box>

        {/* User Profile */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 2, color: theme.palette.text.primary }}>
            John Doe
          </Typography>
          <Avatar
            alt="User Avatar"
            src="/path/to/user-avatar.png" // Replace with your user avatar path
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
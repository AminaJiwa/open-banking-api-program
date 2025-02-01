import { CSSObject } from "@mui/system";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Person2Icon from "@mui/icons-material/Person2";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Settings } from "@mui/icons-material";
import NextLink from "next/link";
import scss from "../pages/Home.module.scss";
import HomeIcon from "@mui/icons-material/Home";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0, // Set width to 0 when closed
  [theme.breakpoints.up("sm")]: {
    width: 0, // Set width to 0 for larger screens as well
  },
});

const menuRouteList = ["", "accounts", "financial-insights", "settings", ""];
const menuListTranslations = [
  "Home",
  "Accounts",
  "Financial Insights",
  "Settings",
  "Sign Out",
];
const menuListIcons = [
  <HomeIcon />,
  <EqualizerIcon />,
  <Person2Icon />,
  <Settings />,
  <ExitToAppIcon />,
];

interface SideMenuProps {
  open: boolean; // Prop to control open/close state
  onMenuToggle: () => void; // Prop to handle menu toggle
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onMenuToggle }) => {
  const theme = useTheme();
  const mobileCheck = useMediaQuery("(min-width: 600px)");

  const handleListItemButtonClick = (text: string) => {
    text === "Sign Out" ? signOut() : null;
    onMenuToggle(); // Close the menu when an item is clicked
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0, // Set width to 0 when closed
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : 0, // Set width to 0 when closed
          boxSizing: "border-box",
          top: mobileCheck ? 64 : 57, // Adjust this value to match your header height
          height: mobileCheck ? "calc(100vh - 64px)" : "calc(100vh - 57px)", // Adjust height to fit below the header
          ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
          }),
        },
      }}
    >
      <div className={scss.drawerHeader}>
        <IconButton onClick={onMenuToggle}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <Divider />
      <List>
        {menuListTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <NextLink
              className={scss.link}
              href={`/dashboard/${menuRouteList[index]}`}
            >
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)}
                title={text}
                aria-label={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuListIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    color: theme.palette.text.primary,
                    opacity: open ? 1 : 0, // Hide text when closed
                  }}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
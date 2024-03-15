import { AppBar, Toolbar, IconButton, Box, Badge } from "@mui/material";
import {
  Menu as MenuIcon,
  X as XIcon,
  Notifications as NotiIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ArrowBack as BackIcon,
  People as UsersIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { useUIState } from "../providers/UIStateProvider";
import { useAppTheme } from "../providers/AppThemeProvider";

const Header = () => {
  const { setOpenDrawer } = useUIState();
  const { mode, setMode } = useAppTheme();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "header.background" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {pathname === "/" ? (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </IconButton>
        )}
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <XIcon />
        </IconButton>
        <Box>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <UsersIcon />
          </IconButton>
          {mode === "dark" ? (
            <IconButton color="inherit" onClick={() => setMode("light")}>
              <LightModeIcon edge="end" />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => setMode("dark")}>
              <DarkModeIcon edge="end" />
            </IconButton>
          )}

          <IconButton color="inherit" edge="end">
            <Badge badgeContent={1} color="error">
              <NotiIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

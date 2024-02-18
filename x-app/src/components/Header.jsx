import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import {
  Menu as MenuIcon,
  X as XIcon,
  Notifications as NotiIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useUIState } from "../providers/UIStateProvider";
import { useAppTheme } from "../providers/AppThemeProvider";

const Header = () => {
  const { setOpenDrawer } = useUIState();
  const { mode, setMode } = useAppTheme();
  
  return (
    <AppBar position="static" sx={{ bgcolor: "header.background" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <XIcon color="inherit" />
        <Box>
          {mode === "dark" ? (
            <IconButton onClick={() => setMode("light")}>
              <LightModeIcon color="inherit" edge="end" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setMode("dark")}>
              <DarkModeIcon color="inherit" edge="end" />
            </IconButton>
          )}

          <IconButton>
            <NotiIcon color="inherit" edge="end" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import PropTypes from "prop-types";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
  Checklist as ChecklistIcon,
  ClearAll as ClearAllIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../Theme";

const Header = ({ count, clear }) => {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Badge badgeContent={count} color="error">
          <ChecklistIcon />
        </Badge>
        <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
          CheckList
        </Typography>
        <IconButton color="inherit" onClick={clear}>
          <ClearAllIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => (mode === "dark" ? setMode("light") : setMode("dark"))}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  count: PropTypes.number.isRequired,
  clear: PropTypes.any.isRequired,
};

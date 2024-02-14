
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
  Checklist as ChecklistIcon,
  ClearAll as ClearAllIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../Theme";

import { useSelector, useDispatch } from "react-redux";
import { clear } from "../app/todoSlice";

const Header = () =>
  // { count, clear }
  {
    const { mode, setMode } = useContext(ThemeContext);

    const list = useSelector((state) => state.todo.items);

    const dispatch = useDispatch();

    return (
      <AppBar position="static">
        <Toolbar>
          <Badge
            badgeContent={list.filter((i) => !i.done).length}
            color="error"
          >
            <ChecklistIcon />
          </Badge>
          <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
            CheckList
          </Typography>
          <IconButton color="inherit" onClick={() => dispatch(clear())}>
            <ClearAllIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() =>
              mode === "dark" ? setMode("light") : setMode("dark")
            }
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };

export default Header;


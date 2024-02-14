import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import AppRouter from "./Router/AppRouter";
import { useMemo, createContext, useState } from "react";

export const ThemeContext = createContext();

const Theme = () => {
  const [mode, setMode] = useState("dark");
  
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Theme;

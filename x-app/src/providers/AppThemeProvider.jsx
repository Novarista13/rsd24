import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useMemo, createContext, useContext } from "react";
import { indigo } from "@mui/material/colors";

const AppThemeContext = createContext();

export function useAppTheme() {
  return useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  // console.log(mode);
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              header: { background: indigo[400] },
              banner: { background: "#e1e1e1" },
            }
          : {
              header: { background: indigo[900] },
              banner: { background: "#222" },
            }),
      },
    });
  }, [mode]);

  return (
    <AppThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

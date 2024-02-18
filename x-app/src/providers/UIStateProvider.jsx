/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";

const UIStateContext = createContext();

export function useUIState() {
  return useContext(UIStateContext);
}

const UIStateProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <UIStateContext.Provider value={{ openDrawer, setOpenDrawer }}>
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;

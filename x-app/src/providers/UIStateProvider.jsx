/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";

const UIStateContext = createContext();

export function useUIState() {
  return useContext(UIStateContext);
}

const UIStateProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  return (
    <UIStateContext.Provider
      value={{
        openDrawer,
        setOpenDrawer,
        openFeedback,
        setOpenFeedback,
        feedbackMessage,
        setFeedbackMessage,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;

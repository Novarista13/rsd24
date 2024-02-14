import { useEffect, useRef } from "react";
import { Input, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { add } from "../app/todoSlice";
import { useDispatch } from "react-redux";

export default function AddForm() {
// { add }
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const subject = inputRef.current.value;
        // add(subject);
        dispatch(add(subject));
        inputRef.current.value = "";
        inputRef.current.focus();
      }}
    >
      <Input
        inputRef={inputRef}
        fullWidth
        endAdornment={
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        }
      />
    </form>
  );
}



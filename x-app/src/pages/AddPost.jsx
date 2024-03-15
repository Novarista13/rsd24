import {
  Alert,
  Box,
  Button,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const AddPost = () => {
  const inputRef = useRef();
  const { authUser } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add Post
      </Typography>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const content = inputRef.current.value;
          if (!content) {
            setErrorMessage("content required");
            setHasError(true);
          }
          if (!authUser) {
            setErrorMessage("you can't create a post without loging in");
            setHasError(true);
          }

          const api = import.meta.env.VITE_API_URL;
          const res = await fetch(`${api}/posts`, {
            method: "POST",
            body: JSON.stringify({
              type: "post",
              body: content,
              owner: authUser?._id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            setErrorMessage("Something went wrong, try again");
            setHasError(true);
            return false;
          }

          const data = await res.json();
          if (data._id) {
            navigate("/");
          }
        }}
      >
        {hasError && (
          <Alert sx={{ my: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <TextField
          inputRef={inputRef}
          fullWidth
          label="Content"
          multiline
          rows={3}
          sx={{ my: 2 }}
          variant="outlined"
        />

        <Button type="submit" sx={{ my: 2 }} fullWidth variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddPost;

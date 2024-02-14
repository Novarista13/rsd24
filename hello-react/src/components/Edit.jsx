/* eslint-disable react/prop-types */
import { Input, IconButton } from "@mui/material";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Edit = ({ update }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  let { state } = useLocation();
  if (!state) navigate("/");

  const [subject, setSubject] = useState(state.item.subject);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update(state.item._id, subject);
          navigate("/");
        }}
      >
        <Input
          value={subject}
          sx={{ mb: 4 }}
          fullWidth
          inputRef={inputRef}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          endAdornment={
            <IconButton type="submit">
              <SaveIcon />
            </IconButton>
          }
        />
      </form>
      <IconButton>
        <Link to="/">
          <BackIcon />
        </Link>
      </IconButton>
    </div>
  );
};

export default Edit;

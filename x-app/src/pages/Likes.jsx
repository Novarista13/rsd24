import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useParams } from "react-router-dom";

import UserList from "../components/UserList";

const Likes = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    (async () => {
      const res = await fetch(`${api}/users/likes/${id}`);
      setUsers(await res.json());
    })();
  }, []);

  return <UserList users={users} title="Likes" />;
};

export default Likes;

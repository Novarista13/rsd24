import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  Comment as CommentIcon,
  Favorite as LikeIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useUIState } from "../providers/UIStateProvider";

const Notis = () => {
  const navigate = useNavigate();
  const [notis, setNotis] = useState({});
  const { setNotiCount } = useUIState();

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    (async () => {
      const res = await fetch(`${api}/notis`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotis(await res.json());
    })();
  }, []);
  console.log(notis);

  const markRead = (_id) => {
    const result = notis.map((noti) => {
      if (noti._id === _id) noti.read = true;
      return noti;
    });
    setNotis(result);
    setNotiCount(notis?.filter((noti) => !noti.read).length);
  };

  return (
    <List>
      {notis.length > 0 &&
        notis?.map((noti) => (
          <ListItem key={noti._id} sx={{ opacity: noti.read ? 0.5 : 1 }}>
            <ListItemButton
              onClick={async () => {
                const api = import.meta.env.VITE_API_URL;
                await fetch(`${api}/notis/${noti?._id}`, {
                  method: "PUT",
                });

                markRead(noti._id);
                navigate(`/posts/${noti?.target}`);
              }}
            >
              <ListItemIcon>
                {noti.type === "comment" ? (
                  <CommentIcon color="success" />
                ) : (
                  <LikeIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar
                  src={`${import.meta.env.VITE_PROFILE_PHOTOS}/${
                    noti?.actor?.profile
                  }`}
                  onClick={() => navigate(`/profile/${noti?.actor._id}`)}
                  sx={{
                    width: 45,
                    height: 45,
                    mr: 2,
                    cursor: "pointer",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${noti.actor.name} ${noti.msg}`}
                secondary={noti?.created && format(noti?.created, "MM/dd/yyyy")}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default Notis;

import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircleOutline as CheckIcon,
  CheckCircle as DoneIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import { remove, toggle } from "../app/todoSlice";
import { useDispatch } from "react-redux";

const CheckList = ({
  list,
  // remove, toggle,
  done,
}) => {

  const dispatch = useDispatch();

  return (
    <>
      {done ? <h2>Done Items</h2> : <h2>To Do Items</h2>}
      <List sx={{ opacity: done ? 0.5 : 1 }}>
        {list.map((item) => (
          <ListItem
            key={item._id}
            secondaryAction={
              <>
                <IconButton>
                  <Link to="/edit" state={{ item: item }}>
                    <EditIcon color="info" />
                  </Link>
                </IconButton>
                <IconButton onClick={() => dispatch(remove(item._id))}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            }
          >
            <ListItemIcon>
              <IconButton onClick={() => dispatch(toggle(item._id))}>
                {done ? <DoneIcon color="success" /> : <CheckIcon />}
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={item.subject} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CheckList;

CheckList.propTypes = {
  list: PropTypes.array.isRequired,
  done: PropTypes.bool,
};

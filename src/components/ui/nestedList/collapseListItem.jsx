/* eslint-disable react/prop-types */
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const CollapseListItem = ({ item }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{  paddingX: "1",paddingY:"0" }}
      >
        <ListItemIcon>
          {item?.logo}
        </ListItemIcon>
        <ListItemText primary={item?.value} />
      </ListItemButton>

    </>
  );
};

export default CollapseListItem;
